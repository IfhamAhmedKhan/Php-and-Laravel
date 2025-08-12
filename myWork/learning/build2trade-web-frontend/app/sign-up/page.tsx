'use client';

import Image from "next/image";
import { useState } from "react";
import { signUp } from "../services/sign-up";


export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${fullName},${phoneNumber},${email},${password},${confirmPassword},`)

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      fullName,
      phoneNumber,
      email,
      password,
      role: 'Tradie',
    };

    try {
      const response = await signUp(payload);
      console.log("Signup success:", response);
      alert("Account created successfully!");
      
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-black relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-3/4 overflow-hidden">
          <div className="relative h-full w-full">
            <Image
              src="/workers.png"
              alt="Construction professionals"
              fill
              className="object-cover"
              style={{ objectPosition: '80% center' }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="absolute top-8 left-8 z-10">
          <Image
            src="/logo.png"
            alt="BUILD2TRADE Logo"
            width={250}
            height={80}
            className="h-auto"
            priority
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 relative flex items-center justify-center p-12 bg-black">
        <div className="absolute inset-0 -left-11">
          <Image
            src="/rightside-background.png"
            alt="Right side background"
            fill
            className="object-cover rounded-l-[20px]"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-xs">
          <h1 className="text-xl font-bold text-white text-center mb-6">
            Sign Up
          </h1>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-3/4 px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-3/4 px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="flex justify-center">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-3/4 px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="flex justify-center">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-3/4 px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="flex justify-center">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-3/4 px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-1.5 rounded-lg font-bold text-sm"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <span className="text-white text-xs">
              Already have an Account?{" "}
              <a href="/sign-in" className="bg-gradient-to-b from-[#FDC123] to-[#D9870A] bg-clip-text text-transparent font-medium hover:opacity-80">
                Sign in
              </a>
            </span>
          </div>

          <div className="mt-4">
            <div className="relative flex items-center justify-center text-xs text-white my-4">
              <div className="flex-grow border-t border-white"></div>
              <span className="mx-3 whitespace-nowrap">Or continue with</span>
              <div className="flex-grow border-t border-white"></div>
            </div>

            <div className="mt-3 flex justify-center space-x-2">
              <button className="w-8 h-8 bg-transparent flex items-center justify-center hover:opacity-80">
                <Image
                  src="/google.png"
                  alt="Google"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
              <button className="w-8 h-8 bg-transparent flex items-center justify-center hover:opacity-80">
                <Image
                  src="/apple.png"
                  alt="Apple"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
