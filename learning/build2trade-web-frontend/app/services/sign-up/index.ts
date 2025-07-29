const signUp = async (signUpPayload: {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}): Promise<any> => {
  const Url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/signup';

  const response = await fetch(Url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpPayload),
  });

  const data = await response.json();
  return data;
};

export default signUp;

