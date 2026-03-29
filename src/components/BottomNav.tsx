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
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "supply", label: "Supply", icon: Search },
  { id: "permintaan", label: "RFQ", icon: FileText, badge: 8, badgeColor: "bg-[#0d7a6e]" },
  { id: "order", label: "Order", icon: Package, badge: 6, badgeColor: "bg-[#c87820]" },
  { id: "bayar", label: "Bayar", icon: CreditCard, badge: 2, badgeColor: "bg-[#c04860]" },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md">
        <div className="glass border-t border-[#d4c8b4] px-1.5 pb-safe">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors relative",
                    isActive ? "text-[#0d7a6e]" : "text-[#9a8e80]"
                  )}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="relative">
                    <Icon 
                      size={22} 
                      strokeWidth={isActive ? 2 : 1.5}
                      className={cn(
                        "transition-all duration-200",
                        isActive && "stroke-[#0d7a6e]"
                      )}
                    />
                    {item.badge && (
                      <span 
                        className={cn(
                          "absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center text-[8px] font-bold text-white rounded-full border-2 border-[#f5f0e8]",
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span 
                    className={cn(
                      "text-[9px] font-bold tracking-wider uppercase transition-colors",
                      isActive ? "text-[#0d7a6e]" : "text-[#9a8e80]"
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#0d7a6e]"
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
