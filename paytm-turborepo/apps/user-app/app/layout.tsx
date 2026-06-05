import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paytm Wallet",
  description: "A simple wallet dashboard for balances and transfers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-slate-50 text-slate-950`}>
        <Providers>
          <AppbarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
