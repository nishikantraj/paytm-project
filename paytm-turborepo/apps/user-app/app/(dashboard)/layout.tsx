import type { JSX } from "react";
import { SidebarItem } from "../../components/SidebarItems";
import { authOptions } from "../lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
    if (!session?.user) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 text-5xl">🔒</div>

        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Access Denied
        </h1>

        <p className="mb-6 text-slate-600">
          You need to be logged in to access this page.
          Please sign in to continue.
        </p>

        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition hover:bg-purple-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:flex-row lg:px-6">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:w-64">
            <nav className="grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm lg:grid-cols-1">
                <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
                <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
                <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
            </nav>
        </aside>
        <main className="min-w-0 flex-1">
            {children}
        </main>
        </div>
    </div>
  );
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}
