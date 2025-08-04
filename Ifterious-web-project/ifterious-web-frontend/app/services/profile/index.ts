export const getProfile = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log("baseUrl", baseUrl)

    const response = await fetch(`${baseUrl}/api/user/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include' 
    });
    
    console.log("response", response)
    
    if (!response.ok) {
        const errorData = await response.json();
        console.log("Profile API error:", errorData); 
        throw new Error(errorData.message || "Failed to fetch profile");
    }
    
    const data = await response.json();
    return data;
}; 