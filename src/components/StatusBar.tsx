"use client";

import { useEffect, useState } from "react";
import { Signal, Battery } from "lucide-react";

export function StatusBar() {
  const [time, setTime] = useState("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0")
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-between px-6 py-2 h-11 font-mono text-[11px] text-[#6B7280]">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} className="text-[#6B7280]" />
        <Battery size={16} className="text-[#6B7280]" />
      </div>
    </div>
  );
}
