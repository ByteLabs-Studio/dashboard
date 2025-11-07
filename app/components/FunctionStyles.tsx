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
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
