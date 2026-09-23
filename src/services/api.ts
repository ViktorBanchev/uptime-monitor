const BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || `Request failed with status ${response.status}`)
    }

    if (response.status === 204) {
        return {} as T
    }

    return response.json();
}

export const api = {
    get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
    post: <T>(endpoint: string, body: unknown) => {
        request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) })
    },
    delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' })
}