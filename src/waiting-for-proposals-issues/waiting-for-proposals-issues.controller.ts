import {WrappedCollection} from '../core/dto/wrapped-collection-dto';
import {Controller, Get, HttpCode, Query} from '@nestjs/common';
import {ApiOperation, ApiTags, ApiQuery, ApiExtraModels} from '@nestjs/swagger';
import {BaseError} from '../utils/errors/base-error';
import {WaitingForProposalIssuesService} from './waiting-for-proposal-issues.service';
import {WaitingForProposalIssuesDisplayModel} from './dto/waiting-for-proposal-issues.dto';
import {ApiPagedCollectionResponse, PagedCollection} from '../utils/pagination';
import {PaginationSkip, PaginationTake} from '../utils/constants/api-query-constant';
import {BaseController} from '../core/base-controller';
import {ListApiQueryDto} from '../core/dto/api-query-dto';
import {ListApiQueryPipe} from '../core/pipes/list-api-query-pipe';

@ApiTags('WaitingForProposalIssues')
@Controller('')
export class WaitingForProposalIssuesController extends BaseController {
    /**
     * Initializes Object
     */

    constructor(private _waitingForProposalIssuesService: WaitingForProposalIssuesService) {
        super();
    }

    @ApiOperation({summary: 'List all the issue which do not any proposal.'})
    @ApiPagedCollectionResponse(WaitingForProposalIssuesDisplayModel)
    @ApiExtraModels(WaitingForProposalIssuesDisplayModel)
    @ApiQuery(PaginationSkip)
    @ApiQuery(PaginationTake)
    @HttpCode(200)
    @Get('/waitingForProposalIssues')
    async getClientGoals(
        @Query(ListApiQueryPipe) query: ListApiQueryDto,
    ): Promise<PagedCollection<WaitingForProposalIssuesDisplayModel> | WrappedCollection<WaitingForProposalIssuesDisplayModel> | BaseError> {
        return this.getResult(await this._waitingForProposalIssuesService.getWaitingForProposalIssues(query));
    }
}
