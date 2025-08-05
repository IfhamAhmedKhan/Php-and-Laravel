import { setToken } from '../auth';

export const login = async (payload: {
    email: string,
    password: string
}) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log("baseUrl", baseUrl)

    const response = await fetch(`${baseUrl}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    
    console.log("response", response)
    
    const data = await response.json();
    
    if (!response.ok) {
        console.log("Login API error:", data); 
        throw new Error(data.message || "Login failed");
    }
    
    // store token in localStorage if login is successful
    if (data.success && data.token) {
        setToken(data.token);
    }
    
    return data;
};