  import { BaseError } from '../utils/errors/base-error';
  import { Injectable } from '@nestjs/common';
  import 'reflect-metadata';
  import {
    WrappedCollection,
  } from '../core/dto/wrapped-collection-dto';
  import { WaitingForProposalIssuesDisplayModel } from './dto/waiting-for-proposal-issues.dto';
  import { PagedCollection } from '../utils/pagination/paged-collection';
  
  @Injectable()
  export class WaitingForProposalIssuesService {
    constructor(
    ) {
    }
  
    /**
     * Get all client goals
     * @param clientId
     * @returns BoolResult
     */
    async getWaitingForProposalIssues(
    ): Promise<
      | PagedCollection<WaitingForProposalIssuesDisplayModel>
      | WrappedCollection<WaitingForProposalIssuesDisplayModel>
      | BaseError
    > {
      try {
        console.log(
          `Executing get client goals with clientId:.`,
        );
      } catch (ex) {
        console.error('Got Error Executing...');
        return null;
      }
    }
  }
  