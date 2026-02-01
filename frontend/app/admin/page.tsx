'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { UserRole, AnalyticsOverview, TimelineData, ClientDistribution, PerformanceMetrics } from '@/lib/types';
import { ProjectStatusChart } from '@/components/charts/ProjectStatusChart';
import { ProjectTimelineChart } from '@/components/charts/ProjectTimelineChart';
import { ClientDistributionChart } from '@/components/charts/ClientDistributionChart';
import { TrendingUp, Users, FolderKanban, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
    const [timeline, setTimeline] = useState<TimelineData[]>([]);
    const [distribution, setDistribution] = useState<ClientDistribution[]>([]);
    const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
        loadAnalytics();
    }, []);

    const checkAuth = () => {
        const user = api.getCurrentUser();
        if (!user || user.role !== UserRole.ADMIN) {
            router.push('/dashboard');
        }
    };

    const loadAnalytics = async () => {
        try {
            const [overviewData, timelineData, distributionData, performanceData] = await Promise.all([
                api.get('/analytics/overview'),
                api.get('/analytics/timeline'),
                api.get('/analytics/client-distribution'),
                api.get('/analytics/performance'),
            ]);

            setOverview(overviewData);
            setTimeline(timelineData);
            setDistribution(distributionData);
            setPerformance(performanceData);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-500">Loading analytics...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold">Admin Dashboard</h2>
                <p className="text-neutral-500 mt-1">Comprehensive analytics and insights</p>
            </div>

            {/* Performance Metrics */}
            {performance && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            <FolderKanban className="h-4 w-4 text-neutral-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{performance.totalProjects}</div>
                            <p className="text-xs text-neutral-500 mt-1">All time</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{performance.successRate}%</div>
                            <p className="text-xs text-neutral-500 mt-1">Completion rate</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{performance.avgCompletionDays}</div>
                            <p className="text-xs text-neutral-500 mt-1">Days per project</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Blocked Projects</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{performance.blockedProjects}</div>
                            <p className="text-xs text-neutral-500 mt-1">Needs attention</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Status Distribution */}
                {overview && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProjectStatusChart data={overview} />
                        </CardContent>
                    </Card>
                )}

                {/* Client Distribution */}
                {distribution.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects by Client</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ClientDistributionChart data={distribution} />
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Timeline Chart */}
            {timeline.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Project Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProjectTimelineChart data={timeline} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
