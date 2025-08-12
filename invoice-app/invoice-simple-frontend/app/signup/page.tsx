"use client";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          {/* Tickmark SVG */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5257 0.366943L9.18097 10.1489L8.86262 10.3805L8.70634 10.4673L8.60794 10.502L8.49218 10.5425L8.4343 10.5599L8.36484 10.5715L8.27802 10.5772H8.11595H7.91915L7.82075 10.5715L7.73393 10.5599L7.6529 10.5425L7.58923 10.5252L0.730264 7.89154L0.579773 7.85681L0.504526 7.87997L0.429281 7.95521L0.406128 8.00731V8.07676L0.429281 8.18674L0.730264 8.57455L7.78602 18.3392L7.86127 18.4028L7.95388 18.4781L8.09858 18.5186L8.2375 18.5244L8.3822 18.4897L8.50954 18.4144L8.60794 18.3218L8.74107 18.1771L20.6589 0.505859V0.436401L20.6241 0.366943H20.5257Z"
              fill="#2ED4A7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          You're a few seconds away from your Invoice Simple account!
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ED4A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ED4A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ED4A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ED4A7]"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="marketing"
              className="mt-1 mr-2"
            />
            <label htmlFor="marketing" className="text-sm text-gray-600">
              I want to receive emails from Invoice Simple and its Affiliates about updates and offers.
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-[#2ED4A7] text-white py-2 rounded-md font-semibold hover:bg-[#26b995]"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-300"
              onClick={() => router.push("/invoices")}
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          By signing up, you agree to the{' '}
          <a href="#" className="text-[#2ED4A7] hover:underline">terms of use</a> &{' '}
          <a href="#" className="text-[#2ED4A7] hover:underline">privacy policy</a>.
        </p>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#2ED4A7] font-medium hover:underline">
            Login
          </a>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100">
            <img src="/google-color-svgrepo-com.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100">
            <img src="/apple-svgrepo-com.svg" alt="Apple" className="w-5 h-5" />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
