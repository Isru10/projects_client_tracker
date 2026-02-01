'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/api';
import { Project, ProjectStatus } from '@/lib/types';
import { PROJECT_STATUS_OPTIONS, STATUS_COLORS } from '@/lib/constants';
import { Plus, Search, X } from 'lucide-react';

export default function ProjectsPage() {
    const searchParams = useSearchParams();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadProjects();
    }, [statusFilter, searchQuery]);

    const loadProjects = async () => {
        try {
            const params = new URLSearchParams();
            if (statusFilter !== 'all') {
                params.append('status', statusFilter);
            }
            if (searchQuery) {
                params.append('search', searchQuery);
            }

            const queryString = params.toString();
            const data = await api.get(`/projects${queryString ? `?${queryString}` : ''}`);
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearFilters = () => {
        setStatusFilter('all');
        setSearchQuery('');
    };

    const hasActiveFilters = statusFilter !== 'all' || searchQuery !== '';

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-500">Loading projects...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Projects</h2>
                    <p className="text-neutral-500 mt-1">Manage and track your projects</p>
                </div>
                <Link href="/dashboard/projects/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <Input
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-48">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    {PROJECT_STATUS_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {hasActiveFilters && (
                            <Button variant="outline" onClick={handleClearFilters}>
                                <X className="h-4 w-4 mr-2" />
                                Clear
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Projects List */}
            {projects.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-neutral-500 mb-4">
                            {hasActiveFilters ? 'No projects match your filters.' : 'No projects yet. Create your first project to get started.'}
                        </p>
                        {!hasActiveFilters && (
                            <Link href="/dashboard/projects/new">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Project
                                </Button>
                            </Link>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <Link key={project._id} href={`/dashboard/projects/${project._id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold">{project.title}</h3>
                                                <Badge className={STATUS_COLORS[project.status]}>
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                                                Client: {typeof project.clientId === 'object' ? project.clientId.name : 'Unknown'}
                                            </div>
                                            {project.description && (
                                                <p className="text-sm text-neutral-500 line-clamp-2">{project.description}</p>
                                            )}
                                            <div className="text-xs text-neutral-400 mt-3">
                                                Created {new Date(project.createdAt).toLocaleDateString()} •
                                                Updated {new Date(project.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
