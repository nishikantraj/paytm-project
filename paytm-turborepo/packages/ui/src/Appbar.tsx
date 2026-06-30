"use client"


import { Button } from "./button";

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: {
    user?: { name?: string | null; email?: string | null } | null;
    onSignin: () => void;
    onSignout: () => void;
})=>{

    return (
        <div>
            {/* Minimal Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
                {/* Left Side: Brand */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-950 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <span className="text-sm font-bold text-slate-950">SMPL</span>
                </div>
                
                {/* Right Side: User & Actions Grouped */}
                <div className="flex items-center gap-4">
                    {user ? (
                    <div className="hidden text-right sm:block">
                        <div className="text-sm font-medium text-slate-900">{user.name || "Wallet user"}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                    ) : null}
                    
                    <Button 
                    onClick={user ? onSignout : onSignin} 
                    variant={user ? "secondary" : "primary"}
                    >
                    {user ? "Logout" : "Login"}
                    </Button>
                </div>

            </header>
        </div>
    );
}
