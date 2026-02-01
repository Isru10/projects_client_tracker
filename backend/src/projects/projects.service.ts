import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument, ProjectStatus } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const createdProject = new this.projectModel(createProjectDto);
        return createdProject.save();
    }

    async findAll(
        status?: ProjectStatus,
        clientId?: string,
        search?: string,
    ): Promise<Project[]> {
        const filter: any = {};

        if (status) {
            filter.status = status;
        }

        if (clientId) {
            filter.clientId = clientId;
        }

        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        return this.projectModel
            .find(filter)
            .populate('clientId', 'name email')
            .sort({ createdAt: -1 })
            .exec();
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectModel
            .findById(id)
            .populate('clientId', 'name email')
            .exec();

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        return project;
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, updateProjectDto, { new: true })
            .populate('clientId', 'name email')
            .exec();

        if (!updatedProject) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        return updatedProject;
    }

    async remove(id: string): Promise<void> {
        const result = await this.projectModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
    }

    async getStats() {
        const total = await this.projectModel.countDocuments().exec();
        const planning = await this.projectModel
            .countDocuments({ status: ProjectStatus.PLANNING })
            .exec();
        const inProgress = await this.projectModel
            .countDocuments({ status: ProjectStatus.IN_PROGRESS })
            .exec();
        const blocked = await this.projectModel
            .countDocuments({ status: ProjectStatus.BLOCKED })
            .exec();
        const completed = await this.projectModel
            .countDocuments({ status: ProjectStatus.COMPLETED })
            .exec();

        return {
            total,
            planning,
            inProgress,
            blocked,
            completed,
        };
    }
}
