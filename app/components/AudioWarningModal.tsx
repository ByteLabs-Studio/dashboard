"use client";

import { useEffect, useState } from "react";

interface AudioWarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AudioWarningModal({ open, onOpenChange }: AudioWarningModalProps) {
  const [isClient, setIsClient] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDismiss = () => {
    try {
      if (dontShowAgain) {
        localStorage.setItem("audioWarningDismissed", "true");
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Error setting localStorage:", error);
      onOpenChange(false);
    }
  };
  
  if (!isClient || !open) return null;

  return (
    <div className="fixed inset-0 bg-red-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-red-800/90 border border-red-700/50 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-700/40 flex items-center justify-center mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-red-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9v4m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Audio Safety Notice</h2>
            
            <div className="space-y-4 text-red-100">
              <p>
                This application generates audio that may be extremely loud and potentially harmful to your hearing.
              </p>
              <p className="font-medium bg-red-900/30 rounded-lg p-3 border border-red-700/50">
                <span className="font-bold text-red-200">WARNING:</span> Playing audio at high volumes can cause temporary or permanent hearing damage.
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                id="dont-show-again"
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="dont-show-again" className="ml-2 block text-sm text-red-100">
                Don&apos;t show this warning again
              </label>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleDismiss}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group w-full sm:w-auto"
                autoFocus
              >
                <span>I understand - enable audio{dontShowAgain ? ' & do not show again' : ''}</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
