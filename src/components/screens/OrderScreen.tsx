"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Thermometer, MapPin, Clock, Truck, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderScreenProps {
  showToast: (message: string) => void;
}

const tabs = [
  { id: "aktif", label: "aktif (6)" },
  { id: "selesai", label: "selesai" },
  { id: "dibatalkan", label: "dibatalkan" },
];

const activeOrders = [
  {
    id: "ORD-2025-0142",
    date: "14 Jul 2025",
    badge: "dikirim",
    badgeColor: "b-teal",
    komoditas: "sayuran · segar",
    name: "cabai merah keriting",
    vol: "6.8 ton",
    grade: "grade A",
    supplier: "KUD Magelang",
    destination: "Cibitung",
    price: "Rp 250.2jt",
    unitPrice: "Rp 36.800/kg",
    tracking: {
      steps: [
        { label: "muat", done: true },
        { label: "verif", done: true },
        { label: "jalan", done: false, active: true },
        { label: "tiba", done: false },
        { label: "terima", done: false },
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
    badge: "tiba — konfirmasi",
    badgeColor: "b-amber",
    komoditas: "serealia · kering",
    name: "jagung hibrida NK 7328",
    vol: "5.0 ton",
    grade: "kadar air 13.2%",
    supplier: "KUD Sleman",
    destination: "Gudang tujuan",
    price: "Rp 210jt",
    unitPrice: "Rp 42.000/kg",
    tracking: {
      steps: [
        { label: "muat", done: true },
        { label: "verif", done: true },
        { label: "jalan", done: true },
        { label: "tiba", done: false, active: true },
        { label: "terima", done: false },
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
    badge: "selesai",
    badgeColor: "b-green",
    komoditas: "serealia · GKP",
    name: "padi GKP IR-64",
    vol: "5.2 ton",
    grade: "grade A",
    supplier: "KUD Bantul",
    destination: "Dibayar lunas",
    price: "Rp 286jt",
    unitPrice: "dibayar ✓",
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
      className="pt-4 px-4 sm:px-5 w-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-3.5">
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1">
          6 order aktif
        </div>
        <h1 className="font-sans text-[24px] font-bold text-[#111827] lowercase">
          order <span className="text-[#0d7a6e]">management</span>
        </h1>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="flex bg-[#F3F4F6] p-1 border border-[#E5E7EB]">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-2 text-center text-[11px] font-medium transition-all lowercase",
                activeTab === tab.id
                  ? "bg-[#111827] text-white"
                  : "text-[#6B7280]"
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
                className="bg-white border border-[#E5E7EB] overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                  <span className="font-mono text-[10px] text-[#6B7280]">
                    {order.id} · {order.date}
                  </span>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-wide",
                    order.badgeColor === "b-teal" && "bg-[rgba(13,122,110,0.1)] text-[#0d7a6e] border border-[rgba(13,122,110,0.25)]",
                    order.badgeColor === "b-amber" && "bg-[rgba(200,120,32,0.1)] text-[#c87820] border border-[rgba(200,120,32,0.25)]"
                  )}>
                    {order.badge}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="font-mono text-[10px] tracking-[0.12em] text-[#9CA3AF] mb-0.5 uppercase">
                    {order.komoditas}
                  </div>
                  <h3 className="font-sans text-lg font-bold text-[#111827] mb-2.5 lowercase">
                    {order.name}
                  </h3>

                  {/* Meta */}
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="text-[13px] font-semibold text-[#374151] lowercase">
                        {order.vol} · {order.grade}
                      </div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5 flex items-center gap-1">
                        <MapPin size={12} />
                        {order.supplier} → {order.destination}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-sans text-xl font-bold text-[#111827]">
                        {order.price}
                      </div>
                      <div className="text-[10px] text-[#6B7280]">
                        {order.unitPrice}
                      </div>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-3 mb-2.5">
                    <div className="font-mono text-[10px] tracking-[0.12em] text-[#9CA3AF] mb-2.5 uppercase">
                      tracking pengiriman
                    </div>
                    <div className="flex items-center relative">
                      {order.tracking.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex-1 flex flex-col items-center relative">
                          <div className={cn(
                            "w-5 h-5 border flex items-center justify-center text-[8px] relative z-10",
                            step.done && "bg-[#0d7a6e] border-[#0d7a6e] text-white",
                            step.active && "bg-white border-[#111827]",
                            !step.done && !step.active && "bg-white border-[#E5E7EB]"
                          )}>
                            {step.done && <Check size={10} />}
                            {step.active && <div className="w-1.5 h-1.5 bg-[#111827]" />}
                          </div>
                          <span className={cn(
                            "text-[8px] font-mono mt-1.5 text-center lowercase",
                            step.active ? "text-[#111827] font-bold" : "text-[#9CA3AF]"
                          )}>
                            {step.label}
                          </span>
                          {sIdx < order.tracking.steps.length - 1 && (
                            <div className={cn(
                              "absolute top-2.5 left-[60%] right-[-40%] h-px",
                              step.done ? "bg-[#0d7a6e]" : "bg-[#E5E7EB]"
                            )} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* IoT Snippet (if available) */}
                  {order.iot && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-2.5 text-center">
                        <Thermometer size={14} className="mx-auto mb-0.5 text-[#1a7a42]" />
                        <div className="font-sans text-sm font-bold text-[#111827]">{order.iot.temp}</div>
                        <div className="text-[9px] text-[#9CA3AF] font-mono uppercase tracking-wide">suhu</div>
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-2.5 text-center">
                        <Truck size={14} className="mx-auto mb-0.5 text-[#0d7a6e]" />
                        <div className="font-sans text-sm font-bold text-[#111827]">{order.iot.progress}</div>
                        <div className="text-[9px] text-[#9CA3AF] font-mono uppercase tracking-wide">progress</div>
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-2.5 text-center">
                        <Clock size={14} className="mx-auto mb-0.5 text-[#c87820]" />
                        <div className="font-sans text-sm font-bold text-[#111827]">{order.iot.eta}</div>
                        <div className="text-[9px] text-[#9CA3AF] font-mono uppercase tracking-wide">eta</div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast(order.canConfirm ? "penerimaan dikonfirmasi" : "menunggu barang tiba")}
                      disabled={!order.canConfirm}
                      className={cn(
                        "flex-1 py-2.5 text-xs font-bold touch-feedback lowercase",
                        order.canConfirm
                          ? "bg-[#111827] text-white"
                          : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                      )}
                    >
                      {order.canConfirm ? "konfirmasi terima" : "konfirmasi penerimaan"}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast(order.canConfirm ? "membuka invoice" : "membuka detail tracking")}
                      className="px-4 py-2.5 bg-transparent border border-[#E5E7EB] text-xs font-medium text-[#6B7280] touch-feedback lowercase"
                    >
                      {order.canConfirm ? "invoice" : "track"}
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
                className="bg-white border border-[#E5E7EB] overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                  <span className="font-mono text-[10px] text-[#6B7280]">
                    {order.id} · {order.date}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-wide bg-[rgba(26,122,66,0.1)] text-[#1a7a42] border border-[rgba(26,122,66,0.25)]">
                    {order.badge} ✓
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="font-mono text-[10px] tracking-[0.12em] text-[#9CA3AF] mb-0.5 uppercase">
                    {order.komoditas}
                  </div>
                  <h3 className="font-sans text-lg font-bold text-[#111827] mb-2.5 lowercase">
                    {order.name}
                  </h3>

                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="text-[13px] font-semibold text-[#374151] lowercase">
                        {order.vol} · {order.grade}
                      </div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">
                        {order.supplier} · {order.destination}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-sans text-xl font-bold text-[#111827]">
                        {order.price}
                      </div>
                      <div className="text-[10px] text-[#6B7280]">
                        {order.unitPrice}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast("membuka riwayat order")}
                      className="flex-1 py-2.5 bg-[#111827] text-white text-xs font-bold touch-feedback lowercase"
                    >
                      lihat detail
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast("buat order ulang")}
                      className="px-4 py-2.5 bg-transparent border border-[#E5E7EB] text-xs font-medium text-[#6B7280] touch-feedback lowercase"
                    >
                      pesan lagi
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "dibatalkan" && (
          <div className="py-10 text-center text-[#9CA3AF]">
            <div className="text-4xl mb-3">📭</div>
            <div className="font-sans text-lg font-medium text-[#6B7280] lowercase">
              tidak ada order yang dibatalkan
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
