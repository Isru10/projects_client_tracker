import { IsString, IsNotEmpty, IsEnum, IsOptional, IsMongoId } from 'class-validator';
import { ProjectStatus } from '../schemas/project.schema';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsMongoId()
    @IsNotEmpty()
    clientId: string;

    @IsEnum(ProjectStatus)
    @IsNotEmpty()
    status: ProjectStatus;

    @IsString()
    @IsOptional()
    description?: string;
}
