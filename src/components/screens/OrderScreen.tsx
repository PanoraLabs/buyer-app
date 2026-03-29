"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Thermometer, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderScreenProps {
  showToast: (message: string) => void;
}

const tabs = [
  { id: "aktif", label: "Aktif (6)" },
  { id: "selesai", label: "Selesai" },
  { id: "dibatalkan", label: "Dibatalkan" },
];

const activeOrders = [
  {
    id: "ORD-2025-0142",
    date: "14 Jul 2025",
    badge: "Dikirim",
    badgeColor: "b-teal",
    komoditas: "Sayuran · Segar",
    name: "Cabai Merah Keriting",
    vol: "6.8 Ton · Grade A",
    supplier: "📍 KUD Magelang → Cibitung",
    price: "Rp 250.2jt",
    unitPrice: "Rp 36.800/kg",
    tracking: {
      steps: [
        { label: "Muat", done: true },
        { label: "Verif", done: true },
        { label: "Jalan", done: false, active: true },
        { label: "Tiba", done: false },
        { label: "Terima", done: false },
      ],
    },
    iot: {
      temp: "4.2°C",
      progress: "63%",
      eta: "2j14m",
    },
    canConfirm: false,
  },
  {
    id: "ORD-2025-0140",
    date: "13 Jul 2025",
    badge: "Tiba — Konfirmasi",
    badgeColor: "b-amber",
    komoditas: "Serealia · Kering",
    name: "Jagung Hibrida NK 7328",
    vol: "5.0 Ton · Kadar Air 13.2%",
    supplier: "📍 KUD Sleman · Diterima gudang",
    price: "Rp 210jt",
    unitPrice: "Rp 42.000/kg",
    tracking: {
      steps: [
        { label: "Muat", done: true },
        { label: "Verif", done: true },
        { label: "Jalan", done: true },
        { label: "Tiba", done: false, active: true },
        { label: "Terima", done: false },
      ],
    },
    iot: null,
    canConfirm: true,
  },
];

