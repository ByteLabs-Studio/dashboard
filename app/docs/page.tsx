import React from "react";

export default function DocsPage() {

  return (
    <div className="bg-background text-foreground antialiased">
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          <article className="prose prose-invert max-w-none">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Documentation
              </h1>
              <div className="mt-3 text-sm text-muted-foreground">
                Last updated: October 15, 2025
              </div>
              <p className="mt-6 text-muted-foreground max-w-3xl">
                Welcome to the ByteLabs documentation. This is the central hub for all our product documentation, guides, and API references. 
                <br /><br />
                Please note that since the app is still in development, the documentation is not complete yet and will not be properly written until there is stuff to be documented.
              </p>
            </div>

            <section id="getting-started" className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This section will help you get started with ByteLabs. Follow these steps to set up your configuration and start using our services.
                </p>
              </div>
            </section>

            <section id="installation" className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Installation</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Follow these instructions to install and configure ByteLabs on your system.</p>
                
                <div className="mt-6">
                  <h3 id="prerequisites" className="text-xl font-semibold text-foreground mb-3">Prerequisites</h3>
                  <p>Before you begin, make sure you have the following installed on your system:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Cargo (Rust)</li>
                    <li>Git</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="usage" className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Usage</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>Learn how to use ByteLabs with our comprehensive guides and examples.</p>
                
                <div className="mt-6 space-y-8">
                  <div className="pl-4 border-l-2 border-muted">
                    <h3 id="basic-usage" className="text-xl font-semibold text-foreground mb-3">Basic Usage</h3>
                    <div className="space-y-3">
                      <p>Get started with the basic features of ByteLabs.</p>
                    </div>
                  </div>
                  
                  <div className="pl-4 border-l-2 border-muted">
                    <h3 id="advanced-usage" className="text-xl font-semibold text-foreground mb-3">Advanced Usage</h3>
                    <div className="space-y-3">
                      <p>Explore advanced features and customization options.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-md border border-border bg-card p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">On this page</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <a
                  href="#getting-started"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Getting Started
                </a>
                <a
                  href="#installation"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Installation
                </a>
                <a
                  href="#prerequisites"
                  className="text-muted-foreground hover:text-foreground ml-3 text-sm"
                >
                  Prerequisites
                </a>
                <a
                  href="#usage"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Usage
                </a>
                <a
                  href="#basic-usage"
                  className="text-muted-foreground hover:text-foreground ml-3 text-sm"
                >
                  Basic Usage
                </a>
                <a
                  href="#advanced-usage"
                  className="text-muted-foreground hover:text-foreground ml-3 text-sm"
                >
                  Advanced Usage
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}