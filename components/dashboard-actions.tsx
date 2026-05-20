import React from "react";
import Link from "next/link";
import { Download, Github } from "lucide-react";
import { FiGitlab } from "react-icons/fi";

export default function DashboardActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3 items-center">
      <Link 
        href="/downloads" 
        className="group inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 active:translate-y-0"
      >
        <Download className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-px" />
        Download
      </Link>

      <Link
        href="https://github.com/ByteLabs-Studio/ByteLab"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-11 items-center rounded-lg border border-border/70 bg-card/80 px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-accent hover:shadow-md active:translate-y-0"
      >
        <Github className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        GitHub
      </Link>

      <Link
        href="https://gitlab.com/bytelab-studio/ByteLab"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-11 items-center rounded-lg border border-border/70 bg-card/80 px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-accent hover:shadow-md active:translate-y-0"
      >
        <FiGitlab className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        GitLab
      </Link>
    </div>
  );
}
