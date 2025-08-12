import { getToken, removeToken, refreshAccessToken } from '../auth';

export const getProfile = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log("baseUrl", baseUrl)

    // get token from httpOnly cookie
    let token = await getToken();
    
    if (!token) {
        throw new Error('No token found. Please login again.');
    }

    let response = await fetch(`${baseUrl}/api/user/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
    });
    
    console.log("response", response)
    
    if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        
        if (newToken) {
            // Retry with new token
            response = await fetch(`${baseUrl}/api/user/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${newToken}`
                },
                credentials: 'include'
            });
        } else {
            // Refresh failed, remove tokens and throw error
            await removeToken();
            throw new Error('Session expired. Please login again.');
        }
    }
    
    if (!response.ok) {
        const errorData = await response.json();
        console.log("Profile API error:", errorData); 
        
        // If still unauthorized, remove tokens
        if (response.status === 401) {
            await removeToken();
        }
        
        throw new Error(errorData.message || "Failed to fetch profile");
    }
    
    const data = await response.json();
    return data;
}; 