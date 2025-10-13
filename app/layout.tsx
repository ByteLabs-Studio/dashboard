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
      <html lang="en" suppressHydrationWarning className="h-full">
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

                    root.classList.remove('dark', 'rose-pine');

                    if (theme === 'dark') {
                      root.classList.add('dark');
                    } else if (theme === 'rose-pine') {
                      root.classList.add('rose-pine');
                    }

                    root.setAttribute('data-theme', theme);
                    root.style.colorScheme = (theme === 'light') ? 'light' : 'dark';

                    function getBackgroundPreference() {
                      if (typeof localStorage !== 'undefined' && localStorage.getItem('background-animation') !== null) {
                        return localStorage.getItem('background-animation') === 'true';
                      }
                      return true;
                    }
                    const backgroundEnabled = getBackgroundPreference();
                    root.setAttribute('data-background-enabled', backgroundEnabled.toString());

                    if (backgroundEnabled) {
                      root.style.setProperty('--initial-background-opacity', '0.6');
                    } else {
                      root.style.setProperty('--initial-background-opacity', '0');
                    }
                  } catch (e) {
                  }
                })();
              `,
            }}
          />
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        </head>
        <body className="h-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["light", "dark", "rose-pine"]}
          >
            <div className="flex flex-col h-full">
              <Header />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
