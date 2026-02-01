import { Model } from 'mongoose';
import { Project } from '../projects/schemas/project.schema';
export declare class AnalyticsService {
    private projectModel;
    constructor(projectModel: Model<Project>);
    getOverview(): Promise<{
        total: number;
        planning: number;
        inProgress: number;
        blocked: number;
        completed: number;
        completionRate: string | number;
    }>;
    getProjectsTimeline(): Promise<unknown[]>;
    getClientDistribution(): Promise<any[]>;
    getStatusTrends(): Promise<unknown[]>;
    getPerformanceMetrics(): Promise<{
        totalProjects: number;
        completedProjects: number;
        activeProjects: number;
        blockedProjects: number;
        avgCompletionDays: number;
        successRate: string | number;
    }>;
}
