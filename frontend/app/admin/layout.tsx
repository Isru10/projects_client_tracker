'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { UserRole } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, FolderKanban, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const user = api.getCurrentUser();
        if (!user || user.role !== UserRole.ADMIN) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleLogout = () => {
        api.logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 min-h-screen bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Admin Portal
                        </h1>
                    </div>

                    <nav className="px-4 space-y-2">
                        <Link href="/admin">
                            <Button variant="ghost" className="w-full justify-start">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Analytics
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="ghost" className="w-full justify-start">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Main Dashboard
                            </Button>
                        </Link>
                        <Link href="/dashboard/clients">
                            <Button variant="ghost" className="w-full justify-start">
                                <Users className="mr-2 h-4 w-4" />
                                Clients
                            </Button>
                        </Link>
                        <Link href="/dashboard/projects">
                            <Button variant="ghost" className="w-full justify-start">
                                <FolderKanban className="mr-2 h-4 w-4" />
                                Projects
                            </Button>
                        </Link>
                    </nav>

                    <div className="absolute bottom-4 left-4 right-4">
                        <Button variant="outline" className="w-full" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
