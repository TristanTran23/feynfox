import React from 'react';
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



const LoginPage = () => {
  const handleGoogleLogin = () => {
    console.log('Google login attempted');
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
