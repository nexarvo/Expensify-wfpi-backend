import {BaseError} from '../utils/errors/base-error';
import {HttpStatus, Injectable} from '@nestjs/common';
import 'reflect-metadata';
import {WrappedCollection} from '../core/dto/wrapped-collection-dto';
import {WaitingForProposalIssuesDisplayModel} from './dto/waiting-for-proposal-issues.dto';
import {PagedCollection} from '../utils/pagination/paged-collection';
import {AxiosService} from '../utils/axios/axios.service';
import {WinstonLogger} from '../utils/logger/WinstonLogger';
import {ListApiQueryDto} from '../core/dto/api-query-dto';

@Injectable()
export class WaitingForProposalIssuesService {
    constructor(private _logger: WinstonLogger, private readonly _axiosService: AxiosService) {}

    /**
     * Get paginated waiting for proposal issues
     * @returns PagedCollection<WaitingForProposalIssuesDisplayModel>
     */
    async getWaitingForProposalIssues(
        query: ListApiQueryDto,
    ): Promise<PagedCollection<WaitingForProposalIssuesDisplayModel> | WrappedCollection<WaitingForProposalIssuesDisplayModel> | BaseError> {
        try {
            this._logger.info(`Executing get waiting for proposal issues`);

            const page = this.calculatePageNumber(query.take, query.skip);
            const owner = process.env.REPOSITORY_OWNER;
            const repo = process.env.REPOSITORY;
            const searchText = 'Please re-state the problem that we are trying to solve in this issue';

            const url = `${process.env.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/issues?state=open&labels=External&page=${page}`;
            const headers = {Authorization: `token ${process.env.TOKEN}`};

            console.log(url)

            const response = await this._axiosService.get(url, headers);
            if (response.status === HttpStatus.OK) {
                const filteredIssues = response.data.filter((issue) => !issue.labels.some((label) => label.name === 'Reviewing'));
                const shortListedIssues = [];
                for (const issue of filteredIssues) {
                    let searchTextFound = false;
                    const commentResponse = await this._axiosService.get(issue.comments_url, headers);
                    for (const comment of commentResponse.data) {
                        if (comment.body.includes(searchText)) {
                            searchTextFound = true;
                            break; // No need to check further comments for this issue
                        }
                    }
                    if (!searchTextFound) {
                        const issueResult = new WaitingForProposalIssuesDisplayModel(issue.id, issue.title, issue.state, issue.created_at, issue.html_url);
                        shortListedIssues.push(issueResult);
                    }
                }

                const recordsPerPage = 30;
                const totalPages = this.getTotalNumberOfPagesFromResponse(response);

                const displayModel = new PagedCollection<WaitingForProposalIssuesDisplayModel>(
                    query.skip,
                    recordsPerPage,
                    totalPages,
                    shortListedIssues,
                );

                return displayModel;
            }

            // TODO: update the success log to show the data the is being displayed
            this._logger.info(`Successfully executed get waiting for proposal issues`);
        } catch (ex) {
            this._logger.error(`Failed to execute get waiting for proposal issues with error: ${ex}`);

            //TODO: check if error is meaningful
            return ex;
        }
    }

    /**
     * Get all list of waiting for proposal issues 
     * @returns WrappedCollection<WaitingForProposalIssuesDisplayModel>
     */
    async getWaitingForProposalIssuesList(
    ): Promise<WrappedCollection<WaitingForProposalIssuesDisplayModel> | BaseError> {
        try {
            this._logger.info(`Executing get waiting for proposal issues`);

            const owner = process.env.REPOSITORY_OWNER;
            const repo = process.env.REPOSITORY;
            const searchText = 'Please re-state the problem that we are trying to solve in this issue';

            const url = `${process.env.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/issues?state=open&labels=External&page=1`;
            const headers = {Authorization: `token ${process.env.TOKEN}`};

            const responseToCheckTotalPages = await this._axiosService.get(url, headers);
            const totalPages = this.getTotalNumberOfPagesFromResponse(responseToCheckTotalPages);
            const finalIssues = new WrappedCollection<WaitingForProposalIssuesDisplayModel>([]);
            for(let pageNumber = 1; pageNumber < totalPages; pageNumber++) {
                const url = `${process.env.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/issues?state=open&labels=External&page=${pageNumber}`;
                const headers = {Authorization: `token ${process.env.TOKEN}`};
                const response = await this._axiosService.get(url, headers);
                if (response.status === HttpStatus.OK) {
                    const filteredIssues = response.data.filter((issue) => !issue.labels.some((label) => label.name === 'Reviewing'));
                    const shortListedIssues = [];
                    for (const issue of filteredIssues) {
                        let searchTextFound = false;
                        const commentResponse = await this._axiosService.get(issue.comments_url, headers);
                        for (const comment of commentResponse.data) {
                            if (comment.body.includes(searchText)) {
                                searchTextFound = true;
                                break; // No need to check further comments for this issue
                            }
                        }
                        if (!searchTextFound) {
                            const issueResult = new WaitingForProposalIssuesDisplayModel(issue.id, issue.title, issue.state, issue.created_at, issue.html_url);
                            shortListedIssues.push(issueResult);
                        }
                    }

                    if(finalIssues.items.length === 0) {
                        finalIssues.items = shortListedIssues;
                    }
                    else {
                        finalIssues.items = finalIssues.items.concat(shortListedIssues);
                    }
                }   
            }

            this._logger.info(`Successfully executed get waiting for proposal issues`);

            return finalIssues;
        } catch (ex) {
            this._logger.error(`Failed to execute get waiting for proposal issues with error: ${ex}`);

            //TODO: check if error is meaningful
            return ex;
        }
    }

    private getTotalNumberOfPagesFromResponse(response: any): number {
        const linkHeader = response.headers.link;

        if (linkHeader) {
            const links = linkHeader.split(',');
            const lastPageLink = links.find((link) => link.includes('rel="last"'));

            if (lastPageLink) {
                const match = lastPageLink.match(/&page=(\d+)/);
                if (match) {
                    const totalPages = parseInt(match[1]);
                    return totalPages;
                }
            }
        }
    }

    private calculatePageNumber(take: number, skip: number) {
        return Math.floor(skip / take) + 1;
    }
}
