import React from "react";
import Link from "next/link";
import { Download, Github } from "lucide-react";

export default function DashboardActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3 items-center">
      <Link 
        href="/downloads" 
        className="inline-block cursor-pointer rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out transform-gpu"
      >
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </div>
      </Link>

      <Link 
        href="/git" 
        className="inline-block cursor-pointer rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:shadow-sm hover:bg-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out transform-gpu"
      >
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          GitHub
        </div>
      </Link>
    </div>
  );
}
