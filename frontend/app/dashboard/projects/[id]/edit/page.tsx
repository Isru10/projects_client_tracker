'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/api';
import { Project, Client, ProjectStatus } from '@/lib/types';
import { PROJECT_STATUS_OPTIONS } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        clientId: '',
        status: ProjectStatus.PLANNING,
        description: '',
    });

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [project, clientsData]: [Project, Client[]] = await Promise.all([
                api.get(`/projects/${id}`),
                api.get('/clients'),
            ]);

            setClients(clientsData);
            setFormData({
                title: project.title,
                clientId: typeof project.clientId === 'object' ? project.clientId._id : project.clientId,
                status: project.status,
                description: project.description || '',
            });
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            await api.patch(`/projects/${id}`, {
                title: formData.title,
                clientId: formData.clientId,
                status: formData.status,
                description: formData.description || undefined,
            });

            router.push(`/dashboard/projects/${id}`);
        } catch (err: any) {
            setError(err.message || 'Failed to update project');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href={`/dashboard/projects/${id}`}>
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold">Edit Project</h2>
                    <p className="text-neutral-500 mt-1">Update project information</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Project Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter project title"
                                required
                                disabled={saving}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="clientId">
                                Client <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.clientId}
                                onValueChange={(value) => setFormData({ ...formData, clientId: value })}
                                required
                                disabled={saving}
                            >
                                <SelectTrigger>
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}
                                disabled={saving}
                            >
                                <SelectTrigger>
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
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Project description and details..."
                                rows={4}
                                disabled={saving}
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button type="submit" disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Link href={`/dashboard/projects/${id}`}>
                                <Button type="button" variant="outline" disabled={saving}>
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
