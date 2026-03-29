"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupplyScreenProps {
  showToast: (message: string) => void;
}

const filters = [
  { id: "all", label: "Semua" },
  { id: "jagung", label: "🌽 Jagung" },
  { id: "padi", label: "🌾 Padi" },
  { id: "sayur", label: "🥬 Sayuran" },
  { id: "umbi", label: "🧅 Umbi" },
  { id: "kacang", label: "🫘 Kacang" },
];

const supplyCards = [
  {
    emoji: "🥬",
    komoditas: "Sayuran · Segar",
    name: "Cabai Merah Keriting",
    petani: "📍 Magelang, Jateng · KUD Magelang Sejahtera",
    price: "Rp 36.800",
    unit: "/kg",
    trend: "▼ 3.2%",
    trendColor: "text-[#c04860]",
    stok: "48.6 ton",
    kualitas: "Grade A",
    kualitasColor: "text-[#0d7a6e]",
    panen: "10–15 Agu",
  },
  {
    emoji: "🌽",
    komoditas: "Serealia · Kering",
    name: "Jagung Hibrida NK 7328",
    petani: "📍 Sleman, DIY · KUD Sleman Sejahtera",
    price: "Rp 4.200",
    unit: "/kg",
    trend: "▲ 2.1%",
    trendColor: "text-[#1a7a42]",
    stok: "148.4 ton",
    kualitas: "13.2%",
    kualitasColor: "text-[#0d7a6e]",
    panen: "Tersedia",
  },
  {
    emoji: "🌾",
    komoditas: "Serealia · GKP",
    name: "Padi GKP IR-64",
    petani: "📍 Bantul, DIY · KUD Bantul Makmur",
    price: "Rp 5.500",
    unit: "/kg",
    trend: "▲ 0.8%",
    trendColor: "text-[#1a7a42]",
    stok: "92.6 ton",
    kualitas: "Grade B+",
    kualitasColor: "text-[#c87820]",
    panen: "Tersedia ✓",
    panenColor: "text-[#0d7a6e]",
    showPnft: true,
  },
  {
    emoji: "🧅",
    komoditas: "Umbi · Segar",
    name: "Bawang Merah Bima Brebes",
    petani: "📍 Brebes, Jateng · Gapoktan Brebes",
    price: "Rp 22.500",
    unit: "/kg",
    trend: "▲ 3.2%",
    trendColor: "text-[#1a7a42]",
    stok: "32.1 ton",
    kualitas: "Grade A",
    kualitasColor: "text-[#0d7a6e]",
    panen: "2–3 hari",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function SupplyScreen({ showToast }: SupplyScreenProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
          // Pyth Oracle · Real-time
        </div>
        <h1 className="font-serif text-[26px] text-[#1a1610]">
          Browse <em className="text-[#0d7a6e] italic">Supply</em>
        </h1>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mb-3.5">
        <div className="bg-[#eee8dc] border border-[#d4c8b4] rounded-xl px-4 py-3 flex items-center gap-2.5 focus-within:border-[#0d7a6e] transition-colors">
          <Search size={16} className="text-[#9a8e80] flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari komoditas, wilayah, petani..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-[#1a1610] placeholder:text-[#9a8e80]"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => showToast("Membuka filter lanjutan...")}
            className="px-3 py-1.5 bg-[#0d7a6e] rounded-md text-[10px] font-bold text-white whitespace-nowrap"
          >
            Filter
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Pills */}
      <motion.div variants={itemVariants} className="mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex-shrink-0 px-3.5 py-1.5 border rounded-full text-[11px] font-semibold whitespace-nowrap transition-all",
                activeFilter === filter.id
                  ? "bg-[#0d7a6e] border-[#0d7a6e] text-white"
                  : "bg-[#eee8dc] border-[#d4c8b4] text-[#6a5e50]"
              )}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Supply Cards */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3 pb-6">
        {supplyCards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-[#eee8dc] border border-[#d4c8b4] rounded-[14px] overflow-hidden"
          >
            {/* Card Top */}
            <div className="p-4 flex items-start gap-3.5">
              <span className="text-4xl leading-none flex-shrink-0">{card.emoji}</span>
              <div className="flex-1">
                <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a8e80] mb-0.5">
                  {card.komoditas}
                </div>
                <h3 className="font-serif text-xl text-[#1a1610] leading-tight mb-1">
                  {card.name}
                </h3>
                <p className="text-[11px] text-[#6a5e50] flex items-center gap-1">
                  {card.petani}
                </p>
                
                {/* Price Section */}
                <div className="mt-3 p-2 bg-[#e8e0d0] rounded-lg border border-[#d4c8b4] flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[9px] text-[#9a8e80] tracking-[0.12em] uppercase">
                      Pyth Oracle
                    </div>
                    <div className="font-serif text-[22px] text-[#1a1610] leading-none">
                      {card.price}
                      <span className="text-xs font-sans text-[#6a5e50] ml-0.5">{card.unit}</span>
                    </div>
                  </div>
                  <span className={cn("text-[11px] font-bold", card.trendColor)}>
                    {card.trend}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Info */}
            <div className="grid grid-cols-3 gap-2 px-4 py-3 border-t border-[#d4c8b4]">
              <div>
                <div className="font-mono text-[9px] text-[#9a8e80] tracking-[0.1em] uppercase mb-0.5">
                  Stok
                </div>
                <div className="font-serif text-[15px] text-[#1a1610]">{card.stok}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] text-[#9a8e80] tracking-[0.1em] uppercase mb-0.5">
                  Kualitas
                </div>
                <div className={cn("font-serif text-[15px]", card.kualitasColor)}>
                  {card.kualitas}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] text-[#9a8e80] tracking-[0.1em] uppercase mb-0.5">
                  {card.showPnft ? "pNFT" : "Panen"}
                </div>
                <div className={cn("font-serif text-[15px] text-[#1a1610]", card.panenColor)}>
                  {card.panen}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-4 py-3 border-t border-[#d4c8b4] flex gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => showToast(`📋 Membuat order ${card.name.split(" ")[0]}...`)}
                className="flex-1 py-2.5 bg-[#0d7a6e] text-white rounded-lg text-[13px] font-bold touch-feedback"
              >
                Pesan Sekarang
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => showToast("Membuka detail supplier...")}
                className="px-4 py-2.5 bg-transparent border border-[#d4c8b4] rounded-lg text-[13px] font-semibold text-[#6a5e50] touch-feedback"
              >
                Detail
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
