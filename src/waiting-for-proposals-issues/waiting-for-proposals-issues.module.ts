import {Module} from '@nestjs/common';
import {WaitingForProposalIssuesController} from './waiting-for-proposals-issues.controller';
import {WaitingForProposalIssuesService} from './waiting-for-proposal-issues.service';
import {LoggerModule} from '../utils/logger/logger.module';
import {AxiosModule} from '../utils/axios/axios.module';

@Module({
    imports: [LoggerModule, AxiosModule],
    controllers: [WaitingForProposalIssuesController],
    providers: [WaitingForProposalIssuesService],
    exports: [WaitingForProposalIssuesService],
})
export class WaitingForProposalIssuesModule {}
