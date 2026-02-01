const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const auth = {
    getToken: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    },

    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
    },

    removeToken: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    isAuthenticated: () => {
        return !!auth.getToken();
    },

    getCurrentUser: () => {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        }
        return null;
    },

    setUser: (user: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
    },
};

export const api = {
    async request(endpoint: string, options: RequestInit = {}) {
        const token = auth.getToken();

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            auth.removeToken();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || 'An error occurred');
        }

        return response.json();
    },

    get(endpoint: string) {
        return this.request(endpoint);
    },

    post(endpoint: string, data: any) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    patch(endpoint: string, data: any) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    delete(endpoint: string) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    },

    async login(username: string, password: string) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        auth.setToken(data.access_token);
        auth.setUser(data.user);
        return data;
    },

    logout() {
        auth.removeToken();
    },

    getCurrentUser() {
        return auth.getCurrentUser();
    },
};
