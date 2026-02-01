'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { Project } from '@/lib/types';
import { STATUS_COLORS } from '@/lib/constants';
import { ArrowLeft, Edit, Trash2, User, Calendar, FileText } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadProject();
    }, [id]);

    const loadProject = async () => {
        try {
            const data = await api.get(`/projects/${id}`);
            setProject(data);
        } catch (error) {
            console.error('Failed to load project:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/projects/${id}`);
            router.push('/dashboard/projects');
        } catch (error) {
            console.error('Failed to delete project:', error);
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-500">Loading...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center py-12">
                <p className="text-neutral-500">Project not found</p>
            </div>
        );
    }

    const client = typeof project.clientId === 'object' ? project.clientId : null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/projects">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold">{project.title}</h2>
                        <Badge className={STATUS_COLORS[project.status]}>
                            {project.status}
                        </Badge>
                    </div>
                    <p className="text-neutral-500 mt-1">Project details and information</p>
                </div>
                <div className="flex gap-2">
                    <Link href={`/dashboard/projects/${project._id}/edit`}>
                        <Button variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete this project. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project Details */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Project Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-neutral-500 mb-1">Title</div>
                            <div className="text-lg font-semibold">{project.title}</div>
                        </div>

                        <div>
                            <div className="text-sm font-medium text-neutral-500 mb-1">Status</div>
                            <Badge className={STATUS_COLORS[project.status]}>
                                {project.status}
                            </Badge>
                        </div>

                        {project.description && (
                            <div>
                                <div className="text-sm font-medium text-neutral-500 mb-1">Description</div>
                                <div className="flex items-start text-sm text-neutral-600 dark:text-neutral-400">
                                    <FileText className="h-4 w-4 mr-2 mt-0.5 text-neutral-400 flex-shrink-0" />
                                    <span className="whitespace-pre-wrap">{project.description}</span>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <div className="text-sm font-medium text-neutral-500 mb-1">
                                    <Calendar className="h-4 w-4 inline mr-1" />
                                    Created
                                </div>
                                <div className="text-sm">{new Date(project.createdAt).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-neutral-500 mb-1">
                                    <Calendar className="h-4 w-4 inline mr-1" />
                                    Last Updated
                                </div>
                                <div className="text-sm">{new Date(project.updatedAt).toLocaleString()}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Client Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Client</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {client ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-neutral-500 mb-1">
                                        <User className="h-4 w-4 inline mr-1" />
                                        Name
                                    </div>
                                    <Link href={`/dashboard/clients/${client._id}`}>
                                        <div className="text-lg font-semibold text-blue-600 hover:underline">
                                            {client.name}
                                        </div>
                                    </Link>
                                </div>

                                {client.email && (
                                    <div>
                                        <div className="text-sm font-medium text-neutral-500 mb-1">Email</div>
                                        <a href={`mailto:${client.email}`} className="text-sm text-blue-600 hover:underline">
                                            {client.email}
                                        </a>
                                    </div>
                                )}

                                <Link href={`/dashboard/clients/${client._id}`}>
                                    <Button variant="outline" className="w-full mt-4">
                                        View Client Details
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-sm text-neutral-500">Client information not available</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
