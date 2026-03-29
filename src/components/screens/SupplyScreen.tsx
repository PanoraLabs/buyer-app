"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, MapPin, Box, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupplyScreenProps {
  showToast: (message: string) => void;
}

const filters = [
  { id: "all", label: "semua" },
  { id: "jagung", label: "jagung" },
  { id: "padi", label: "padi" },
  { id: "sayur", label: "sayuran" },
  { id: "umbi", label: "umbi" },
  { id: "kacang", label: "kacang" },
];

const supplyCards = [
  {
    komoditas: "sayuran · segar",
    name: "cabai merah keriting",
    petani: "KUD Magelang Sejahtera",
    lokasi: "Magelang, Jateng",
    distance: "420 km",
    price: "Rp 36.800",
    unit: "/kg",
    trend: "▼ 3.2%",
    trendColor: "text-[#1a7a42]",
    stok: "48.6 ton",
    stokStatus: "tersedia",
    kualitas: "grade A",
    kualitasColor: "text-[#0d7a6e]",
    panen: "10–15 Agu",
    estimasiKirim: "2–3 hari",
  },
  {
    komoditas: "serealia · kering",
    name: "jagung hibrida NK 7328",
    petani: "KUD Sleman Sejahtera",
    lokasi: "Sleman, DIY",
    distance: "380 km",
    price: "Rp 4.200",
    unit: "/kg",
    trend: "▲ 2.1%",
    trendColor: "text-[#c04860]",
    stok: "148.4 ton",
    stokStatus: "tersedia",
    kualitas: "kadar air 13.2%",
    kualitasColor: "text-[#0d7a6e]",
    panen: "tersedia",
    estimasiKirim: "1–2 hari",
  },
  {
    komoditas: "serealia · GKP",
    name: "padi GKP IR-64",
    petani: "KUD Bantul Makmur",
    lokasi: "Bantul, DIY",
    distance: "385 km",
    price: "Rp 5.500",
    unit: "/kg",
    trend: "▲ 0.8%",
    trendColor: "text-[#c04860]",
    stok: "92.6 ton",
    stokStatus: "terbatas",
    kualitas: "grade B+",
    kualitasColor: "text-[#c87820]",
    panen: "tersedia",
    estimasiKirim: "2–3 hari",
    verified: true,
  },
  {
    komoditas: "umbi · segar",
    name: "bawang merah brebes",
    petani: "Gapoktan Brebes",
    lokasi: "Brebes, Jateng",
    distance: "290 km",
    price: "Rp 22.500",
    unit: "/kg",
    trend: "▲ 3.2%",
    trendColor: "text-[#c04860]",
    stok: "32.1 ton",
    stokStatus: "tersedia",
    kualitas: "grade A",
    kualitasColor: "text-[#0d7a6e]",
    panen: "2–3 hari",
    estimasiKirim: "3–4 hari",
  },
];

const getStokBadgeColor = (status: string) => {
  switch (status) {
    case "tersedia":
      return "bg-[rgba(13,122,110,0.1)] text-[#0d7a6e]";
    case "terbatas":
      return "bg-[rgba(200,120,32,0.1)] text-[#c87820]";
    case "habis":
      return "bg-[rgba(192,72,96,0.1)] text-[#c04860]";
    default:
      return "bg-[#F3F4F6] text-[#6B7280]";
  }
};

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
        <div className="font-mono text-[10px] tracking-[0.15em] text-[#9CA3AF] mb-1">
          pyth oracle · real-time
        </div>
        <h1 className="font-sans text-[24px] font-bold text-[#111827] lowercase">
          browse <span className="text-[#0d7a6e]">supply</span>
        </h1>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mb-3.5">
        <div className="bg-white border border-[#E5E7EB] px-4 py-3 flex items-center gap-2.5 focus-within:border-[#111827] transition-colors">
          <Search size={16} className="text-[#9CA3AF] flex-shrink-0" />
          <input
            type="text"
            placeholder="cari komoditas, wilayah, petani..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-[#111827] placeholder:text-[#9CA3AF]"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => showToast("membuka filter lanjutan...")}
            className="px-3 py-1.5 bg-[#111827] text-[10px] font-bold text-white whitespace-nowrap"
          >
            filter
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
                "flex-shrink-0 px-3.5 py-1.5 border text-[11px] font-medium whitespace-nowrap transition-all lowercase",
                activeFilter === filter.id
                  ? "bg-[#111827] border-[#111827] text-white"
                  : "bg-white border-[#E5E7EB] text-[#6B7280]"
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
            className="bg-white border border-[#E5E7EB] overflow-hidden"
          >
            {/* Card Top */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[0.12em] text-[#9CA3AF] mb-0.5 uppercase">
                    {card.komoditas}
                  </div>
                  <h3 className="font-sans text-lg font-bold text-[#111827] leading-tight mb-1 lowercase">
                    {card.name}
                  </h3>
                  
                  {/* Location & Distance */}
                  <div className="flex items-center gap-3 text-[11px] text-[#6B7280] mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {card.lokasi}
                    </span>
                    <span className="text-[#9CA3AF]">·</span>
                    <span>{card.distance}</span>
                    {card.verified && (
                      <span className="ml-auto px-1.5 py-0.5 bg-[#F3F4F6] text-[9px] font-mono text-[#0d7a6e]">
                        terverifikasi
                      </span>
                    )}
                  </div>
                  
                  {/* Price Section - Clean */}
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.12em] uppercase">
                          harga/kg
                        </div>
                        <div className="font-sans text-[24px] font-bold text-[#111827] leading-none">
                          {card.price}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn("text-[11px] font-medium", card.trendColor)}>
                          {card.trend}
                        </span>
                        <div className="font-mono text-[9px] text-[#9CA3AF] mt-0.5">
                          vs kemarin
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision Data Grid */}
            <div className="grid grid-cols-4 gap-px bg-[#E5E7EB] border-t border-[#E5E7EB]">
              <div className="bg-white p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Box size={12} className="text-[#9CA3AF]" />
                  <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.1em] uppercase">
                    stok
                  </div>
                </div>
                <div className="font-sans text-[15px] font-bold text-[#111827]">{card.stok}</div>
                <div className={cn("text-[9px] mt-0.5", getStokBadgeColor(card.stokStatus))}>
                  {card.stokStatus}
                </div>
              </div>
              <div className="bg-white p-3">
                <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.1em] uppercase mb-1">
                  kualitas
                </div>
                <div className={cn("font-sans text-[15px] font-bold", card.kualitasColor)}>
                  {card.kualitas}
                </div>
              </div>
              <div className="bg-white p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar size={12} className="text-[#9CA3AF]" />
                  <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.1em] uppercase">
                    panen
                  </div>
                </div>
                <div className="font-sans text-[13px] font-semibold text-[#111827]">{card.panen}</div>
              </div>
              <div className="bg-white p-3">
                <div className="font-mono text-[9px] text-[#9CA3AF] tracking-[0.1em] uppercase mb-1">
                  kirim
                </div>
                <div className="font-sans text-[13px] font-semibold text-[#111827]">{card.estimasiKirim}</div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-4 py-3 border-t border-[#E5E7EB] flex gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => showToast(`membuat order ${card.name}...`)}
                className="flex-1 py-2.5 bg-[#111827] text-white text-[13px] font-bold touch-feedback lowercase"
              >
                beli sekarang
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => showToast("membuka detail supplier...")}
                className="px-4 py-2.5 bg-transparent border border-[#E5E7EB] text-[13px] font-semibold text-[#6B7280] touch-feedback lowercase"
              >
                detail
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
