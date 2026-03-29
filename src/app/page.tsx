"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { StatusBar } from "@/components/StatusBar";
import { BottomNav } from "@/components/BottomNav";
import { Toast } from "@/components/Toast";
import { BerandaScreen } from "@/components/screens/BerandaScreen";
import { SupplyScreen } from "@/components/screens/SupplyScreen";
import { PermintaanScreen } from "@/components/screens/PermintaanScreen";
import { OrderScreen } from "@/components/screens/OrderScreen";
import { BayarScreen } from "@/components/screens/BayarScreen";

const screenVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const screenTransition: Transition = {
  duration: 0.28,
  ease: "easeOut",
};

export default function BuyerApp() {
  const [activeTab, setActiveTab] = useState("beranda");
  const [toast, setToast] = useState({ message: "", isVisible: false });

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: "", isVisible: false }), 2400);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "beranda":
        return <BerandaScreen onNavigate={setActiveTab} showToast={showToast} />;
      case "supply":
        return <SupplyScreen showToast={showToast} />;
      case "permintaan":
        return <PermintaanScreen showToast={showToast} />;
      case "order":
        return <OrderScreen showToast={showToast} />;
      case "bayar":
        return <BayarScreen showToast={showToast} />;
      default:
        return <BerandaScreen onNavigate={setActiveTab} showToast={showToast} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StatusBar />
      
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={screenTransition}
            className="absolute inset-0 overflow-y-auto scrollbar-hide pb-24"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <Toast message={toast.message} isVisible={toast.isVisible} />
    </div>
  );
}
