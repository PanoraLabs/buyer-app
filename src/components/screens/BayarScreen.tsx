"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
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
    badge: "jatuh tempo 3 hari",
    badgeColor: "b-rose",
    icon: "🌾",
    title: "padi GKP 5.2T",
    orderId: "ORD-2025-0139",
    supplier: "KUD Bantul",
    amount: "Rp 286jt",
    date: "17 Jul",
    escrow: true,
  },
  {
    id: "INV-2025-0091",
    badge: "jatuh tempo 7 hari",
    badgeColor: "b-amber",
    icon: "🧅",
    title: "bawang merah 3.2T",
    orderId: "ORD-2025-0141",
    supplier: "Gapoktan Brebes",
    amount: "Rp 250jt",
    date: "25 Jul",
    escrow: true,
  },
];

const paidInvoices = [
  {
    id: "INV-2025-0088",
    badge: "lunas",
    badgeColor: "b-green",
    icon: "🌽",
    title: "jagung hibrida 5T",
    orderId: "ORD-2025-0137",
    supplier: "KUD Sleman",
    amount: "Rp 210jt",
    date: "12 Jul",
    status: "dibayar ✓",
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
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1">
          keuangan & invoice
        </div>
        <h1 className="font-sans text-[24px] font-bold text-[#111827] lowercase">
          pembayaran <span className="text-[#0d7a6e]">& bayar</span>
        </h1>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        variants={itemVariants}
        className="bg-[#111827] p-5 relative overflow-hidden mb-4"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.1),transparent_70%)]" />
        
        <div className="relative z-10">
          <div className="font-mono text-[10px] tracking-[0.15em] text-[rgba(255,255,255,0.5)] mb-1">
            ringkasan keuangan bulan ini
          </div>
          <div className="font-sans text-[32px] font-bold text-white leading-tight mb-1">
            {summary.amount}
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.5)] mb-4">
            total pembelian · 28 transaksi selesai
          </p>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.1)]">
            <div className="bg-[rgba(255,255,255,0.05)] p-3 text-center">
              <div className="font-sans text-[17px] font-bold text-white">
                {summary.lunas}
              </div>
              <div className="text-[9px] text-[rgba(255,255,255,0.5)] font-mono tracking-wide mt-1 lowercase">
                lunas
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] p-3 text-center">
              <div className="font-sans text-[17px] font-bold text-[#c04860]">
                {summary.outstanding}
              </div>
              <div className="text-[9px] text-[rgba(255,255,255,0.5)] font-mono tracking-wide mt-1 lowercase">
                outstanding
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] p-3 text-center">
              <div className="font-sans text-[17px] font-bold text-[#00D1FF]">
                {summary.belum}
              </div>
              <div className="text-[9px] text-[rgba(255,255,255,0.5)] font-mono tracking-wide mt-1 lowercase">
                belum bayar
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Outstanding Invoices */}
      <motion.div variants={itemVariants} className="mb-5">
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-2.5 lowercase">
          2 invoice outstanding
        </div>

        <div className="flex flex-col gap-2">
          {outstandingInvoices.map((inv, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.99 }}
              className="bg-white border border-[#E5E7EB] overflow-hidden cursor-pointer touch-feedback"
            >
              {/* Header */}
              <div className="px-4 py-2.5 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                <span className="font-mono text-[10px] text-[#6B7280]">{inv.id}</span>
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-wide",
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
                    <h4 className="text-[13px] font-bold text-[#111827] mb-0.5 lowercase">{inv.title}</h4>
                    <p className="text-[11px] text-[#6B7280]">
                      {inv.supplier} · {inv.orderId}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "font-sans text-lg font-bold",
                      inv.badgeColor === "b-rose" ? "text-[#c04860]" : "text-[#c87820]"
                    )}>
                      {inv.amount}
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] font-mono">due {inv.date}</div>
                  </div>
                </div>

                {/* Escrow Note */}
                {inv.escrow && (
                  <div className="mb-3 p-2 bg-[#F9FAFB] border border-[#E5E7EB] flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0d7a6e]" />
                    <span className="text-[10px] text-[#6B7280]">
                      pembayaran aman (escrow) — dana dikunci hingga barang diterima
                    </span>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => showToast("membuka gateway pembayaran")}
                  className={cn(
                    "w-full py-2.5 text-xs font-bold touch-feedback flex items-center justify-center gap-2 lowercase",
                    inv.badgeColor === "b-rose" ? "bg-[#c04860] text-white" : "bg-[#c87820] text-white"
                  )}
                >
                  bayar sekarang
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
        className="bg-white border border-[#E5E7EB] border-dashed p-4 mb-5"
      >
        <h3 className="text-[13px] font-bold text-[#111827] mb-3 lowercase">transfer virtual account</h3>

        <div className="space-y-2">
          {bankAccounts.map((acc, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-[#E5E7EB] last:border-0">
              <span className="text-[11px] text-[#6B7280]">{acc.bank}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] text-[#111827] font-bold">{acc.no}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => showToast(`nomor ${acc.bank} disalin`)}
                  className="px-2.5 py-1 bg-[#F3F4F6] border border-[#E5E7EB] text-[10px] font-bold text-[#111827] lowercase"
                >
                  salin
                </motion.button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#9CA3AF] font-mono mt-2">a/n PT AGRO JAYA MANDIRI</p>
      </motion.div>

      {/* Paid Invoices */}
      <motion.div variants={itemVariants} className="pb-6">
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-2.5 lowercase">
          riwayat lunas
        </div>

        <div className="flex flex-col gap-2">
          {paidInvoices.map((inv, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.99 }}
              className="bg-white border border-[#E5E7EB] overflow-hidden cursor-pointer touch-feedback"
            >
              {/* Header */}
              <div className="px-4 py-2.5 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                <span className="font-mono text-[10px] text-[#6B7280]">{inv.id}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-wide bg-[rgba(26,122,66,0.1)] text-[#1a7a42] border border-[rgba(26,122,66,0.25)]">
                  {inv.badge} ✓
                </span>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{inv.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-[#111827] mb-0.5 lowercase">{inv.title}</h4>
                    <p className="text-[11px] text-[#6B7280]">
                      {inv.supplier} · {inv.orderId}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-sans text-lg font-bold text-[#111827]">{inv.amount}</div>
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
