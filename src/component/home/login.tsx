// Type definitions
interface CredentialResponse {
  credential: string;
  select_by: string;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  // Add other env vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Session } from '@supabase/supabase-js';
import {
  userExists,
  updateUser,
  insertNewUser,
  signInUserWithToken,
  checkAndUpdateUser,
} from "../../utils/auth";
import { useUserStore } from '../../../state/stores/userStore';
import { supabase } from '@/utils/supabase';

const LoginPage = () => {
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    // This effect can be removed if you're fully migrating to Supabase OAuth
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: process.env.VITE_GOOGLE_CLIENT_ID || '',
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = async (response: CredentialResponse) => {
    try {
      const { data: user, error } = await signInUserWithToken(response.credential);
      
      if (error) {
        console.error("Error signing in:", error.message);
        setErrorText("Error signing in: " + error.message);
        return;
      }

      if (user.session) {
        await checkAndUpdateUser(user.session);
      }
    } catch (error: any) {
      console.error("Unexpected error during sign-in:", error);
      setErrorText("Unexpected error during sign-in: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        throw error;
      }
      
    } catch (error: any) {
      console.error("Error initiating Google Sign-In:", error);
      setErrorText(error.message || "Error initiating Google Sign-In");
    }
  };

  return (
    <div className="min-h-screen bg-green-200 flex">
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
        <img 
          src="/src/assets/logo.png"
          alt="Feyn Fox" 
          className="max-w-md rounded-lg"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-green-200 border-0 shadow-none">
          <CardHeader className="space-y-2">
            <CardTitle className="text-6xl font-bold text-center">
              Feyn<span className="text-[#FA5803]">Fox</span>
            </CardTitle>
            <CardDescription className="text-lg text-gray-700 text-center">
              Welcome! Please login to continue.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {errorText && (
              <div className="text-red-600 text-center text-sm">
                {errorText}
              </div>
            )}
            <Button 
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 text-base bg-[#FA5803] hover:bg-[#FF8B4E]"
              type="button"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    fill="white"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                  />
                </svg>
                <span className="text-white">Continue with Google</span>
              </div>
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>By continuing, you agree to our</p>
              <div className="space-x-2 mt-1">
                <Button variant="link" className="text-blue-600 hover:text-blue-800 h-auto p-0">
                  Terms of Service
                </Button>
                <span>&</span>
                <Button variant="link" className="text-blue-600 hover:text-blue-800 h-auto p-0">
                  Privacy Policy
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;