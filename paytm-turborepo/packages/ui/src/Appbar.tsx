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
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur">
            <div>
                <div className="text-lg font-extrabold text-blue-500">Paytm Wallet</div>
                <div className="text-xs tracking-tighter text-slate-500">Fast payments, clean tracking</div>
            </div>
            <div className="flex items-center gap-3">
                {user ? <div className="hidden text-right sm:block">
                    <div className="text-sm font-medium text-slate-900">{user.name || "Wallet user"}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                </div> : null}
                <Button onClick={user ? onSignout : onSignin} variant={user ? "secondary" : "primary"}>
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </header>
    );
}
