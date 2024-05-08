import { Module } from '@nestjs/common';
import { WaitingForProposalIssuesModule } from './waiting-for-proposals-issues/waiting-for-proposals-issues.module';
import { LoggerModule } from './utils/logger/logger.module';

@Module({
  imports: [
    WaitingForProposalIssuesModule,
    LoggerModule,
  ],
})
export class AppModule {}
