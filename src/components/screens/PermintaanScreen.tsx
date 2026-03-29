"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PermintaanScreenProps {
  showToast: (message: string) => void;
}

const priorities = [
  { id: "normal", label: "Normal", class: "on-normal", color: "text-[#1a7a42]", bg: "bg-[rgba(26,122,66,0.1)]", border: "border-[rgba(26,122,66,0.3)]" },
  { id: "urgent", label: "Mendesak", class: "on-urgent", color: "text-[#c87820]", bg: "bg-[rgba(200,120,32,0.1)]", border: "border-[rgba(200,120,32,0.3)]" },
  { id: "critical", label: "Kritis", class: "on-critical", color: "text-[#c04860]", bg: "bg-[rgba(192,72,96,0.1)]", border: "border-[rgba(192,72,96,0.3)]" },
];

const activeRFQs = [
  {
    id: "RFQ-2025-0092",
    badge: "8 Match",
    badgeClass: "b-green",
    komoditas: "Sayuran · Segar",
    name: "Cabai Merah 10T",
    budget: "Rp 38rb/kg",
    butuh: "20 Agu",
    wilayah: "Jateng",
    progress: 80,
    progressLabel: "8 Cocok",
  },
  {
    id: "RFQ-2025-0090",
    badge: "Menunggu",
    badgeClass: "b-amber",
    komoditas: "Serealia · Kering",
    name: "Jagung Hibrida 20T",
    budget: "Rp 4.300/kg",
    butuh: "25 Agu",
    wilayah: "DIY",
    progress: 30,
    progressLabel: "Mencari...",
  },
];

const komoditasOptions = [
  "🥬 Cabai Merah Keriting",
  "🌽 Jagung Hibrida",
  "🌾 Padi GKP",
  "🧅 Bawang Merah",
  "🫘 Kedelai",
];

