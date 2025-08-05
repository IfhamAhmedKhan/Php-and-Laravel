import { setToken } from '../auth';

export const signUp = async (payload: {
    name: string,
    email: string,
    password: string
}) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log("baseUrl", baseUrl)

    const response = await fetch(`${baseUrl}/api/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    console.log("response", response)
    if (!response.ok) {
        const errorBody = await response.json();
        console.log("Signup API error:", errorBody); 
        throw new Error(errorBody.message || "Signup failed");
    }
    console.log("error")

    const data = await response.json();
    
    // Store token in localStorage if signup is successful
    if (data.success && data.token) {
        setToken(data.token);
    }

    return data;
};