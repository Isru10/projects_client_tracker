'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/RichTextEditor';
import { api } from '@/lib/api';
import { ArrowLeft, Users2 } from 'lucide-react';
import Link from 'next/link';

export default function NewClientPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/clients', {
                name: formData.name,
                email: formData.email || undefined,
                notes: formData.notes || undefined,
            });

            router.push('/dashboard/clients');
        } catch (err: any) {
            setError(err.message || 'Failed to create client');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/clients">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            New Client
                        </h2>
                        <Users2 className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-neutral-500 mt-1">Add a new client with rich formatting for notes</p>
                </div>
            </div>

            <Card className="max-w-4xl border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
                    <CardTitle className="text-2xl">Client Information</CardTitle>
                    <CardDescription>Create a comprehensive client profile</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base font-semibold">
                                    Client Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter client or company name"
                                    required
                                    disabled={loading}
                                    className="text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-semibold">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="client@example.com"
                                    disabled={loading}
                                    className="text-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base font-semibold flex items-center gap-2">
                                Client Notes
                                <span className="text-xs font-normal text-neutral-500">(Use rich formatting for detailed information)</span>
                            </Label>
                            <RichTextEditor
                                content={formData.notes}
                                onChange={(content) => setFormData({ ...formData, notes: content })}
                                placeholder="Add detailed notes about the client - contact information, preferences, special requirements, project history..."
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-md border border-red-200 dark:border-red-800">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={loading} size="lg" className="px-8">
                                {loading ? 'Creating...' : 'Create Client'}
                            </Button>
                            <Link href="/dashboard/clients">
                                <Button type="button" variant="outline" disabled={loading} size="lg">
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
