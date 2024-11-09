// First, let's add the type definitions for the Google API
interface CredentialResponse {
  credential: string;
  select_by: string;
  // Add other properties as needed
}

interface Google {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
      }) => void;
      prompt: (callback: (notification: {
        isNotDisplayed: () => boolean;
        getNotDisplayedReason: () => string;
        isSkippedMoment: () => boolean;
        getSkippedReason: () => string;
        isDismissedMoment: () => boolean;
        getDismissedReason: () => string;
      }) => void) => void;
      renderButton: (
        element: HTMLElement,
        options: {
          theme?: string;
          size?: string;
        }
      ) => void;
    };
  };
}

// Extend the Window interface
declare global {
  interface Window {
    google?: Google;
  }
}

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  signInUserWithToken,
  userExists,
  updateUser,
  insertNewUser,
} from "../../../utils/auth";
import { Session } from '@supabase/supabase-js';
import { useUserStore } from 'state/stores/userStore';
import { User } from 'types/user.types';

const LoginPage = () => {
  const [errorText, setErrorText] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Load Google Sign-In script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    const cleanup = loadGoogleScript();
    return cleanup;
  }, []);

  useEffect(() => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = async (response: CredentialResponse) => {
    try {
      // Here you would typically send the credential to your backend
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

  const handleGoogleLogin = () => {
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.error("Google Sign-In prompt not displayed:", notification.getNotDisplayedReason());
          } else if (notification.isSkippedMoment()) {
            console.log("User skipped sign-in prompt:", notification.getSkippedReason());
          } else if (notification.isDismissedMoment()) {
            console.log("User dismissed sign-in prompt:", notification.getDismissedReason());
          }
        });
      } catch (error) {
        console.error("Error prompting Google Sign-In:", error);
        setErrorText("Error initiating Google Sign-In");
      }
    } else {
      console.error("Google Sign-In not initialized");
      setErrorText("Google Sign-In not available");
    }
  };

  const checkAndUpdateUser = async (session: Session) => {
    let checkUser: any;
    console.log("Checking and updating user...");
    try {
      console.log(session.user.id);
      const { user, error } = await userExists(session.user.id);

      if (error) {
        console.error("Error checking user:", error.message);
        setErrorText("Error checking user: " + error.message);
        return;
      }

      checkUser = user;

      console.log("Fetched user:", user);

      if (!user) {
        console.log("User not found, inserting new user...");

        const { data, error: insertError } = await insertNewUser(session);

        if (insertError) {
          console.error("Error adding user:", insertError.message);
          setErrorText("Error adding user: " + insertError.message);
          return;
        }

        checkUser = data;
        console.log("Inserted new user:", user);
      } else {
        console.log("User found, updating user...");
        const { user: updatedUser, error: updateError } =
          await updateUser(session);

        if (updateError) {
          console.error("Error updating user:", updateError.message);
          setErrorText("Error updating user: " + updateError.message);
          return;
        }
        checkUser = updatedUser?.length ? updatedUser[0] : null;
        console.log("Updated user:", checkUser);
      }

      if (!checkUser) {
        console.error("User is null after database operations.");
        setErrorText("User is null after database operations.");
        return;
      }

      console.log("User data set in store:", checkUser);
      setUser(checkUser);
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setErrorText("Unexpected error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-200 flex">
      {/* Left side - Image placeholder */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
        <img 
          src="/src/assets/logo.png"
          alt="Feyn Fox" 
          className="max-w-md rounded-lg"
        />
      </div>

      {/* Right side - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-green-200 border-none shadow-none">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold text-center">
              Feyn Fox
            </CardTitle>
            <CardDescription className="text-lg text-gray-700 text-center">
              Welcome back! Please login to continue.
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
              className="w-full h-12 text-base"
            >
              <div className="flex items-center justify-center space-x-3">
                {/* Google Icon */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                  />
                </svg>
                <span>Continue with Google</span>
              </div>
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Separator className="w-full" />
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