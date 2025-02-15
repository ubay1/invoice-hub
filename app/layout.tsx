import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/utils/theme";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Invoice Hub",
  description: "Invoice Hub",
  icons: {
    icon: "../only-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#3C50E0" height={3} showSpinner={false} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
