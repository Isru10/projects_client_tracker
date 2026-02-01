'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { Project, ProjectStats, ProjectStatus } from '@/lib/types';
import { STATUS_COLORS } from '@/lib/constants';
import { Plus, TrendingUp, Clock, AlertCircle, CheckCircle2, FolderKanban } from 'lucide-react';

export default function DashboardPage() {
    const [stats, setStats] = useState<ProjectStats | null>(null);
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsData, projectsData] = await Promise.all([
                api.get('/projects/stats'),
                api.get('/projects'),
            ]);

            setStats(statsData);
            setRecentProjects(projectsData.slice(0, 5));
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = stats ? [
        { title: 'Total Projects', value: stats.total, icon: FolderKanban, color: 'text-blue-600' },
        { title: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'text-yellow-600' },
        { title: 'Planning', value: stats.planning, icon: Clock, color: 'text-blue-600' },
        { title: 'Blocked', value: stats.blocked, icon: AlertCircle, color: 'text-red-600' },
        { title: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-600' },
    ] : [];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Dashboard</h2>
                    <p className="text-neutral-500 mt-1">Overview of your projects and clients</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard/clients/new">
                        <Button variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            New Client
                        </Button>
                    </Link>
                    <Link href="/dashboard/projects/new">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Project
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Projects */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentProjects.length === 0 ? (
                        <div className="text-center py-8 text-neutral-500">
                            No projects yet. Create your first project to get started.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentProjects.map((project) => (
                                <Link key={project._id} href={`/dashboard/projects/${project._id}`}>
                                    <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{project.title}</h3>
                                            <p className="text-sm text-neutral-500">
                                                {typeof project.clientId === 'object' ? project.clientId.name : 'Unknown Client'}
                                            </p>
                                        </div>
                                        <Badge className={STATUS_COLORS[project.status]}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
