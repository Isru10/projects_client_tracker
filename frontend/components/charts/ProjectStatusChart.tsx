'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ProjectStatusChartProps {
    data: {
        planning: number;
        inProgress: number;
        blocked: number;
        completed: number;
    };
}

const COLORS = {
    planning: '#3b82f6',
    inProgress: '#f59e0b',
    blocked: '#ef4444',
    completed: '#10b981',
};

export function ProjectStatusChart({ data }: ProjectStatusChartProps) {
    const chartData = [
        { name: 'Planning', value: data.planning, color: COLORS.planning },
        { name: 'In Progress', value: data.inProgress, color: COLORS.inProgress },
        { name: 'Blocked', value: data.blocked, color: COLORS.blocked },
        { name: 'Completed', value: data.completed, color: COLORS.completed },
    ].filter(item => item.value > 0);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
