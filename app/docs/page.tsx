import React from "react";

export default function DocsPage() {

  return (
    <div className="bg-background text-foreground antialiased min-h-screen">
      <main className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Work in Progress
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Documentation
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about ByteLabs
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-muted/10 border border-border/50">
              <p className="text-base leading-relaxed">
                Welcome to the ByteLabs documentation. Since the app is still in active development, the documentation is being written alongside the features. Check back often for updates.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">01</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">Getting Started</h2>
                    <p className="text-muted-foreground">
                      This section will help you get started with ByteLabs. Follow these steps to set up your configuration and start using our services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">02</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">Installation</h2>
                    <p className="text-muted-foreground mb-4">
                      Follow these instructions to install and configure ByteLabs on your system.
                    </p>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <h3 className="font-semibold mb-2">Prerequisites</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Cargo (Rust)</li>
                        <li>Git</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary">03</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">Usage</h2>
                    <p className="text-muted-foreground mb-4">
                      Learn how to use ByteLabs with our comprehensive guides and examples.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                        <span className="text-sm font-medium">Basic Usage</span>
                        <p className="text-sm text-muted-foreground mt-1">Get started with the basic features of ByteLabs.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                        <span className="text-sm font-medium">Advanced Usage</span>
                        <p className="text-sm text-muted-foreground mt-1">Explore advanced features and customization options.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-border/50">
              <p className="text-muted-foreground">
                Last updated: October 15, 2025
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}