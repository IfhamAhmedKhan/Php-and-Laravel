import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding and Visuals */}
      <div className="w-1/2 bg-black relative overflow-hidden">
        {/* Background with curved black shape */}
        <div className="absolute bottom-0 left-0 w-full h-3/4 bg-black rounded-tl-[100px] overflow-hidden">
          <div className="relative h-full w-full">
            <Image
              src="/workers.png"
              alt="Construction professionals"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Logo */}
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

      {/* Right Panel - Login Form */}
      <div className="w-1/2 relative flex items-center justify-center p-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/rightside-background.png"
            alt="Right side background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Sign In
          </h1>

          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-blue-500 text-sm hover:text-blue-600">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-yellow-600 transition-all duration-200"
            >
              Sign in
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">
              Don't have an Account?{" "}
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign up
              </a>
            </span>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-b from-blue-50 to-blue-100 text-gray-500">
                  Or Continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-2.06 2.25-3.64 3.03-1.58.78-3.34 1.17-5.07 1.17-1.73 0-3.49-.39-5.07-1.17-1.58-.78-2.81-1.79-3.64-3.03-.83-1.24-1.25-2.68-1.25-4.13 0-1.45.42-2.89-1.25-4.13.83-1.24 2.06-2.25 3.64-3.03C8.51 6.39 10.27 6 12 6c1.73 0 3.49.39 5.07 1.17 1.58.78 2.81 1.79 3.64 3.03.83 1.24 1.25 2.68 1.25 4.13 0 1.45-.42 2.89-1.25 4.13z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
