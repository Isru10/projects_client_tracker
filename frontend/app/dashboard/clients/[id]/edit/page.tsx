'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { Client } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

export default function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        notes: '',
    });

    useEffect(() => {
        loadClient();
    }, [id]);

    const loadClient = async () => {
        try {
            const client: Client = await api.get(`/clients/${id}`);
            setFormData({
                name: client.name,
                email: client.email || '',
                notes: client.notes || '',
            });
        } catch (error) {
            console.error('Failed to load client:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            await api.patch(`/clients/${id}`, {
                name: formData.name,
                email: formData.email || undefined,
                notes: formData.notes || undefined,
            });

            router.push(`/dashboard/clients/${id}`);
        } catch (err: any) {
            setError(err.message || 'Failed to update client');
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
                <Link href={`/dashboard/clients/${id}`}>
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold">Edit Client</h2>
                    <p className="text-neutral-500 mt-1">Update client information</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Client name"
                                required
                                disabled={saving}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="client@example.com"
                                disabled={saving}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Additional notes about the client..."
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
                            <Link href={`/dashboard/clients/${id}`}>
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
