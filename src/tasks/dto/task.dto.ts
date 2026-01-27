import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Fix server bug' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Error 500 on login page', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1, description: 'ID of the customer' })
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ example: 2, description: 'ID of the employee assigned', required: false })
  @IsInt()
  @IsOptional()
  assignedToId?: number;
}

export class UpdateTaskStatusDto {
  @ApiProperty({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}