const completedOrders = [
  {
    id: "ORD-2025-0139",
    date: "12 Jul 2025",
    badge: "Selesai",
    badgeColor: "b-green",
    komoditas: "Serealia · GKP",
    name: "Padi GKP IR-64",
    vol: "5.2 Ton · Grade A",
    supplier: "📍 KUD Bantul · Dibayar lunas",
    price: "Rp 286jt",
    unitPrice: "Dibayar ✓",
  },
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

export function OrderScreen({ showToast }: OrderScreenProps) {
  const [activeTab, setActiveTab] = useState("aktif");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-5 px-5"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-3.5">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-1">
          // 6 Order Aktif
        </div>
        <h1 className="font-serif text-[26px] text-[#1a1610]">
          Order <em className="text-[#0d7a6e] italic">Management</em>
        </h1>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="flex bg-[#e8e0d0] rounded-xl p-1 border border-[#d4c8b4]">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-2 text-center text-[11px] font-bold rounded-lg whitespace-nowrap transition-all",
                activeTab === tab.id
                  ? "bg-[#1a1610] text-[#f5f0e8]"
                  : "text-[#6a5e50]"
              )}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants} className="pb-6">
        {activeTab === "aktif" && (
          <div className="flex flex-col gap-3">
            {activeOrders.map((order, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#d4c8b4] flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#6a5e50]">
                    {order.id} · {order.date}
                  </span>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono tracking-wide",
                    order.badgeColor === "b-teal" && "bg-[rgba(13,122,110,0.1)] text-[#0d7a6e] border border-[rgba(13,122,110,0.25)]",
                    order.badgeColor === "b-amber" && "bg-[rgba(200,120,32,0.1)] text-[#c87820] border border-[rgba(200,120,32,0.25)]"
                  )}>
                    {order.badge} {order.badgeColor === "b-teal" && "🚛"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#9a8e80] mb-0.5">
                    {order.komoditas}
                  </div>
                  <h3 className="font-serif text-lg text-[#1a1610] mb-2.5">
                    {order.name}
                  </h3>

                  {/* Meta */}
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="text-[13px] font-semibold text-[#3a3228]">
                        {order.vol}
                      </div>
                      <div className="text-[11px] text-[#6a5e50] mt-0.5">
                        {order.supplier}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-xl text-[#1a1610]">
                        {order.price}
                      </div>
                      <div className="text-[10px] text-[#6a5e50]">
                        {order.unitPrice}
                      </div>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className="bg-[#e8e0d0] rounded-lg p-3 mb-2.5">
                    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#9a8e80] mb-2.5">
                      TRACKING PENGIRIMAN
                    </div>
                    <div className="flex items-center relative">
                      {order.tracking.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex-1 flex flex-col items-center relative">
                          <div className={cn(
                            "w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center text-[10px] relative z-10",
                            step.done && "bg-[#0d7a6e] border-[#0d7a6e] text-white",
                            step.active && "bg-[#f5f0e8] border-[#0d7a6e] shadow-[0_0_0_3px_rgba(13,122,110,0.1)]",
                            !step.done && !step.active && "bg-[#f5f0e8] border-[#d4c8b4]"
                          )}>
                            {step.done && <Check size={10} />}
                            {step.active && <div className="w-2 h-2 rounded-full bg-[#0d7a6e]" />}
                          </div>
                          <span className={cn(
                            "text-[9px] font-mono mt-1.5 text-center",
                            step.active ? "text-[#0d7a6e] font-bold" : "text-[#9a8e80]"
                          )}>
                            {step.label}
                          </span>
                          {sIdx < order.tracking.steps.length - 1 && (
                            <div className={cn(
                              "absolute top-2.5 left-[60%] right-[-40%] h-0.5",
                              step.done ? "bg-[#0d7a6e]" : "bg-[#d4c8b4]"
                            )} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* IoT Snippet (if available) */}
                  {order.iot && (
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 bg-[#e8e0d0] border border-[#d4c8b4] rounded-lg p-2.5 text-center">
                        <Thermometer size={14} className="mx-auto mb-0.5 text-[#1a7a42]" />
                        <div className="font-serif text-sm text-[#1a1610]">{order.iot.temp}</div>
                        <div className="text-[9px] text-[#9a8e80] font-mono uppercase tracking-wide">Suhu</div>
                      </div>
                      <div className="flex-1 bg-[#e8e0d0] border border-[#d4c8b4] rounded-lg p-2.5 text-center">
                        <MapPin size={14} className="mx-auto mb-0.5 text-[#0d7a6e]" />
                        <div className="font-serif text-sm text-[#1a1610]">{order.iot.progress}</div>
                        <div className="text-[9px] text-[#9a8e80] font-mono uppercase tracking-wide">Progress</div>
                      </div>
                      <div className="flex-1 bg-[#e8e0d0] border border-[#d4c8b4] rounded-lg p-2.5 text-center">
                        <Clock size={14} className="mx-auto mb-0.5 text-[#c87820]" />
                        <div className="font-serif text-sm text-[#1a1610]">{order.iot.eta}</div>
                        <div className="text-[9px] text-[#9a8e80] font-mono uppercase tracking-wide">ETA</div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast(order.canConfirm ? "✓ Penerimaan dikonfirmasi! Pembayaran diproses..." : "Menunggu barang tiba...")}
                      disabled={!order.canConfirm}
                      className={cn(
                        "flex-1 py-2.5 rounded-lg text-xs font-bold touch-feedback",
                        order.canConfirm
                          ? "bg-[#1a7a42] text-white"
                          : "bg-[#0d7a6e] text-white opacity-50 cursor-not-allowed"
                      )}
                    >
                      {order.canConfirm ? "✓ Konfirmasi Terima" : "Konfirmasi Penerimaan"}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast(order.canConfirm ? "🧾 Membuka invoice..." : "📋 Membuka detail tracking...")}
                      className="px-4 py-2.5 bg-transparent border border-[#d4c8b4] rounded-lg text-xs font-semibold text-[#6a5e50] touch-feedback"
                    >
                      {order.canConfirm ? "Invoice" : "Track"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "selesai" && (
          <div className="flex flex-col gap-3">
            {completedOrders.map((order, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#d4c8b4] flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#6a5e50]">
                    {order.id} · {order.date}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono tracking-wide bg-[rgba(26,122,66,0.1)] text-[#1a7a42] border border-[rgba(26,122,66,0.25)]">
                    {order.badge} ✓
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#9a8e80] mb-0.5">
                    {order.komoditas}
                  </div>
                  <h3 className="font-serif text-lg text-[#1a1610] mb-2.5">
                    {order.name}
                  </h3>

                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="text-[13px] font-semibold text-[#3a3228]">
                        {order.vol}
                      </div>
                      <div className="text-[11px] text-[#6a5e50] mt-0.5">
                        {order.supplier}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-xl text-[#1a1610]">
                        {order.price}
                      </div>
                      <div className="text-[10px] text-[#6a5e50]">
                        {order.unitPrice}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast("📋 Membuka riwayat order...")}
                      className="flex-1 py-2.5 bg-[#6a5e50] text-white rounded-lg text-xs font-bold touch-feedback"
                    >
                      Lihat Detail
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast("🔄 Buat order ulang...")}
                      className="px-4 py-2.5 bg-transparent border border-[#d4c8b4] rounded-lg text-xs font-semibold text-[#6a5e50] touch-feedback"
                    >
                      Pesan Lagi
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "dibatalkan" && (
          <div className="py-10 text-center text-[#9a8e80]">
            <div className="text-4xl mb-3">📭</div>
            <div className="font-serif text-xl text-[#6a5e50]">
              Tidak ada order yang dibatalkan
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
