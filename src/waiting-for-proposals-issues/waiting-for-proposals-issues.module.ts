import { Module } from '@nestjs/common';
import { WaitingForProposalIssuesController } from './waiting-for-proposals-issues.controller';
import { WaitingForProposalIssuesService } from './waiting-for-proposal-issues.service';

@Module({
  imports: [],
  controllers: [WaitingForProposalIssuesController],
  providers: [
    WaitingForProposalIssuesService,
  ],
  exports: [
    WaitingForProposalIssuesService,
  ],
})
export class WaitingForProposalIssuesModule {}
