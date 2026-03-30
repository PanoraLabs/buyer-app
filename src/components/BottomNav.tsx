"use client";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#E5E7EB] safe-bottom">
      <div className="w-full">
        <div className="flex items-center justify-around py-2 px-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-lg transition-colors relative min-w-[60px] touch-target",
                  isActive ? "text-[#111827]" : "text-[#9CA3AF]"
                )}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.1 }}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={cn(
                      "transition-all duration-200",
                      isActive && "stroke-[#111827]"
                    )}
                  />
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-[9px] font-bold text-white rounded-full border-2 border-white shadow-sm",
                        item.badgeColor
                      )}
                    >
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-wide lowercase transition-colors",
                    isActive ? "text-[#111827] font-semibold" : "text-[#9CA3AF]"
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#111827]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
