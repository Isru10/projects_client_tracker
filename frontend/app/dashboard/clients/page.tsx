'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Client } from '@/lib/types';
import { Plus, Mail, FileText } from 'lucide-react';

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const data = await api.get('/clients');
            setClients(data);
        } catch (error) {
            console.error('Failed to load clients:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-neutral-500">Loading clients...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Clients</h2>
                    <p className="text-neutral-500 mt-1">Manage your client relationships</p>
                </div>
                <Link href="/dashboard/clients/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Client
                    </Button>
                </Link>
            </div>

            {clients.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-neutral-500 mb-4">No clients yet. Create your first client to get started.</p>
                        <Link href="/dashboard/clients/new">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Client
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map((client) => (
                        <Link key={client._id} href={`/dashboard/clients/${client._id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle className="text-xl">{client.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {client.email && (
                                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                            <Mail className="h-4 w-4 mr-2" />
                                            {client.email}
                                        </div>
                                    )}
                                    {client.notes && (
                                        <div className="flex items-start text-sm text-neutral-600 dark:text-neutral-400">
                                            <FileText className="h-4 w-4 mr-2 mt-0.5" />
                                            <span className="line-clamp-2">{client.notes}</span>
                                        </div>
                                    )}
                                    <div className="text-xs text-neutral-400 pt-2">
                                        Created {new Date(client.createdAt).toLocaleDateString()}
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
