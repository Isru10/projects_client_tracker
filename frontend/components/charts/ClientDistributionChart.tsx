'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClientDistribution } from '@/lib/types';

interface ClientDistributionChartProps {
    data: ClientDistribution[];
}

export function ClientDistributionChart({ data }: ClientDistributionChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="clientName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress" />
                <Bar dataKey="projectCount" fill="#3b82f6" name="Total Projects" />
            </BarChart>
        </ResponsiveContainer>
    );
}
