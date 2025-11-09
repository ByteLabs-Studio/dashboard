"use client";

import { useEffect } from 'react';

export default function FunctionStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .rose-pine .functions-sidebar .func-btn:not(.selected) {
        color: #ffffff !important;
      }
      [data-theme="rose-pine"] .functions-sidebar .func-btn:not(.selected) {
        color: #ffffff !important;
      }
      
      /* Description hover effect */
      .description-hover {
        position: relative;
      }
      .description-hover::after {
        content: attr(data-full);
        position: absolute;
        left: 0;
        top: 100%;
        margin-top: 4px;
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 0.875rem;
        color: var(--foreground);
        white-space: pre-wrap;
        z-index: 50;
        min-width: 200px;
        max-width: 300px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        opacity: 0;
        pointer-events: none;
        transition: opacity 150ms ease-in-out;
      }
      .description-hover:hover::after {
        opacity: 1;
        pointer-events: auto;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
