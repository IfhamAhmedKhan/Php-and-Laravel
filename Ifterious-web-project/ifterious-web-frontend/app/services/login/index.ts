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
        credentials: 'include' // Important for cookies
    });
    
    console.log("response", response)
    
    const data = await response.json();
    
    if (!response.ok) {
        console.log("Login API error:", data); 
        throw new Error(data.message || "Login failed");
    }
    
    return data;
};