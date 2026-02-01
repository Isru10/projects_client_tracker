'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { auth, api } from '@/lib/api';
import { UserRole } from '@/lib/types';
import { LayoutDashboard, Users, FolderKanban, LogOut, BarChart3 } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    useEffect(() => {
        const user = api.getCurrentUser();
        if (user) {
            setUserRole(user.role);
        }
    }, []);

    const handleLogout = () => {
        api.logout();
        document.cookie = 'token=; path=/; max-age=0';
        router.push('/login');
    };

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ...(userRole === UserRole.ADMIN ? [{ href: '/admin', label: 'Analytics', icon: BarChart3 }] : []),
        { href: '/dashboard/clients', label: 'Clients', icon: Users },
        { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Header */}
            <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                        Client & Project Tracker
                    </h1>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 flex gap-6">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0">
                    <nav className="space-y-2 bg-white dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={isActive ? 'default' : 'ghost'}
                                        className="w-full justify-start"
                                    >
                                        <Icon className="h-4 w-4 mr-2" />
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
