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
        credentials: 'include' // Important for cookies
    });
    console.log("response", response)
    if (!response.ok) {
        const errorBody = await response.json();
        console.log("Signup API error:", errorBody); 
        throw new Error(errorBody.message || "Signup failed");
    }
    console.log("error")

    return await response.json();
};