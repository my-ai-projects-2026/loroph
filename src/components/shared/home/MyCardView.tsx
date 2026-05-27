"use client";
import {
  CheckCircle2,
  Coffee,
  Gift,
  History,
  Plus,
  QrCode,
  Smartphone,
  Sparkles,
  Verified,
} from "lucide-react";
import { useState } from "react";
import type { ActivityLog, Campaign, UserCard } from "@/lib/var/types";

interface MyCardViewProps {
  cards: UserCard[];
  campaigns: Campaign[];
  onAddStamp: (cardId: string) => void;
  onRedeemReward: (
    cardId: string,
  ) => { success: boolean; code?: string } | void;
  onAddCard: (campaignId: string) => void;
  activityLogs: ActivityLog[];
}

export default function MyCardView({
  cards,
  campaigns,
  onAddStamp,
  onRedeemReward,
  onAddCard,
  activityLogs,
}: MyCardViewProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    cards[0]?.id || "",
  );
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [redemptionCode, setRedemptionCode] = useState<string | null>(null);
  const [stampFeedback, setStampFeedback] = useState<string | null>(null);

  const selectedCard = cards.find((c) => c.id === selectedCardId);

  const handleSimulateCoffee = (cardId: string) => {
    onAddStamp(cardId);
    setStampFeedback("+1 Stamp Awarded! ☕");
    setTimeout(() => setStampFeedback(null), 3000);
  };

  const handleClaimReward = (cardId: string) => {
    const res = onRedeemReward(cardId);
    if (res && res.success && res.code) {
      setRedemptionCode(res.code);
    }
  };

  // Get campaigns not currently added to wallet
  const availableCampaigns = campaigns.filter(
    (camp) => !cards.some((card) => card.campaignId === camp.id),
  );

  return (
    <div
      id="customer-wallet-view"
      className="max-w-6xl mx-auto px-4 py-8 text-[var(--color-on-surface)] min-h-screen"
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>⭐ My Rewards Hub</span>
          </div>
          <h1 className="text-3xl font-bold font-headline text-white tracking-tight">
            L.O.R.O. Customer Wallet
          </h1>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-1 max-w-md">
            Your single digital wallet for the best local coffee brews,
            pastries, and treats. Tap cards to see details.
          </p>
        </div>

        <button
          onClick={() => setIsAddCardOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-xl shadow-indigo-500/10 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white font-bold" />
          Add Store Card
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Your Card List (Wallet Selection) */}
        <div id="card-navigator" className="lg:col-span-4 flex flex-col gap-3">
          <h2 className="text-xs uppercase font-mono tracking-wider text-[var(--color-on-surface-variant)] mb-1 font-semibold">
            My Loyalty Cards ({cards.length})
          </h2>

          {cards.map((card) => {
            const isSelected = card.id === selectedCardId;
            return (
              <div
                key={card.id}
                onClick={() => {
                  setSelectedCardId(card.id);
                  setRedemptionCode(null);
                }}
                className={`p-4 rounded-xl cursor-pointer border transition-all flex justify-between items-center ${
                  isSelected
                    ? "bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/5"
                    : "bg-slate-950/40 border-slate-800/60 hover:bg-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? "bg-[var(--color-cyan-glow)]/10 text-[var(--color-cyan-glow)]" : "bg-white/5 text-[var(--color-on-surface-variant)]"}`}
                  >
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {card.storeName}
                    </h3>
                    <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                      {card.stampsCount} / {card.totalNeeded} Stamps
                    </p>
                  </div>
                </div>

                {card.stampsCount >= card.totalNeeded ? (
                  <span className="text-[10px] font-mono font-bold text-[var(--color-cyan-glow)] bg-[var(--color-cyan-glow)]/10 px-2 py-1 rounded-md animate-pulse">
                    READY
                  </span>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Center: Interactive Glassmorphic Card Preview */}
        <div
          id="card-preview-container"
          className="lg:col-span-4 flex flex-col items-center"
        >
          {selectedCard ? (
            <div className="w-full flex flex-col items-center">
              {/* Feedback Alert Overlay */}
              {stampFeedback && (
                <div className="w-full mb-4 px-4 py-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs font-semibold text-emerald-400 font-mono animate-fadeIn flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  {stampFeedback}
                </div>
              )}

              {/* Aspect Ratio 2:3 card */}
              <div className="w-full aspect-[1.586] max-w-[360px] glass-card p-6 rounded-3xl relative border border-[var(--color-cyan-glow)]/20 shadow-2xl flex flex-col justify-between overflow-hidden group">
                {/* Glowing Ambience blobs */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-cyan-glow)]/20 rounded-full blur-3xl group-hover:bg-[var(--color-cyan-glow)]/30 transition-all duration-500"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-3xl"></div>

                {/* Header */}
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[var(--color-primary-container)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                      <Coffee className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-headline text-white font-bold text-sm tracking-tight block">
                        L.O.R.O. Wallet
                      </span>
                      <span className="text-[10px] text-[var(--color-on-surface-variant)] font-mono block">
                        {selectedCard.storeName}
                      </span>
                    </div>
                  </div>
                  <span className="text-[var(--color-cyan-glow)] font-mono text-[10px] font-semibold tracking-wider px-2 py-1 border border-[var(--color-cyan-glow)]/30 rounded-md bg-[var(--color-cyan-glow)]/10 shadow-md">
                    ACTIVE
                  </span>
                </div>

                {/* Progress state */}
                <div className="mt-4 relative z-10">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[var(--color-on-surface-variant)] text-[10px] uppercase font-mono tracking-wider">
                      Progress to{" "}
                      {selectedCard.rewardName.split(" ")[1] || "brew"}
                    </span>
                    <span className="text-white text-xs font-mono font-bold">
                      {selectedCard.stampsCount}/{selectedCard.totalNeeded}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#020617] rounded-full p-[2px] border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (selectedCard.stampsCount / selectedCard.totalNeeded) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Grid of stamps (Circular) */}
                <div className="grid grid-cols-5 gap-3 mt-4 relative z-10">
                  {Array.from({ length: selectedCard.totalNeeded }).map(
                    (_, i) => {
                      const isActive = i < selectedCard.stampsCount;
                      return (
                        <div
                          key={i}
                          className={`aspect-square w-full rounded-full flex items-center justify-center transition-all ${
                            isActive
                              ? "stamp-active text-white"
                              : "border border-dashed border-gray-600 bg-white/5 shadow-inner"
                          }`}
                        >
                          {isActive ? (
                            <Verified className="w-5 h-5 text-white fill-current animate-scaleUp" />
                          ) : (
                            <span className="text-[10px] text-[var(--color-on-surface-variant)]/60 font-mono">
                              {i + 1}
                            </span>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center text-[9px] text-[var(--color-on-surface-variant)] opacity-70 border-t border-white/5 pt-2 font-mono relative z-10">
                  <span>ID: NFC-{selectedCard.id.split("-")[1] || "782A"}</span>
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-[var(--color-cyan-glow)]" />{" "}
                    Tap Counter to check in
                  </span>
                </div>
              </div>

              {/* Simulation controls */}
              <div className="w-full mt-6 flex flex-col gap-3">
                <button
                  onClick={() => handleSimulateCoffee(selectedCard.id)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl text-xs font-headline shadow-lg transition-transform active:scale-95 duration-150 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Coffee className="w-4 h-4 text-white" />
                  Simulate Purchase (+1 Stamp)
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsQrModalOpen(true)}
                    className="py-2.5 px-3 bg-[#131722] hover:bg-slate-800 text-[var(--color-on-surface-variant)] hover:text-white border border-[var(--color-glass-stroke)] text-xs font-mono font-semibold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-[var(--color-cyan-glow)]" />
                    Show Scan QR
                  </button>

                  <button
                    onClick={() => handleClaimReward(selectedCard.id)}
                    disabled={
                      selectedCard.stampsCount < selectedCard.totalNeeded
                    }
                    className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-headline font-semibold rounded-xl active:scale-95 transition-all cursor-pointer ${
                      selectedCard.stampsCount >= selectedCard.totalNeeded
                        ? "bg-indigo-600 text-white border-transparent hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                        : "bg-white/5 text-gray-500 border border-transparent cursor-not-allowed"
                    }`}
                  >
                    <Gift className="w-4 h-4" />
                    Redeem Reward
                  </button>
                </div>
              </div>

              {/* Voucher Redemption Result overlay */}
              {redemptionCode && (
                <div className="mt-6 w-full p-4 bg-cyan-950/40 border border-[var(--color-cyan-glow)]/30 rounded-2xl text-center relative overflow-hidden animate-scaleUp">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-cyan-glow)]/10 rounded-full blur-xl animate-pulse"></div>
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-cyan-glow)] mx-auto mb-2" />
                  <p className="text-white font-headline text-sm font-bold">
                    Reward Code Unlocked!
                  </p>
                  <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
                    Present this voucher to the barista to claim your free
                    reward:
                  </p>
                  <div className="mt-3 bg-[var(--color-deep-navy)] py-2 border border-[var(--color-glass-stroke)] rounded-xl font-mono text-xl font-extrabold tracking-widest text-white shadow-inner select-all">
                    {redemptionCode}
                  </div>
                  <button
                    onClick={() => setRedemptionCode(null)}
                    className="mt-3 text-[10px] font-mono hover:text-white underline text-[var(--color-on-surface-variant)] cursor-pointer"
                  >
                    Dismiss Voucher
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--color-on-surface-variant)]">
              No loyalty cards active yet. Try adding one!
            </div>
          )}
        </div>

        {/* Right: Activity Logs Panel */}
        <div
          id="logs-panel"
          className="lg:col-span-4 glass-card p-6 rounded-3xl border border-[var(--color-glass-stroke)]"
        >
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
            <h2 className="text-xs uppercase font-mono tracking-wider text-[var(--color-on-surface-variant)] font-bold flex items-center gap-2">
              <History className="w-4 h-4 text-[var(--color-cyan-glow)]" />
              Latest Wallet Activity
            </h2>
            <span className="text-[10px] font-mono text-[var(--color-on-surface-variant)] p-1 bg-white/5 rounded-md">
              LIVE SYNC
            </span>
          </div>

          <div className="flex flex-col gap-4 max-h-[290px] overflow-y-auto pr-1">
            {activityLogs.length === 0 ? (
              <p className="text-xs text-[var(--color-on-surface-variant)] opacity-65 py-4 text-center">
                New check-ins or reward collections will post logs here
                instantly.
              </p>
            ) : (
              activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="text-xs font-mono bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col gap-1.5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span className="font-semibold text-[10px] px-1.5 py-0.5 bg-[var(--color-cyan-glow)]/10 text-[var(--color-cyan-glow)] rounded">
                      {log.type}
                    </span>
                    <span>
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-white/95 leading-relaxed">
                    {log.message}
                  </p>
                  <span className="text-[9px] text-[var(--color-on-surface-variant)] mt-1 text-right">
                    🏪 {log.storeName}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: QR Scan Card */}
      {isQrModalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 bg-[#05070a]/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111420] border border-[var(--color-glass-stroke)] w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl relative animate-scaleUp">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--color-cyan-glow)]/10 rounded-full blur-2xl select-none pointer-events-none"></div>

            <h3 className="text-white font-headline font-bold text-lg mb-1">
              {selectedCard.storeName} Check-in
            </h3>
            <p className="text-xs text-[var(--color-on-surface-variant)] mb-6 font-mono">
              Wallet ID: NFC-{selectedCard.id.split("-")[1] || "782A"}
            </p>

            {/* Simulated premium QR frame */}
            <div className="w-48 h-48 mx-auto bg-white p-4 rounded-2xl relative flex items-center justify-center shadow-lg border-2 border-[var(--color-cyan-glow)]">
              <div className="absolute -inset-1 border-2 border-[var(--color-cyan-glow)] rounded-3xl opacity-50 animate-ping"></div>
              {/* Actual cool visual vector representation of QR with L.O.R.O branding logo inside */}
              <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                <QrCode className="w-32 h-32 text-indigo-400 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-lg from-[var(--color-electric-blue)]/10 to-[var(--color-cyan-glow)]/10"></div>
                {/* Scanner pulse red line */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-[var(--color-cyan-glow)] shadow-[0_0_8px_var(--color-cyan-glow)] animate-bounce"
                  style={{ top: "30%" }}
                ></div>
              </div>
            </div>

            <p className="text-xs text-[var(--color-on-surface-variant)] mt-6 px-4">
              Holds this QR under the store scanner, or use the Merchant Panel
              to add a stamp instantly!
            </p>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl transition-all border border-white/5 cursor-pointer"
            >
              Hide check-in card
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Loyalty Card */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-50 bg-[#05070a]/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111420] border border-[var(--color-glass-stroke)] w-full max-w-md rounded-3xl p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
              <h3 className="text-white font-headline font-bold text-lg">
                Discover Participating Stores
              </h3>
              <button
                onClick={() => setIsAddCardOpen(false)}
                className="text-[var(--color-on-surface-variant)] hover:text-white font-headline text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--color-on-surface-variant)] mb-5">
              Activate standard rewards cards to skip the physical clutter. Tap
              to instantiate instantly.
            </p>

            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
              {availableCampaigns.length === 0 ? (
                <p className="text-center text-xs text-[var(--color-on-surface-variant)] py-4 font-mono select-none">
                  All available brand cards are already active in your space!
                </p>
              ) : (
                availableCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-4 items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-container)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-white">
                        <Coffee className="w-5 h-5 text-[var(--color-cyan-glow)]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {camp.storeName}
                        </h4>
                        <p className="text-[11px] text-[var(--color-on-surface-variant)] mt-0.5">
                          🎁 {camp.rewardName} at {camp.totalStampsReward}{" "}
                          stamps
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddCard(camp.id);
                        setIsAddCardOpen(false);
                        setSelectedCardId(`wallet-${camp.id}`); // Set focus to new card
                      }}
                      className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-600 text-white text-[11px] font-semibold font-headline rounded-lg active:scale-95 transition-transform cursor-pointer"
                    >
                      Activate
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setIsAddCardOpen(false)}
              className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl transition-all border border-white/5 cursor-pointer"
            >
              Cancel Shop Discovery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
