"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Box, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PermintaanScreenProps {
  showToast: (message: string) => void;
}

const priorities = [
  { id: "normal", label: "normal", color: "text-[#1a7a42]", bg: "bg-[rgba(26,122,66,0.1)]", border: "border-[rgba(26,122,66,0.3)]" },
  { id: "urgent", label: "mendesak", color: "text-[#c87820]", bg: "bg-[rgba(200,120,32,0.1)]", border: "border-[rgba(200,120,32,0.3)]" },
  { id: "critical", label: "kritis", color: "text-[#c04860]", bg: "bg-[rgba(192,72,96,0.1)]", border: "border-[rgba(192,72,96,0.3)]" },
];

const activeRFQs = [
  {
    id: "RFQ-2025-0092",
    badge: "8 match",
    badgeClass: "b-green",
    komoditas: "sayuran · segar",
    name: "cabai merah 10T",
    budget: "Rp 38rb/kg",
    butuh: "20 Agu",
    wilayah: "Jateng",
    progress: 80,
    progressLabel: "8 cocok",
  },
  {
    id: "RFQ-2025-0090",
    badge: "menunggu",
    badgeClass: "b-amber",
    komoditas: "serealia · kering",
    name: "jagung hibrida 20T",
    budget: "Rp 4.300/kg",
    butuh: "25 Agu",
    wilayah: "DIY",
    progress: 30,
    progressLabel: "mencari...",
  },
];

const komoditasOptions = [
  "cabai merah keriting",
  "jagung hibrida",
  "padi GKP",
  "bawang merah",
  "kedelai",
];

const wilayahOptions = ["semua", "Jawa Tengah", "DIY", "Jawa Barat", "Jawa Timur"];

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

