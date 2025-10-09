import React from "react";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import type { Metadata } from "next";
import Header from "@components/header";
import Footer from "@components/footer";

export const metadata: Metadata = {
  title: "ByteLab",
  description: "Code. Sound. Visualize.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    function getThemePreference() {
                      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                        return localStorage.getItem('theme');
                      }
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    const theme = getThemePreference();
                    const root = document.documentElement;

                    // Remove all theme classes first
                    root.classList.remove('dark', 'rose-pine');

                    if (theme === 'dark') {
                      root.classList.add('dark');
                    } else if (theme === 'rose-pine') {
                      root.classList.add('rose-pine');
                    }

                    root.setAttribute('data-theme', theme);
                    root.style.colorScheme = (theme === 'light') ? 'light' : 'dark';
                  } catch (e) {
                    // Fallback - do nothing
                  }
                })();
              `,
            }}
          />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["light", "dark", "rose-pine"]}
          >
            <Header />
            <div className="pt-12">{children}</div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
