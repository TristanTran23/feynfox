import { Button } from "@/components/ui/button";
import React from "react";
import { LogOut } from "lucide-react";

export default function TopBar() {     
    return (
        <div className="bg-[#64BC85] shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Logo */}
                    <div className="flex items-center w-28"> {/* Added fixed width to match logout button */}
                        <img 
                            src="/src/assets/logo.png" 
                            alt="Feyn Fox" 
                            className="w-14 h-14 rounded-full"
                        />
                    </div>

                    {/* Middle - Title */}
                    <div className="flex-1 flex justify-center">
                        <h1 className="text-2xl font-bold text-white">
                            Feyn<span className="text-[#FA5803]">Fox</span>
                        </h1>
                    </div>

                    {/* Right side - Logout button */}
                    <div className="w-28"> {/* Added fixed width to match logo container */}
                        <Button 
                            variant="ghost" 
                            className="h-10 w-28 bg-[#A9E9C1] items-center justify-start gap-2 flex"
                        >
                            <LogOut className="h-5 w-5"/>   
                            <span className="text-sm font-medium">Logout</span> 
                        </Button>         
                    </div>
                </div>
            </div>                                                  
        </div>
    );
}