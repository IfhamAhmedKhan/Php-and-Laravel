import { getToken, removeToken } from '../auth';

export const getProfile = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log("baseUrl", baseUrl)

    // get token from localStorage
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found. Please login again.');
    }

    const response = await fetch(`${baseUrl}/api/user/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    
    console.log("response", response)
    
    if (!response.ok) {
        const errorData = await response.json();
        console.log("Profile API error:", errorData); 
        
        // If token is invalid, remove it from localStorage
        if (response.status === 401) {
            removeToken();
        }
        
        throw new Error(errorData.message || "Failed to fetch profile");
    }
    
    const data = await response.json();
    return data;
}; 