'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/RichTextEditor';
import { api } from '@/lib/api';
import { Client, ProjectStatus } from '@/lib/types';
import { PROJECT_STATUS_OPTIONS } from '@/lib/constants';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NewProjectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedClientId = searchParams.get('clientId');

    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        clientId: preselectedClientId || '',
        status: ProjectStatus.PLANNING,
        description: '',
    });

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const data = await api.get('/clients');
            setClients(data);
        } catch (error) {
            console.error('Failed to load clients:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/projects', {
                title: formData.title,
                clientId: formData.clientId,
                status: formData.status,
                description: formData.description || undefined,
            });

            router.push('/dashboard/projects');
        } catch (err: any) {
            setError(err.message || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/projects">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            New Project
                        </h2>
                        <Sparkles className="h-6 w-6 text-purple-500" />
                    </div>
                    <p className="text-neutral-500 mt-1">Create a new project with rich formatting</p>
                </div>
            </div>

            <Card className="max-w-4xl border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                    <CardTitle className="text-2xl">Project Information</CardTitle>
                    <CardDescription>Fill in the details below to create a professional project</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-base font-semibold">
                                    Project Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter a descriptive project title"
                                    required
                                    disabled={loading}
                                    className="text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="clientId" className="text-base font-semibold">
                                    Client <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.clientId}
                                    onValueChange={(value) => setFormData({ ...formData, clientId: value })}
                                    required
                                    disabled={loading}
                                >
                                    <SelectTrigger className="text-lg">
                                        <SelectValue placeholder="Select a client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map((client) => (
                                            <SelectItem key={client._id} value={client._id}>
                                                {client.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {clients.length === 0 && (
                                    <p className="text-sm text-neutral-500">
                                        No clients available. <Link href="/dashboard/clients/new" className="text-blue-600 hover:underline font-semibold">Create a client first</Link>.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-base font-semibold">
                                Project Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}
                                disabled={loading}
                            >
                                <SelectTrigger className="text-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROJECT_STATUS_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base font-semibold flex items-center gap-2">
                                Project Description
                                <span className="text-xs font-normal text-neutral-500">(Use the toolbar for rich formatting)</span>
                            </Label>
                            <RichTextEditor
                                content={formData.description}
                                onChange={(content) => setFormData({ ...formData, description: content })}
                                placeholder="Describe your project with rich formatting - add headings, lists, colors, and highlights..."
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={loading || clients.length === 0} size="lg" className="px-8">
                                {loading ? 'Creating...' : 'Create Project'}
                            </Button>
                            <Link href="/dashboard/projects">
                                <Button type="button" variant="outline" disabled={loading} size="lg">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}
