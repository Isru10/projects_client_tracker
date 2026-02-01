export enum ProjectStatus {
    PLANNING = 'Planning',
    IN_PROGRESS = 'In Progress',
    BLOCKED = 'Blocked',
    COMPLETED = 'Completed',
}

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
}

export interface Client {
    _id: string;
    name: string;
    email?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Project {
    _id: string;
    title: string;
    clientId: Client | string;
    status: ProjectStatus;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectStats {
    total: number;
    planning: number;
    inProgress: number;
    blocked: number;
    completed: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    clientId?: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface AnalyticsOverview {
    total: number;
    planning: number;
    inProgress: number;
    blocked: number;
    completed: number;
    completionRate: string;
}

export interface TimelineData {
    month: string;
    total: number;
    completed: number;
    inProgress: number;
    planning: number;
    blocked: number;
}

export interface ClientDistribution {
    clientName: string;
    projectCount: number;
    completed: number;
    inProgress: number;
}

export interface PerformanceMetrics {
    totalProjects: number;
    completedProjects: number;
    activeProjects: number;
    blockedProjects: number;
    avgCompletionDays: number;
    successRate: string;
}
