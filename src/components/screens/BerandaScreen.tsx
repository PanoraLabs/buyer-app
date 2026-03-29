"use client";

import { motion } from "framer-motion";
import { Search, FileText, Package, Receipt, TrendingDown, Truck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BerandaScreenProps {
  onNavigate: (tab: string) => void;
  showToast: (message: string) => void;
}

const quickActions = [
  { id: "supply", icon: Search, label: "Cari Supply" },
  { id: "permintaan", icon: FileText, label: "Buat RFQ" },
  { id: "order", icon: Package, label: "Lacak Order" },
  { id: "bayar", icon: Receipt, label: "Invoice" },
];

const metrics = [
  { icon: Package, value: "6", label: "Order Aktif", sub: "2 dalam pengiriman", color: "text-[#0d7a6e]" },
  { icon: FileText, value: "3", label: "RFQ Aktif", sub: "8 match ditemukan", color: "text-[#c87820]" },
  { icon: Receipt, value: "2", label: "Invoice Belum Bayar", sub: "Jatuh tempo 3 hari", color: "text-[#c04860]" },
  { icon: "star", value: "4.8", label: "Rating Pembeli", sub: "Terverifikasi B2B", color: "text-[#1a1610]" },
];

const recentOrders = [
  { icon: Truck, iconBg: "bg-[rgba(13,122,110,0.1)]", title: "Cabai Merah 6.8T · Dalam Perjalanan", sub: "ORD-2025-0142 · ETA 2j 14m", amount: "Rp 258jt", time: "Hari ini", amountColor: "" },
  { icon: CheckCircle, iconBg: "bg-[rgba(26,122,66,0.1)]", title: "Jagung Hibrida 5T · Diterima", sub: "ORD-2025-0139 · KUD Sleman", amount: "Rp 210jt", time: "12 Jul", amountColor: "" },
  { icon: Receipt, iconBg: "bg-[rgba(192,72,96,0.1)]", title: "Invoice #INV-0089 Jatuh Tempo", sub: "Padi GKP 5.2T · KUD Bantul", amount: "Rp 286jt", time: "17 Jul", amountColor: "text-[#c04860]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function BerandaScreen({ onNavigate, showToast }: BerandaScreenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-5 pt-4"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="border-b border-[#d4c8b4] pb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#0d7a6e] mb-1">
              // Pembeli B2B · PANORA
            </div>
            <h1 className="font-serif text-[22px] leading-tight text-[#1a1610]">
              PT Agro<br />Jaya Mandiri
            </h1>
            <p className="text-xs text-[#6a5e50] mt-1">Pasar Induk Cibitung, Bekasi</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0d7a6e] to-[#0a5a50] flex items-center justify-center font-serif text-[17px] text-white">
            AJ
          </div>
        </div>
      </motion.div>

      {/* Spending Card */}
      <motion.div
        variants={itemVariants}
        className="mt-5 bg-[#1a1610] rounded-[14px] p-5 relative overflow-hidden"
      >
        <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(13,122,110,0.3),transparent_70%)]" />
        <div className="absolute -bottom-10 -left-8 w-28 h-28 rounded-full bg-[radial-gradient(circle,rgba(192,72,96,0.15),transparent_70%)]" />
        
        <div className="relative z-10">
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.4)] mb-1.5">
            // Total Pembelian Bulan Ini
          </div>
          <div className="font-serif text-[34px] text-[#f5f0e8] leading-none mb-1">
            Rp 847.500.000
          </div>
          <p className="text-xs text-[rgba(245,240,232,0.5)] mb-4.5">
            28 order selesai · +18.4% vs bulan lalu
          </p>
          <div className="flex gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(action.id)}
                  className="flex-1 py-2.5 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.1)] rounded-lg text-center touch-feedback"
                >
                  <Icon size={15} className="mx-auto mb-0.5 text-[rgba(245,240,232,0.8)]" />
                  <span className="text-[10px] text-[rgba(245,240,232,0.55)] font-medium">
                    {action.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Notification Bar */}
      <motion.div
        variants={itemVariants}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate("supply")}
        className="mt-4 bg-[rgba(13,122,110,0.1)] border border-[rgba(13,122,110,0.25)] rounded-xl px-4 py-3 flex items-center gap-2.5 cursor-pointer touch-feedback"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a6e] animate-blink flex-shrink-0" />
        <span className="flex-1 text-xs font-semibold text-[#0d7a6e]">
          Harga Cabai Merah turun 3.2% — stok tersedia 48.6 ton
        </span>
        <span className="text-[#0d7a6e] text-sm">›</span>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={itemVariants} className="mt-5">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-2.5">
          // Ringkasan
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {metrics.map((metric, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(metric.label.includes("Order") ? "order" : metric.label.includes("RFQ") ? "permintaan" : metric.label.includes("Invoice") ? "bayar" : "supply")}
              className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] p-4 text-left touch-feedback cursor-pointer"
            >
              {metric.icon === "star" ? (
                <span className="text-xl mb-2 block">⭐</span>
              ) : (
                <metric.icon size={20} className="mb-2 text-[#1a1610]" />
              )}
              <div className={cn("font-serif text-[26px] leading-none mb-0.5", metric.color)}>
                {metric.value}
              </div>
              <div className="text-[11px] text-[#6a5e50]">{metric.label}</div>
              <div className={cn("text-[10px] mt-0.5", metric.color)}>{metric.sub}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div variants={itemVariants} className="mt-5 mb-6">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-2.5">
          // Order Terbaru
        </div>
        <div className="flex flex-col gap-2">
          {recentOrders.map((order, idx) => {
            const Icon = order.icon;
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(order.title.includes("Invoice") ? "bayar" : "order")}
                className="bg-[#eee8dc] border border-[#d4c8b4] rounded-xl px-4 py-3 flex items-center gap-3 touch-feedback cursor-pointer"
              >
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center border border-[#d4c8b4]", order.iconBg)}>
                  <Icon size={15} className="text-[#1a1610]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#1a1610] mb-0.5">{order.title}</div>
                  <div className="text-[10px] text-[#6a5e50] font-mono tracking-wide">{order.sub}</div>
                </div>
                <div className="text-right">
                  <div className={cn("font-serif text-[15px] text-[#1a1610]", order.amountColor)}>
                    {order.amount}
                  </div>
                  <div className="text-[9px] text-[#9a8e80] font-mono mt-0.5">{order.time}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
