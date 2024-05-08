import { ApiProperty } from '@nestjs/swagger';

export class WaitingForProposalIssuesDisplayModel {
  @ApiProperty({ example: 'string' })
  id: string;

  @ApiProperty({ example: 'string' })
  title: string;

  @ApiProperty({ example: 'string' })
  summary: string;

  @ApiProperty({ example: 'string' })
  year: string;

  @ApiProperty({ example: 'string' })
  graphType: string;

  @ApiProperty({ example: 'string' })
  mode: string;

  @ApiProperty({ example: 'string' })
  month: string;

  @ApiProperty({ example: 'string' })
  goalValue: string;

  @ApiProperty({ example: 'string' })
  type?: string;

  @ApiProperty({ example: 1 })
  displayOrder: number;

  @ApiProperty({ example: 0 })
  currentGoalValue: number;
}
