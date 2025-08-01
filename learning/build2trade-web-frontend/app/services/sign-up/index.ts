import { error } from "console";

export const signUp = async (payload: {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("baseUrl",baseUrl)

  const response = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
console.log("response",response)
  if (!response.ok) {
  const errorBody = await response.json();
  console.log("Signup API error:", errorBody); // Add this line
  throw new Error(errorBody.message || "Signup failed");
}
console.log("error")

  return await response.json();
};
