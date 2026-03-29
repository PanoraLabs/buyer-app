"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 12, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 12, x: "-50%" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed bottom-24 left-1/2 z-[300] pointer-events-none"
        >
          <div className="bg-[#1a1610] text-[#f5f0e8] text-xs font-semibold px-5 py-2.5 rounded-full whitespace-nowrap tracking-wide">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
