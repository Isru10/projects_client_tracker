import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './schemas/project.schema';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("./schemas/project.schema").Project>;
    findAll(status?: ProjectStatus, clientId?: string, search?: string): Promise<import("./schemas/project.schema").Project[]>;
    getStats(): Promise<{
        total: number;
        planning: number;
        inProgress: number;
        blocked: number;
        completed: number;
    }>;
    findOne(id: string): Promise<import("./schemas/project.schema").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("./schemas/project.schema").Project>;
    remove(id: string): Promise<void>;
}
