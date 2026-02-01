'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { Client, Project } from '@/lib/types';
import { STATUS_COLORS } from '@/lib/constants';
import { ArrowLeft, Edit, Trash2, Mail, FileText, FolderKanban } from 'lucide-react';
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

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [client, setClient] = useState<Client | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [clientData, projectsData] = await Promise.all([
                api.get(`/clients/${id}`),
                api.get(`/projects?clientId=${id}`),
            ]);

            setClient(clientData);
            setProjects(projectsData);
        } catch (error) {
            console.error('Failed to load client:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/clients/${id}`);
            router.push('/dashboard/clients');
        } catch (error) {
            console.error('Failed to delete client:', error);
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

    if (!client) {
        return (
            <div className="text-center py-12">
                <p className="text-neutral-500">Client not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/clients">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold">{client.name}</h2>
                    <p className="text-neutral-500 mt-1">Client details and projects</p>
                </div>
                <div className="flex gap-2">
                    <Link href={`/dashboard/clients/${client._id}/edit`}>
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
                                    This will permanently delete this client. This action cannot be undone.
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
                {/* Client Info */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-neutral-500">Name</div>
                            <div className="text-lg font-semibold">{client.name}</div>
                        </div>

                        {client.email && (
                            <div>
                                <div className="text-sm font-medium text-neutral-500 mb-1">Email</div>
                                <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 mr-2 text-neutral-400" />
                                    <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
                                        {client.email}
                                    </a>
                                </div>
                            </div>
                        )}

                        {client.notes && (
                            <div>
                                <div className="text-sm font-medium text-neutral-500 mb-1">Notes</div>
                                <div className="flex items-start text-sm text-neutral-600 dark:text-neutral-400">
                                    <FileText className="h-4 w-4 mr-2 mt-0.5 text-neutral-400" />
                                    <span>{client.notes}</span>
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="text-sm font-medium text-neutral-500">Created</div>
                            <div className="text-sm">{new Date(client.createdAt).toLocaleString()}</div>
                        </div>
                    </CardContent>
                </Card>

                {/* Projects */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Projects ({projects.length})</CardTitle>
                        <Link href={`/dashboard/projects/new?clientId=${client._id}`}>
                            <Button size="sm">
                                <FolderKanban className="h-4 w-4 mr-2" />
                                New Project
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {projects.length === 0 ? (
                            <div className="text-center py-8 text-neutral-500">
                                No projects for this client yet.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {projects.map((project) => (
                                    <Link key={project._id} href={`/dashboard/projects/${project._id}`}>
                                        <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{project.title}</h3>
                                                {project.description && (
                                                    <p className="text-sm text-neutral-500 line-clamp-1">{project.description}</p>
                                                )}
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
        </div>
    );
}
