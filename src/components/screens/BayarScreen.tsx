"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BayarScreenProps {
  showToast: (message: string) => void;
}

const summary = {
  amount: "Rp 847.500.000",
  lunas: 28,
  outstanding: 2,
  belum: "Rp 536jt",
};

const outstandingInvoices = [
  {
    id: "INV-2025-0089",
    badge: "Jatuh Tempo 3 Hari",
    badgeColor: "b-rose",
    icon: "🌾",
    title: "Padi GKP 5.2T",
    orderId: "ORD-2025-0139",
    supplier: "KUD Bantul",
    amount: "Rp 286jt",
    date: "17 Jul",
  },
  {
    id: "INV-2025-0091",
    badge: "Jatuh Tempo 7 Hari",
    badgeColor: "b-amber",
    icon: "🧅",
    title: "Bawang Merah 3.2T",
    orderId: "ORD-2025-0141",
    supplier: "Gapoktan Brebes",
    amount: "Rp 250jt",
    date: "25 Jul",
  },
];

const paidInvoices = [
  {
    id: "INV-2025-0088",
    badge: "Lunas",
    badgeColor: "b-green",
    icon: "🌽",
    title: "Jagung Hibrida 5T",
    orderId: "ORD-2025-0137",
    supplier: "KUD Sleman",
    amount: "Rp 210jt",
    date: "12 Jul",
    status: "✓ Lunas",
    statusColor: "text-[#1a7a42]",
  },
];

const bankAccounts = [
  { bank: "BCA", no: "8277 0042 8391 04" },
  { bank: "Mandiri", no: "1570 0082 3942 91" },
  { bank: "BNI", no: "0421 9381 4729 20" },
  { bank: "BRI", no: "0089 4729 3842 19" },
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

export function BayarScreen({ showToast }: BayarScreenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-5 px-5"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-1">
          // Keuangan & Invoice
        </div>
        <h1 className="font-serif text-[26px] text-[#1a1610]">
          Pembayaran <em className="text-[#0d7a6e] italic">&amp; Bayar</em>
        </h1>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        variants={itemVariants}
        className="bg-[#1a1610] rounded-[14px] p-5 relative overflow-hidden mb-4"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(13,122,110,0.2),transparent_70%)]" />
        
        <div className="relative z-10">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[rgba(245,240,232,0.35)] mb-1">
            // Ringkasan Keuangan Bulan Ini
          </div>
          <div className="font-serif text-[32px] text-[#f5f0e8] leading-tight mb-1">
            {summary.amount}
          </div>
          <p className="text-xs text-[rgba(245,240,232,0.4)] mb-4.5">
            Total pembelian · 28 transaksi selesai
          </p>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-0 bg-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden">
            <div className="p-3 text-center border-r border-[rgba(255,255,255,0.06)]">
              <div className="font-serif text-[17px] text-[rgba(245,240,232,0.8)]">
                {summary.lunas}
              </div>
              <div className="text-[9px] text-[rgba(245,240,232,0.35)] font-mono tracking-wide mt-1">
                Lunas
              </div>
            </div>
            <div className="p-3 text-center border-r border-[rgba(255,255,255,0.06)]">
              <div className="font-serif text-[17px] text-[#c04860]">
                {summary.outstanding}
              </div>
              <div className="text-[9px] text-[rgba(245,240,232,0.35)] font-mono tracking-wide mt-1">
                Outstanding
              </div>
            </div>
            <div className="p-3 text-center">
              <div className="font-serif text-[17px] text-[#12a898]">
                {summary.belum}
              </div>
              <div className="text-[9px] text-[rgba(245,240,232,0.35)] font-mono tracking-wide mt-1">
                Belum Bayar
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Outstanding Invoices */}
      <motion.div variants={itemVariants} className="mb-5">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-2.5">
          // 2 Invoice Outstanding
        </div>

        <div className="flex flex-col gap-2">
          {outstandingInvoices.map((inv, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.99 }}
              className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] overflow-hidden cursor-pointer touch-feedback"
            >
              {/* Header */}
              <div className="px-4 py-2.5 border-b border-[#d4c8b4] flex justify-between items-center bg-[#e8e0d0]">
                <span className="font-mono text-[10px] text-[#6a5e50]">{inv.id}</span>
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono tracking-wide",
                  inv.badgeColor === "b-rose" && "bg-[rgba(192,72,96,0.1)] text-[#c04860] border border-[rgba(192,72,96,0.25)]",
                  inv.badgeColor === "b-amber" && "bg-[rgba(200,120,32,0.1)] text-[#c87820] border border-[rgba(200,120,32,0.25)]"
                )}>
                  {inv.badge}
                </span>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{inv.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-[#1a1610] mb-0.5">{inv.title}</h4>
                    <p className="text-[11px] text-[#6a5e50]">
                      {inv.supplier} · {inv.orderId}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "font-serif text-lg",
                      inv.badgeColor === "b-rose" ? "text-[#c04860]" : "text-[#c87820]"
                    )}>
                      {inv.amount}
                    </div>
                    <div className="text-[10px] text-[#9a8e80] font-mono">Due {inv.date}</div>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => showToast(`💳 Membuka gateway pembayaran...`)}
                  className={cn(
                    "w-full py-2.5 rounded-lg text-xs font-bold touch-feedback flex items-center justify-center gap-2",
                    inv.badgeColor === "b-rose" ? "bg-[#c04860] text-white" : "bg-[#c87820] text-white"
                  )}
                >
                  Bayar Sekarang
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Virtual Account */}
      <motion.div
        variants={itemVariants}
        className="bg-[#eee8dc] border border-[#d4c8b4] border-dashed border-[#d4c8b4] rounded-[14px] p-4 mb-5"
      >
        <h3 className="text-[13px] font-bold text-[#1a1610] mb-3">Transfer Virtual Account</h3>

        <div className="space-y-2">
          {bankAccounts.map((acc, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-[#d4c8b4] last:border-0">
              <span className="text-[11px] text-[#6a5e50]">{acc.bank}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] text-[#1a1610] font-bold">{acc.no}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => showToast(`✓ Nomor ${acc.bank} disalin`)}
                  className="px-2.5 py-1 bg-[rgba(13,122,110,0.1)] border border-[rgba(13,122,110,0.2)] rounded text-[10px] font-bold text-[#0d7a6e]"
                >
                  Salin
                </motion.button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#9a8e80] font-mono mt-2">a/n PT AGRO JAYA MANDIRI</p>
      </motion.div>

      {/* Paid Invoices */}
      <motion.div variants={itemVariants} className="pb-6">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-2.5">
          // Riwayat Lunas
        </div>

        <div className="flex flex-col gap-2">
          {paidInvoices.map((inv, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.99 }}
              className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] overflow-hidden cursor-pointer touch-feedback"
            >
              {/* Header */}
              <div className="px-4 py-2.5 border-b border-[#d4c8b4] flex justify-between items-center bg-[#e8e0d0]">
                <span className="font-mono text-[10px] text-[#6a5e50]">{inv.id}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono tracking-wide bg-[rgba(26,122,66,0.1)] text-[#1a7a42] border border-[rgba(26,122,66,0.25)]">
                  {inv.badge} ✓
                </span>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{inv.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-[#1a1610] mb-0.5">{inv.title}</h4>
                    <p className="text-[11px] text-[#6a5e50]">
                      {inv.supplier} · {inv.orderId}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-lg text-[#1a1610]">{inv.amount}</div>
                    <div className={cn("text-[10px] font-mono mt-0.5", inv.statusColor)}>
                      {inv.status}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
