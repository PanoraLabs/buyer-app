"use client";

import { motion } from "framer-motion";
import { Search, FileText, Package, Receipt, TrendingDown, Truck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BerandaScreenProps {
  onNavigate: (tab: string) => void;
  showToast: (message: string) => void;
}

const quickActions = [
  { id: "supply", icon: Search, label: "cari supply" },
  { id: "permintaan", icon: FileText, label: "buat rfq" },
  { id: "order", icon: Package, label: "lacak order" },
  { id: "bayar", icon: Receipt, label: "invoice" },
];

const metrics = [
  { icon: Package, value: "6", label: "order aktif", sub: "2 dalam pengiriman", color: "text-[#0d7a6e]" },
  { icon: FileText, value: "3", label: "rfq aktif", sub: "8 match ditemukan", color: "text-[#c87820]" },
  { icon: Receipt, value: "2", label: "invoice pending", sub: "jatuh tempo 3 hari", color: "text-[#c04860]" },
  { icon: "star", value: "4.8", label: "rating", sub: "terverifikasi B2B", color: "text-[#111827]" },
];

const recentOrders = [
  { icon: Truck, iconBg: "bg-[rgba(13,122,110,0.08)]", title: "cabai merah 6.8T · dalam perjalanan", sub: "ORD-2025-0142 · ETA 2j 14m", amount: "Rp 258jt", time: "hari ini", amountColor: "" },
  { icon: CheckCircle, iconBg: "bg-[rgba(26,122,66,0.08)]", title: "jagung hibrida 5T · diterima", sub: "ORD-2025-0139 · KUD Sleman", amount: "Rp 210jt", time: "12 Jul", amountColor: "" },
  { icon: Receipt, iconBg: "bg-[rgba(192,72,96,0.08)]", title: "invoice #INV-0089 jatuh tempo", sub: "padi GKP 5.2T · KUD Bantul", amount: "Rp 286jt", time: "17 Jul", amountColor: "text-[#c04860]" },
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
      <motion.div variants={itemVariants} className="border-b border-[#E5E7EB] pb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-mono text-[10px] tracking-[0.15em] text-[#6B7280] mb-1">
              pembeli B2B · PANORA
            </div>
            <h1 className="font-sans text-[22px] font-semibold leading-tight text-[#111827]">
              PT Agro<br />Jaya Mandiri
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">Pasar Induk Cibitung, Bekasi</p>
          </div>
          <div className="w-11 h-11 bg-[#111827] flex items-center justify-center font-sans text-[15px] font-bold text-white">
            AJ
          </div>
        </div>
      </motion.div>

      {/* Spending Card */}
      <motion.div
        variants={itemVariants}
        className="mt-5 bg-white border border-[#E5E7EB] p-5 relative overflow-hidden"
      >
        <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.08),transparent_70%)]" />
        
        <div className="relative z-10">
          <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5">
            total pembelian bulan ini
          </div>
          <div className="font-sans text-[32px] font-bold text-[#111827] leading-none mb-1">
            Rp 847.500.000
          </div>
          <p className="text-xs text-[#6B7280] mb-4">
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
                  className="flex-1 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] text-center touch-feedback"
                >
                  <Icon size={15} className="mx-auto mb-0.5 text-[#6B7280]" />
                  <span className="text-[10px] text-[#374151] font-medium lowercase">
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
        className="mt-4 bg-[#F3F4F6] border border-[#E5E7EB] px-4 py-3 flex items-center gap-2.5 cursor-pointer touch-feedback"
      >
        <span className="w-1.5 h-1.5 bg-[#FF6B00] animate-blink flex-shrink-0" />
        <span className="flex-1 text-xs font-medium text-[#111827]">
          harga cabai merah turun 3.2% — stok tersedia 48.6 ton
        </span>
        <span className="text-[#111827] text-sm">›</span>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={itemVariants} className="mt-5">
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-2.5 lowercase">
          ringkasan
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {metrics.map((metric, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(metric.label.includes("order") ? "order" : metric.label.includes("rfq") ? "permintaan" : metric.label.includes("invoice") ? "bayar" : "supply")}
              className="bg-white border border-[#E5E7EB] p-4 text-left touch-feedback cursor-pointer"
            >
              {metric.icon === "star" ? (
                <span className="text-xl mb-2 block">⭐</span>
              ) : (
                <metric.icon size={18} className="mb-2 text-[#6B7280]" />
              )}
              <div className={cn("font-sans text-[26px] font-bold leading-none mb-0.5", metric.color)}>
                {metric.value}
              </div>
              <div className="text-[11px] text-[#6B7280] lowercase">{metric.label}</div>
              <div className={cn("text-[10px] mt-0.5", metric.color)}>{metric.sub}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div variants={itemVariants} className="mt-5 mb-6">
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-2.5 lowercase">
          order terbaru
        </div>
        <div className="flex flex-col gap-2">
          {recentOrders.map((order, idx) => {
            const Icon = order.icon;
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(order.title.includes("invoice") ? "bayar" : "order")}
                className="bg-white border border-[#E5E7EB] px-4 py-3 flex items-center gap-3 touch-feedback cursor-pointer"
              >
                <div className={cn("w-9 h-9 flex items-center justify-center border border-[#E5E7EB]", order.iconBg)}>
                  <Icon size={15} className="text-[#111827]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#111827] mb-0.5 lowercase">{order.title}</div>
                  <div className="text-[10px] text-[#6B7280] font-mono tracking-wide">{order.sub}</div>
                </div>
                <div className="text-right">
                  <div className={cn("font-sans text-[15px] font-bold text-[#111827]", order.amountColor)}>
                    {order.amount}
                  </div>
                  <div className="text-[9px] text-[#9CA3AF] font-mono mt-0.5">{order.time}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
