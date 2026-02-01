import { ProjectStatus } from './types';

export const PROJECT_STATUS_OPTIONS = [
    { value: ProjectStatus.PLANNING, label: 'Planning' },
    { value: ProjectStatus.IN_PROGRESS, label: 'In Progress' },
    { value: ProjectStatus.BLOCKED, label: 'Blocked' },
    { value: ProjectStatus.COMPLETED, label: 'Completed' },
];

export const STATUS_COLORS: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: 'bg-blue-500',
    [ProjectStatus.IN_PROGRESS]: 'bg-yellow-500',
    [ProjectStatus.BLOCKED]: 'bg-red-500',
    [ProjectStatus.COMPLETED]: 'bg-green-500',
};
