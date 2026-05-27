"use client";

import { Coffee, Verified } from "lucide-react";
import { useEffect, useState } from "react";
import type { UserCard } from "@/lib/var/types";

const initialDigitalCard: UserCard = {
  id: "loro-hero-card",
  campaignId: "loro-coffee",
  storeName: "L.O.R.O. Coffee",
  rewardName: "Free Specialty Brew",
  stampsCount: 7,
  totalNeeded: 10,
  status: "ACTIVE",
  updatedAt: new Date().toISOString(),
};

const DynamicStamp = () => {
  const digitalCard = initialDigitalCard;
  const [heroStamps, setHeroStamps] = useState(digitalCard.stampsCount);

  useEffect(() => {
    setHeroStamps(digitalCard.stampsCount);
  }, []);

  const handleHeroStampClick = (index: number) => {
    const newCount = index + 1;
    setHeroStamps(newCount === heroStamps ? newCount - 1 : newCount);
  };

  return (
    <div
      id="digital-card-hero"
      className="relative transform rotate-3 lg:rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-105 z-10 cursor-pointer"
    >
      <div className="w-75 h-50 glass-card p-6 rounded-2xl flex flex-col justify-between overflow-hidden relative border border-(--color-cyan-glow)/20 shadow-xl group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-(--color-cyan-glow)/15 rounded-full blur-2xl animate-pulse"></div>

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-(--color-primary-container) rounded-lg flex items-center justify-center">
              <Coffee className="text-white w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-headline text-white font-semibold text-sm tracking-tight block">
                L.O.R.O. Wallet
              </span>
              <span className="text-[10px] text-(--color-on-surface-variant) font-mono block">
                {digitalCard.storeName}
              </span>
            </div>
          </div>
          <span className="text-(--color-cyan-glow) font-mono text-[10px] tracking-wide px-2 py-0.5 border border-(--color-cyan-glow)/30 rounded bg-(--color-cyan-glow)/10">
            ACTIVE
          </span>
        </div>

        <div className="mt-1 relative z-10">
          <div className="flex justify-between mb-1">
            <span className="text-(--color-on-surface-variant) text-xs font-mono">
              Progress to {digitalCard.rewardName}
            </span>
            <span className="text-white text-xs font-mono font-semibold">
              {heroStamps}/{digitalCard.totalNeeded}
            </span>
          </div>
          <div className="w-full h-2 bg-(--color-deep-navy) rounded-full overflow-hidden">
            <div
              className="h-full bg-(--color-cyan-glow) shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300"
              style={{
                width: `${(heroStamps / digitalCard.totalNeeded) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-0.5 relative z-10">
          {Array.from({ length: 10 }).map((_, i) => {
            const isActive = i < heroStamps;
            const stampClass = isActive
              ? "stamp-active text-white"
              : "border border-dashed border-gray-500 bg-white/5 hover:bg-white/10";
            return (
              <button
                key={i.toString()}
                type="button"
                onClick={() => handleHeroStampClick(i)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${stampClass}`}
                title={`Set to ${i + 1} stamps`}
              >
                {isActive ? (
                  <Verified className="w-4 h-4 text-white fill-current animate-scaleUp" />
                ) : (
                  <span className="text-[9px] text-(--color-on-surface-variant)">
                    {i + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-1 right-2 opacity-30 text-[8px] text-(--color-on-surface-variant) font-mono">
          Tap stamps to toggle
        </div>
      </div>
    </div>
  );
};
export default DynamicStamp;