export function PermintaanScreen({ showToast }: PermintaanScreenProps) {
  const [selectedPriority, setSelectedPriority] = useState("normal");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-4 px-4 sm:px-5 w-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1">
          auto-match engine
        </div>
        <h1 className="font-sans text-[24px] font-bold text-[#111827] lowercase">
          buat <span className="text-[#0d7a6e]">permintaan</span>
        </h1>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        variants={itemVariants}
        className="bg-[#111827] p-5 relative overflow-hidden mb-4"
      >
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.15),transparent_70%)]" />
        
        <div className="relative z-10">
          <div className="font-mono text-[10px] tracking-[0.15em] text-[#00D1FF] mb-2">
            panora-match · aktif
          </div>
          <h2 className="font-sans text-[20px] font-bold text-white leading-tight mb-1.5 lowercase">
            RFQ anda dicocokkan<br />dengan 480+ petani
          </h2>
          <p className="text-xs text-[rgba(255,255,255,0.6)] mb-4">
            engine bekerja otomatis — cocokkan RFQ dengan petani terbaik berdasarkan harga, lokasi, dan jadwal panen
          </p>
          
          <div className="flex gap-5">
            <div>
              <div className="font-sans text-[22px] font-bold text-[#00D1FF] leading-none">3</div>
              <div className="text-[10px] text-[rgba(255,255,255,0.5)] mt-0.5 lowercase">rfq aktif</div>
            </div>
            <div>
              <div className="font-sans text-[22px] font-bold text-[#00D1FF] leading-none">8</div>
              <div className="text-[10px] text-[rgba(255,255,255,0.5)] mt-0.5 lowercase">match baru</div>
            </div>
            <div>
              <div className="font-sans text-[22px] font-bold text-[#00D1FF] leading-none">480+</div>
              <div className="text-[10px] text-[rgba(255,255,255,0.5)] mt-0.5 lowercase">petani pool</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-[#E5E7EB] p-5 mb-4"
      >
        <h3 className="font-sans text-lg font-bold text-[#111827] mb-4 lowercase">+ rfq baru</h3>
        
        {/* Komoditas */}
        <div className="mb-3.5">
          <label className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5 block uppercase">
            komoditas
          </label>
          <select className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#111827] outline-none focus:border-[#111827] appearance-none cursor-pointer lowercase">
            {komoditasOptions.map((opt) => (
              <option key={opt} className="lowercase">{opt}</option>
            ))}
          </select>
        </div>

        {/* Volume & Budget */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div>
            <label className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5 block uppercase">
              volume (ton)
            </label>
            <input
              type="number"
              placeholder="0.0"
              className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#111827] outline-none focus:border-[#111827]"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5 block uppercase">
              budget/kg (Rp)
            </label>
            <input
              type="number"
              placeholder="maks harga"
              className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#111827] outline-none focus:border-[#111827]"
            />
          </div>
        </div>

        {/* Tanggal & Wilayah */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div>
            <label className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5 block uppercase">
              tanggal butuh
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#111827] outline-none focus:border-[#111827]"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5 block uppercase">
              wilayah asal
            </label>
            <select className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#111827] outline-none focus:border-[#111827] appearance-none cursor-pointer lowercase">
              {wilayahOptions.map((opt) => (
                <option key={opt} className="lowercase">{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Priority */}
        <div className="mb-3.5">
          <label className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5 block uppercase">
            prioritas
          </label>
          <div className="flex gap-2">
            {priorities.map((priority) => (
              <motion.button
                key={priority.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPriority(priority.id)}
                className={cn(
                  "flex-1 py-2 text-center border text-[11px] font-medium transition-all lowercase",
                  selectedPriority === priority.id
                    ? `${priority.bg} ${priority.border} ${priority.color}`
                    : "bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280]"
                )}
              >
                {priority.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Keterangan */}
        <div className="mb-4">
          <label className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1.5 block uppercase">
            keterangan
          </label>
          <input
            type="text"
            placeholder="spesifikasi tambahan (opsional)"
            className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#111827] outline-none focus:border-[#111827]"
          />
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => showToast("rfq dipublikasikan ke panora-match")}
          className="w-full py-3.5 bg-[#111827] text-white text-sm font-bold tracking-wide touch-feedback flex items-center justify-center gap-2 lowercase"
        >
          publikasikan rfq
          <ArrowRight size={16} />
        </motion.button>
      </motion.div>

      {/* Active RFQs */}
      <motion.div variants={itemVariants}>
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-2.5 lowercase">
          3 rfq aktif
        </div>
        
        <div className="flex flex-col gap-2.5 pb-6">
          {activeRFQs.map((rfq, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.99 }}
              className="bg-white border border-[#E5E7EB] overflow-hidden cursor-pointer touch-feedback"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                <span className="font-mono text-[10px] text-[#6B7280]">{rfq.id}</span>
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-wide",
                  rfq.badgeClass === "b-green" && "bg-[rgba(26,122,66,0.1)] text-[#1a7a42] border border-[rgba(26,122,66,0.25)]",
                  rfq.badgeClass === "b-amber" && "bg-[rgba(200,120,32,0.1)] text-[#c87820] border border-[rgba(200,120,32,0.25)]"
                )}>
                  {rfq.badge}
                </span>
              </div>
              
              {/* Body */}
              <div className="p-4">
                <div className="font-mono text-[10px] text-[#9CA3AF] tracking-[0.1em] uppercase mb-1">
                  {rfq.komoditas}
                </div>
                <h4 className="font-sans text-lg font-bold text-[#111827] mb-2.5 lowercase">{rfq.name}</h4>
                
                {/* Decision Data Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-[#F9FAFB] p-2">
                    <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.1em] uppercase mb-0.5">budget</div>
                    <div className="font-sans text-sm font-bold text-[#111827]">{rfq.budget}</div>
                  </div>
                  <div className="bg-[#F9FAFB] p-2">
                    <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.1em] uppercase mb-0.5">butuh</div>
                    <div className="font-sans text-sm font-bold text-[#111827]">{rfq.butuh}</div>
                  </div>
                  <div className="bg-[#F9FAFB] p-2">
                    <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.1em] uppercase mb-0.5">wilayah</div>
                    <div className="font-sans text-sm font-bold text-[#111827]">{rfq.wilayah}</div>
                  </div>
                </div>
                
                {/* Progress */}
                <div className="bg-[#F3F4F6] px-3 py-2.5 flex items-center gap-2.5">
                  <div className="flex-1 h-1 bg-[#E5E7EB] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rfq.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-[#111827]"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#111827] font-bold whitespace-nowrap">
                    {rfq.progressLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
