import React, { useState } from "react";
import Link from "next/link";
import { Download, Github } from "lucide-react";
import { FiGitlab } from "react-icons/fi";

export default function DashboardActions() {
  const [hoveredSide, setHoveredSide] = useState<'github' | 'gitlab' | null>(null);

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

      <div 
        className="relative inline-flex items-center rounded-md border border-border bg-card overflow-hidden transition-all duration-300 ease-out hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transform-gpu"
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div 
          className="absolute inset-0 z-30"
          onMouseEnter={() => setHoveredSide('github')}
          style={{
            left: '0%',
            right: hoveredSide === 'gitlab' ? '50%' : '50%',
            cursor: 'pointer'
          }}
        />
        
        <Link
          href="https://github.com/ByteLabs-Studio/ByteLab"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ease-out"
          onMouseEnter={() => setHoveredSide('github')}
          style={{
            width: hoveredSide === 'github' ? '120px' : '40px',
            justifyContent: hoveredSide === 'github' ? 'center' : 'flex-start'
          }}
        >
          <Github className="h-4 w-4 flex-shrink-0" />
          <span 
            className="ml-2 whitespace-nowrap transition-all duration-300 ease-out"
            style={{
              opacity: hoveredSide === 'github' ? 1 : 0,
              transform: hoveredSide === 'github' ? 'translateX(0)' : 'translateX(-10px)'
            }}
          >
            GitHub
          </span>
        </Link>

        <div 
          className="relative z-20 flex items-center justify-center text-muted-foreground font-mono text-lg transition-all duration-300 ease-out pointer-events-none"
          style={{
            width: hoveredSide ? '0px' : '20px',
            opacity: hoveredSide ? 0 : 1,
            transform: hoveredSide === 'github' ? 'translateX(-20px)' : hoveredSide === 'gitlab' ? 'translateX(20px)' : 'translateX(0)'
          }}
        >
          /
        </div>

        <div 
          className="absolute inset-0 z-30"
          onMouseEnter={() => setHoveredSide('gitlab')}
          style={{
            left: hoveredSide === 'github' ? '50%' : '50%',
            right: '0%',
            cursor: 'pointer'
          }}
        />

        <Link
          href="https://gitlab.com/bytelab-studio/ByteLab"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ease-out"
          onMouseEnter={() => setHoveredSide('gitlab')}
          style={{
            width: hoveredSide === 'gitlab' ? '120px' : '40px',
            justifyContent: hoveredSide === 'gitlab' ? 'center' : 'flex-end'
          }}
        >
          <span 
            className="mr-2 whitespace-nowrap transition-all duration-300 ease-out"
            style={{
              opacity: hoveredSide === 'gitlab' ? 1 : 0,
              transform: hoveredSide === 'gitlab' ? 'translateX(0)' : 'translateX(10px)'
            }}
          >
            GitLab
          </span>
          <FiGitlab className="h-4 w-4 flex-shrink-0" />
        </Link>

        <div 
          className="absolute top-0 bottom-0 bg-accent/20 transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: hoveredSide === 'github' ? '0%' : hoveredSide === 'gitlab' ? '50%' : '50%',
            right: hoveredSide === 'github' ? '50%' : hoveredSide === 'gitlab' ? '0%' : '50%',
            transform: hoveredSide ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: hoveredSide === 'github' ? 'left center' : hoveredSide === 'gitlab' ? 'right center' : 'center'
          }}
        />
      </div>
    </div>
  );
}
