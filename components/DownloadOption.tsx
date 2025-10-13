"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DownloadOptionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  fileType: string;
  disabled?: boolean;
};

export default function DownloadOption({
  title,
  description,
  icon,
  fileType,
  disabled = true,
}: DownloadOptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="border border-border bg-card flex flex-col rounded-md overflow-hidden">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-6 py-4 text-left transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/10"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground italic">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {disabled ? (
                <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                  Coming Soon
                </span>
              ) : (
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground"
                >
                  ▼
                </motion.span>
              )}
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      File type: <span className="font-mono">{fileType}</span>
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    disabled={disabled}
                  >
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
