// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9001';

// API Endpoints
export const ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  SIGNIN: `${API_BASE_URL}/auth/signin`,
};

// Types for API requests
export interface SignUpRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}

export interface SignInRequest {
  email: string;
  phoneNumber: string;
  password: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Sign Up API function
export const signUp = async (userData: SignUpRequest): Promise<ApiResponse> => {
  try {
    const response = await fetch(ENDPOINTS.SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        error: data.message || 'Sign up failed',
      };
    }
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

// Sign In API function
export const signIn = async (userData: SignInRequest): Promise<ApiResponse> => {
  try {
    const response = await fetch(ENDPOINTS.SIGNIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        error: data.message || 'Sign in failed',
      };
    }
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}; 