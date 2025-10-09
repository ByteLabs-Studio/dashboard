import React from "react";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import type { Metadata } from 'next'
import Header from "@components/header";
import Footer from "@components/footer";

export const metadata: Metadata = {
  title: 'ByteLab',
  description: 'Code. Sound. Visualize.',
}

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

                    if (theme === 'dark') {
                      root.classList.add('dark');
                      root.setAttribute('data-theme', 'dark');
                    } else {
                      root.classList.remove('dark');
                      root.setAttribute('data-theme', 'light');
                    }

                    root.style.colorScheme = theme;
                    root.setAttribute('data-theme-ready', 'true');

                    // Force immediate repaint
                    root.style.visibility = 'visible';
                  } catch (e) {
                    // Fallback if script fails
                    document.documentElement.setAttribute('data-theme-ready', 'true');
                  }
                })();
              `,
            }}
          />
          <noscript>
            <style>{`
              html { visibility: visible !important; }
              html[data-theme-ready] body,
              html:not([data-theme-ready]) body {
                opacity: 1 !important;
              }
            `}</style>
          </noscript>
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <div className="pt-12">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