const wilayahOptions = ["Semua", "Jawa Tengah", "DIY", "Jawa Barat", "Jawa Timur"];

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
      className="pt-5 px-5"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-1">
          // Auto-Match Engine
        </div>
        <h1 className="font-serif text-[26px] text-[#1a1610]">
          Buat <em className="text-[#0d7a6e] italic">Permintaan</em>
        </h1>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        variants={itemVariants}
        className="bg-[#1a1610] rounded-[14px] p-5 relative overflow-hidden mb-4"
      >
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(13,122,110,0.25),transparent_70%)]" />
        
        <div className="relative z-10">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[rgba(13,122,110,0.8)] mb-2">
            // Panora-Match · Aktif
          </div>
          <h2 className="font-serif text-[22px] text-[#f5f0e8] leading-tight mb-1.5">
            RFQ Anda Dicocokkan<br />dengan 480+ Petani
          </h2>
          <p className="text-xs text-[rgba(245,240,232,0.5)] mb-4">
            Engine bekerja otomatis — cocokkan RFQ dengan petani terbaik berdasarkan harga Pyth, lokasi, dan jadwal panen
          </p>
          
          <div className="flex gap-5">
            <div>
              <div className="font-serif text-[22px] text-[#12a898] leading-none">3</div>
              <div className="text-[10px] text-[rgba(245,240,232,0.4)] mt-0.5">RFQ Aktif</div>
            </div>
            <div>
              <div className="font-serif text-[22px] text-[#12a898] leading-none">8</div>
              <div className="text-[10px] text-[rgba(245,240,232,0.4)] mt-0.5">Match Baru</div>
            </div>
            <div>
              <div className="font-serif text-[22px] text-[#12a898] leading-none">480+</div>
              <div className="text-[10px] text-[rgba(245,240,232,0.4)] mt-0.5">Petani Pool</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        variants={itemVariants}
        className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] p-5 mb-4"
      >
        <h3 className="font-serif text-lg text-[#1a1610] mb-4">+ RFQ Baru</h3>
        
        {/* Komoditas */}
        <div className="mb-3.5">
          <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-1.5 block">
            Komoditas
          </label>
          <select className="w-full px-3.5 py-2.5 bg-[#f5f0e8] border border-[#d4c8b4] rounded-lg text-[13px] font-medium text-[#1a1610] outline-none focus:border-[#0d7a6e] appearance-none cursor-pointer">
            {komoditasOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Volume & Budget */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div>
            <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-1.5 block">
              Volume (Ton)
            </label>
            <input
              type="number"
              placeholder="0.0"
              className="w-full px-3.5 py-2.5 bg-[#f5f0e8] border border-[#d4c8b4] rounded-lg text-[13px] font-medium text-[#1a1610] outline-none focus:border-[#0d7a6e]"
            />
          </div>
          <div>
            <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-1.5 block">
              Budget/kg (Rp)
            </label>
            <input
              type="number"
              placeholder="Maks harga"
              className="w-full px-3.5 py-2.5 bg-[#f5f0e8] border border-[#d4c8b4] rounded-lg text-[13px] font-medium text-[#1a1610] outline-none focus:border-[#0d7a6e]"
            />
          </div>
        </div>

        {/* Tanggal & Wilayah */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div>
            <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-1.5 block">
              Tanggal Butuh
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              className="w-full px-3.5 py-2.5 bg-[#f5f0e8] border border-[#d4c8b4] rounded-lg text-[13px] font-medium text-[#1a1610] outline-none focus:border-[#0d7a6e]"
            />
          </div>
          <div>
            <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-1.5 block">
              Wilayah Asal
            </label>
            <select className="w-full px-3.5 py-2.5 bg-[#f5f0e8] border border-[#d4c8b4] rounded-lg text-[13px] font-medium text-[#1a1610] outline-none focus:border-[#0d7a6e] appearance-none cursor-pointer">
              {wilayahOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Priority */}
        <div className="mb-3.5">
          <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-1.5 block">
            Prioritas
          </label>
          <div className="flex gap-2">
            {priorities.map((priority) => (
              <motion.button
                key={priority.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPriority(priority.id)}
                className={cn(
                  "flex-1 py-2 text-center border rounded-lg text-[11px] font-semibold transition-all",
                  selectedPriority === priority.id
                    ? `${priority.bg} ${priority.border} ${priority.color}`
                    : "bg-[#f5f0e8] border-[#d4c8b4] text-[#6a5e50]"
                )}
              >
                {priority.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Keterangan */}
        <div className="mb-4">
          <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-1.5 block">
            Keterangan
          </label>
          <input
            type="text"
            placeholder="Spesifikasi tambahan (opsional)"
            className="w-full px-3.5 py-2.5 bg-[#f5f0e8] border border-[#d4c8b4] rounded-lg text-[13px] font-medium text-[#1a1610] outline-none focus:border-[#0d7a6e]"
          />
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => showToast("✓ RFQ dipublikasikan ke Panora-Match!")}
          className="w-full py-3.5 bg-[#0d7a6e] text-white rounded-xl text-sm font-bold tracking-wide touch-feedback flex items-center justify-center gap-2"
        >
          Publikasikan RFQ
          <ArrowRight size={16} />
        </motion.button>
      </motion.div>

      {/* Active RFQs */}
      <motion.div variants={itemVariants}>
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#9a8e80] mb-2.5">
          // 3 RFQ Aktif
        </div>
        
        <div className="flex flex-col gap-2.5 pb-6">
          {activeRFQs.map((rfq, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.99 }}
              className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] overflow-hidden cursor-pointer touch-feedback"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-[#d4c8b4] flex justify-between items-center bg-[#e8e0d0]">
                <span className="font-mono text-[10px] text-[#6a5e50]">{rfq.id}</span>
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono tracking-wide",
                  rfq.badgeClass === "b-green" && "bg-[rgba(26,122,66,0.1)] text-[#1a7a42] border border-[rgba(26,122,66,0.25)]",
                  rfq.badgeClass === "b-amber" && "bg-[rgba(200,120,32,0.1)] text-[#c87820] border border-[rgba(200,120,32,0.25)]"
                )}>
                  {rfq.badge}
                </span>
              </div>
              
              {/* Body */}
              <div className="p-4">
                <div className="font-mono text-[11px] text-[#9a8e80] tracking-[0.1em] uppercase mb-1">
                  {rfq.komoditas}
                </div>
                <h4 className="font-serif text-lg text-[#1a1610] mb-2.5">{rfq.name}</h4>
                
                {/* Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <div className="font-mono text-[9px] text-[#9a8e80] tracking-[0.1em] uppercase mb-0.5">Budget</div>
                    <div className="font-serif text-sm text-[#1a1610]">{rfq.budget}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-[#9a8e80] tracking-[0.1em] uppercase mb-0.5">Butuh</div>
                    <div className="font-serif text-sm text-[#1a1610]">{rfq.butuh}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-[#9a8e80] tracking-[0.1em] uppercase mb-0.5">Wilayah</div>
                    <div className="font-serif text-sm text-[#1a1610]">{rfq.wilayah}</div>
                  </div>
                </div>
                
                {/* Progress */}
                <div className="bg-[#e8e0d0] rounded-lg px-3 py-2.5 flex items-center gap-2.5">
                  <div className="flex-1 h-1 bg-[#d4c8b4] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rfq.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#0d7a6e] to-[#12a898]"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#0d7a6e] font-bold whitespace-nowrap">
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
