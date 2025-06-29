// /components/ui/dialog.tsx
"use client";

import React from "react";
import { Dialog as HeadlessDialog } from "@headlessui/React";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <HeadlessDialog.Panel className="bg-white rounded p-6 shadow max-w-lg w-full">
          {title && (
            <HeadlessDialog.Title className="text-lg font-bold mb-4">
              {title}
            </HeadlessDialog.Title>
          )}
          {children}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
}
