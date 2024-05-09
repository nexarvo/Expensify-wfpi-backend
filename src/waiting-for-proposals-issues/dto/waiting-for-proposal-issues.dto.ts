import {ApiProperty} from '@nestjs/swagger';

export class WaitingForProposalIssuesDisplayModel {
    @ApiProperty({example: 'string'})
    id: string;

    @ApiProperty({example: 'string'})
    title: string;

    @ApiProperty({example: 'string'})
    state: string;

    @ApiProperty({example: 'string'})
    created_at: string;

    @ApiProperty({example: 'string'})
    url: string;

    constructor(id: string, title: string, state: string, created_at: string, url: string) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.created_at = created_at;
        this.url = url;
    }
}
