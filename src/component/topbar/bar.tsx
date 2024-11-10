import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { supabase } from "../../../utils/supabase";

export default function TopBar() {
    const [isConfirming, setIsConfirming] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (buttonRef.current && !buttonRef.current.contains(target)) {
                setIsConfirming(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogoutClick = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
        } else {
            try {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                window.location.href = '/';
            } catch (error: any) {
                console.error('Error signing out:', error.message);
            }
        }
    };

    return (
        <div className="bg-[#64BC85] shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Logo */}
                    <div className="flex items-center w-28">
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
                    <div className="w-28">
                        <Button
                            ref={buttonRef}
                            variant="ghost"
                            className={`h-10 w-28 items-center justify-center flex ${
                                isConfirming 
                                    ? "bg-red-500 hover:bg-red-600 text-white" 
                                    : "bg-[#A9E9C1] justify-start gap-2"
                            }`}
                            onClick={handleLogoutClick}
                        >
                            {isConfirming ? (
                                "Confirm"
                            ) : (
                                <>
                                    <LogOut className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Logout</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}