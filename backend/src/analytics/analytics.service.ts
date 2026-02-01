import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../projects/schemas/project.schema';

@Injectable()
export class AnalyticsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>) { }

    async getOverview() {
        const total = await this.projectModel.countDocuments();
        const planning = await this.projectModel.countDocuments({ status: 'Planning' });
        const inProgress = await this.projectModel.countDocuments({ status: 'In Progress' });
        const blocked = await this.projectModel.countDocuments({ status: 'Blocked' });
        const completed = await this.projectModel.countDocuments({ status: 'Completed' });

        return {
            total,
            planning,
            inProgress,
            blocked,
            completed,
            completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0,
        };
    }

    async getProjectsTimeline() {
        const projects = await this.projectModel
            .find()
            .select('title status createdAt updatedAt')
            .sort({ createdAt: 1 })
            .exec();

        // Group by month
        const timeline = projects.reduce((acc, project) => {
            const createdAt = (project as any).createdAt;
            const month = new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
            });

            if (!acc[month]) {
                acc[month] = { month, total: 0, completed: 0, inProgress: 0, planning: 0, blocked: 0 };
            }

            acc[month].total++;
            if (project.status === 'Completed') acc[month].completed++;
            if (project.status === 'In Progress') acc[month].inProgress++;
            if (project.status === 'Planning') acc[month].planning++;
            if (project.status === 'Blocked') acc[month].blocked++;

            return acc;
        }, {});

        return Object.values(timeline);
    }

    async getClientDistribution() {
        const distribution = await this.projectModel.aggregate([
            {
                $group: {
                    _id: '$clientId',
                    projectCount: { $sum: 1 },
                    completed: {
                        $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
                    },
                    inProgress: {
                        $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] },
                    },
                },
            },
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'client',
                },
            },
            {
                $unwind: '$client',
            },
            {
                $project: {
                    clientName: '$client.name',
                    projectCount: 1,
                    completed: 1,
                    inProgress: 1,
                },
            },
            {
                $sort: { projectCount: -1 },
            },
        ]);

        return distribution;
    }

    async getStatusTrends() {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const projects = await this.projectModel
            .find({ updatedAt: { $gte: last30Days } })
            .select('status updatedAt')
            .sort({ updatedAt: 1 })
            .exec();

        // Group by day
        const trends = projects.reduce((acc, project) => {
            const updatedAt = (project as any).updatedAt;
            const day = new Date(updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });

            if (!acc[day]) {
                acc[day] = { day, Planning: 0, 'In Progress': 0, Blocked: 0, Completed: 0 };
            }

            acc[day][project.status]++;

            return acc;
        }, {});

        return Object.values(trends);
    }

    async getPerformanceMetrics() {
        const projects = await this.projectModel.find().exec();

        const avgCompletionTime = projects
            .filter((p) => p.status === 'Completed')
            .reduce((acc, p) => {
                const days = Math.floor(
                    (new Date(p.updatedAt).getTime() - new Date(p.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                return acc + days;
            }, 0);

        const completedCount = projects.filter((p) => p.status === 'Completed').length;

        return {
            totalProjects: projects.length,
            completedProjects: completedCount,
            activeProjects: projects.filter((p) => p.status === 'In Progress').length,
            blockedProjects: projects.filter((p) => p.status === 'Blocked').length,
            avgCompletionDays: completedCount > 0 ? Math.round(avgCompletionTime / completedCount) : 0,
            successRate: projects.length > 0 ? ((completedCount / projects.length) * 100).toFixed(1) : 0,
        };
    }
}
