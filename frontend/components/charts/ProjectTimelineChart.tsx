'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimelineData } from '@/lib/types';

interface ProjectTimelineChartProps {
    data: TimelineData[];
}

export function ProjectTimelineChart({ data }: ProjectTimelineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                <Line type="monotone" dataKey="inProgress" stroke="#f59e0b" strokeWidth={2} name="In Progress" />
                <Line type="monotone" dataKey="planning" stroke="#3b82f6" strokeWidth={2} name="Planning" />
                <Line type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} name="Blocked" />
            </LineChart>
        </ResponsiveContainer>
    );
}
