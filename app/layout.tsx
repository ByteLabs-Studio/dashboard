import React from "react";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import Navbar from "@components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
          </ThemeProvider>

          {children}
        </body>
      </html>
    </>
  );
}
