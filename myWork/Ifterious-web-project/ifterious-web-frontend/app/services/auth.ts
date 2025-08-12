// Cookie-based token management utilities
export const getToken = async (): Promise<string | null> => {
    try {
        const response = await fetch('/api/auth/token', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.token;
        }
        return null;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const setToken = async (token: string): Promise<void> => {
    try {
        await fetch('/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ token })
        });
    } catch (error) {
        console.error('Error setting token:', error);
    }
};

export const removeToken = async (): Promise<void> => {
    try {
        await fetch('/api/auth/token', {
            method: 'DELETE',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Error removing token:', error);
    }
};

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await getToken();
    return token !== null;
};

// Refresh token utilities
export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.token;
        }
        return null;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}; 

