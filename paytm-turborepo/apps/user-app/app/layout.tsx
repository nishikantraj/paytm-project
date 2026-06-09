import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";

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
      <body>
        <Providers>
          <AppbarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
