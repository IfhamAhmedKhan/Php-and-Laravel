import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding and Visuals */}
      <div className="w-1/2 bg-black relative overflow-hidden">
        
        {/* Workers image extending behind right panel */}
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
      <div className="w-1/2 relative flex items-center justify-center p-12 bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 -left-11">
          <Image
            src="/rightside-background.png"
            alt="Right side background"
            fill
            className="object-cover rounded-l-[20px]"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-xs">
          <h1 className="text-xl font-bold text-white text-center mb-6">
            Sign In
          </h1>

          <form className="space-y-3">
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Email"
                className="w-3/4 px-2 py-1.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              />
            </div>

            <div className="flex justify-center">
              <input
                type="password"
                placeholder="Password"
                className="w-3/4 px-2 py-1.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              />
            </div>

            <div className="flex justify-center">
              <div className="w-3/4 text-right">
                <a href="#" className="text-white text-xs hover:text-gray-200">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-1.5 rounded-lg font-bold hover:from-orange-500 hover:to-yellow-600 transition-all duration-200 text-sm"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <span className="text-white text-xs">
              Don't have an Account?{" "}
              <a href="/sign-up" className="bg-gradient-to-b from-[#FDC123] to-[#D9870A] bg-clip-text text-transparent font-medium hover:opacity-80 transition-opacity">
                Sign up
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
              <button className="w-8 h-8 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image
                  src="/google.png"
                  alt="Google"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
              <button className="w-8 h-8 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity">
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