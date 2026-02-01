import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
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
