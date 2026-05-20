"use client";

import React from "react";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import Header from "@components/header";
import Footer from "@components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="icon" href="/bl.png" type="image/png" />
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

                  function applyLightStrength() {
                    const keys = ['--background', '--card', '--popover', '--muted', '--secondary', '--accent', '--border', '--input'];
                    if (theme !== 'light') {
                      keys.forEach(function(key) { root.style.removeProperty(key); });
                      return;
                    }

                    const stored = Number(localStorage.getItem('lightStrength') || '88');
                    const strength = Math.min(100, Math.max(0, Number.isFinite(stored) ? stored : 88));
                    const mix = strength / 100;
                    const lerp = function(start, end) { return start + (end - start) * mix; };

                    root.style.setProperty('--background', 'oklch(' + lerp(0.86, 1).toFixed(3) + ' 0.003 286.32)');
                    root.style.setProperty('--card', 'oklch(' + lerp(0.895, 1).toFixed(3) + ' 0.003 286.32)');
                    root.style.setProperty('--popover', 'oklch(' + lerp(0.895, 1).toFixed(3) + ' 0.003 286.32)');
                    root.style.setProperty('--muted', 'oklch(' + lerp(0.82, 0.967).toFixed(3) + ' 0.004 286.375)');
                    root.style.setProperty('--secondary', 'oklch(' + lerp(0.82, 0.967).toFixed(3) + ' 0.004 286.375)');
                    root.style.setProperty('--accent', 'oklch(' + lerp(0.82, 0.967).toFixed(3) + ' 0.004 286.375)');
                    root.style.setProperty('--border', 'oklch(' + lerp(0.70, 0.92).toFixed(3) + ' 0.006 286.32)');
                    root.style.setProperty('--input', 'oklch(' + lerp(0.70, 0.92).toFixed(3) + ' 0.006 286.32)');
                    root.setAttribute('data-light-strength', String(strength));
                  }

                  applyLightStrength();
                } catch (e) {
                }
              })();
            `,
          }}
        />
        {process.env.NODE_ENV === "development" ? (
          <script
            async
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          ></script>
        ) : null}
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "rose-pine"]}
        >
          <Header />
          <main className="flex-1 pt-20 md:pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
