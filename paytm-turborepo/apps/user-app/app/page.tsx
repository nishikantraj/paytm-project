import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if(session?.user){    
    redirect('/dashboard');
  }
  else{
    return (
      <div className="min-h-screen flex flex-col bg-white text-slate-950 font-sans selection:bg-slate-200">
        

        {/* Main Centered Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full">
          <div className="max-w-xl mx-auto space-y-8 w-full">
            
            {/* Typography-focused Hero */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-950 tracking-tight">
                SMPL Wallet
              </h1>
              <p className="text-base text-slate-600 max-w-sm mx-auto">
                A clean, secure way to send and receive funds. No clutter, just your money.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="pt-2">
              <a 
                href="/api/auth/signin" 
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-slate-950 rounded-md hover:bg-slate-800 transition-colors duration-200 shadow-sm w-full sm:w-auto"
              >
                Log in to your wallet
              </a>
            </div>

            {/* Abstract Wallet Visual Indicator */}
            <div className="mt-16 w-full max-w-sm mx-auto aspect-[1.6] bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center p-6 space-y-3">
              <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-500">
                Transfers ready
              </span>
            </div>

          </div>
        </main>

        {/* Barebones Footer */}
        <footer className="py-6 text-center border-t border-slate-200">
          <p className="text-xs font-medium text-slate-500">
            &copy; {new Date().getFullYear()} SMPL. All rights reserved.
          </p>
        </footer>
        
      </div>
    );
  }

}