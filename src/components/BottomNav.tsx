"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, FileText, Package, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { id: "beranda", label: "beranda", icon: Home },
  { id: "supply", label: "supply", icon: Search },
  { id: "permintaan", label: "rfq", icon: FileText, badge: 8, badgeColor: "bg-[#111827]" },
  { id: "order", label: "order", icon: Package, badge: 6, badgeColor: "bg-[#FF6B00]" },
  { id: "bayar", label: "bayar", icon: CreditCard, badge: 2, badgeColor: "bg-[#c04860]" },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md">
        <div className="bg-white/90 backdrop-blur-xl border-t border-[#E5E7EB] px-1.5 pb-safe">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors relative",
                    isActive ? "text-[#111827]" : "text-[#9CA3AF]"
                  )}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="relative">
                    <Icon 
                      size={20} 
                      strokeWidth={isActive ? 2 : 1.5}
                      className={cn(
                        "transition-all duration-200",
                        isActive && "stroke-[#111827]"
                      )}
                    />
                    {item.badge && (
                      <span 
                        className={cn(
                          "absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center text-[8px] font-bold text-white rounded-full border-2 border-white",
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span 
                    className={cn(
                      "text-[9px] font-medium tracking-wide lowercase transition-colors",
                      isActive ? "text-[#111827]" : "text-[#9CA3AF]"
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#111827]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
