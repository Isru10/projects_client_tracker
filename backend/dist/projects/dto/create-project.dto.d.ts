import { ProjectStatus } from '../schemas/project.schema';
export declare class CreateProjectDto {
    title: string;
    clientId: string;
    status: ProjectStatus;
    description?: string;
}
