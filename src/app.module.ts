import { Module } from '@nestjs/common';
import { WaitingForProposalIssuesModule } from './waiting-for-proposals-issues/waiting-for-proposals-issues.module';

@Module({
  imports: [WaitingForProposalIssuesModule],
})
export class AppModule {}
