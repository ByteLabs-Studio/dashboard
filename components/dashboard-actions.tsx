import React from "react";
import Link from "next/link";
import { Download, Github } from "lucide-react";
import { FiGitlab } from "react-icons/fi";

export default function DashboardActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3 items-center">
      <Link 
        href="/downloads" 
        className="inline-block cursor-pointer rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </div>
      </Link>

      <Link
        href="https://github.com/ByteLabs-Studio/ByteLab"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors duration-200"
      >
        <Github className="h-4 w-4 mr-2" />
        GitHub
      </Link>

      <Link
        href="https://gitlab.com/bytelab-studio/ByteLab"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors duration-200"
      >
        <FiGitlab className="h-4 w-4 mr-2" />
        GitLab
      </Link>
    </div>
  );
}
