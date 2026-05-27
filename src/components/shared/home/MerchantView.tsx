"use client";
import {
  BarChart3,
  Building,
  CheckCircle,
  Database,
  Settings,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import type {
  ActivityLog,
  Campaign,
  EarlyAccessRegistration,
  UserCard,
} from "@/lib/var/types";

interface MerchantViewProps {
  cards: UserCard[];
  campaigns: Campaign[];
  registrations: EarlyAccessRegistration[];
  activityLogs: ActivityLog[];
  onAddStamp: (cardId: string) => void;
  onModifyCampaignStamps: (
    campaignId: string,
    stamps: number,
    rewardName: string,
  ) => void;
  onAddCustomerCard: (campaignId: string, email: string) => void;
}

export default function MerchantView({
  cards,
  campaigns,
  registrations,
  activityLogs,
  onAddStamp,
  onModifyCampaignStamps,
  onAddCustomerCard,
}: MerchantViewProps) {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    campaigns[0]?.id || "loro-coffee",
  );
  const [stampInputId, setStampInputId] = useState<string>("");
  const [newCampaignStamps, setNewCampaignStamps] = useState<number>(10);
  const [newCampaignReward, setNewCampaignReward] = useState<string>(
    "Free Specialty Brew",
  );
  const [customerEmailArr, setCustomerEmailArr] = useState<string>("");

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Compute stats based on real state
  const totalStampsIssued = useMemo(() => {
    return cards.reduce((sum, c) => sum + c.stampsCount, 0);
  }, [cards]);

  const activeCustomersCount = useMemo(() => {
    return cards.length;
  }, [cards]);

  const redeemedCount = useMemo(() => {
    return activityLogs.filter((log) => log.type === "REWARD_REDEEM").length;
  }, [activityLogs]);

  const totalRegistrations = useMemo(() => {
    return registrations.length;
  }, [registrations]);

  // Handle stamp allocation
  const handleIssueStampDirect = (cardId: string) => {
    onAddStamp(cardId);
    showTempMessage("Stamp added to customer wallet!");
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmailArr) return;
    onAddCustomerCard(selectedCampaignId, customerEmailArr);
    setCustomerEmailArr("");
    showTempMessage("New customer loyalty card instantiated!");
  };

  const handleUpdateCampaignSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onModifyCampaignStamps(
      selectedCampaignId,
      newCampaignStamps,
      newCampaignReward,
    );
    showTempMessage("Campaign criteria updated!");
  };

  const showTempMessage = (text: string) => {
    setSuccessMsg(text);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // Filters cards associated with current merchant campaign
  const campaignCards = cards.filter(
    (c) => c.campaignId === selectedCampaignId,
  );
  const currentCampaign = campaigns.find((c) => c.id === selectedCampaignId);

  return (
    <div
      id="merchant-solutions-view"
      className="max-w-7xl mx-auto px-4 py-8 text-[var(--color-on-surface)] min-h-screen"
    >
      {/* Merchant Desk Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🏪 Merchant Counter</span>
          </div>
          <h1 className="text-3xl font-bold font-headline text-white tracking-tight">
            Barista &amp; Owner Admin Console
          </h1>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
            Real-time scanner simulator, campaign settings manager, and live
            analytics dashboard.
          </p>
        </div>

        {/* Global Select Store Focus */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label
            htmlFor="store-focus-select"
            className="text-xs font-mono text-[var(--color-on-surface-variant)]"
          >
            Store Focus:
          </label>
          <select
            id="store-focus-select"
            value={selectedCampaignId}
            onChange={(e) => {
              setSelectedCampaignId(e.target.value);
              const camp = campaigns.find((c) => c.id === e.target.value);
              if (camp) {
                setNewCampaignStamps(camp.totalStampsReward);
                setNewCampaignReward(camp.rewardName);
              }
            }}
            className="bg-[var(--color-surface-container-high)] text-white text-xs rounded-xl px-4 py-2 border border-[var(--color-glass-stroke)] font-semibold font-headline tracking-wide focus:outline-none focus:border-[var(--color-cyan-glow)]/40 cursor-pointer"
          >
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.storeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="mb-6 p-3 px-4 bg-indigo-950/40 border border-[var(--color-cyan-glow)]/30 rounded-2xl text-xs font-mono text-cyan-300 flex items-center gap-2 animate-scaleUp">
          <Sparkles className="w-4 h-4 text-[var(--color-cyan-glow)]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-[var(--color-surface-container-low)] border border-[var(--color-glass-stroke)] rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[var(--color-on-surface-variant)] uppercase font-mono tracking-wider font-semibold">
              Total Stamps Issued
            </p>
            <p className="text-2xl font-bold font-headline mt-1 text-white">
              {totalStampsIssued}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--color-cyan-glow)]/10 text-[var(--color-cyan-glow)] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-[var(--color-surface-container-low)] border border-[var(--color-glass-stroke)] rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[var(--color-on-surface-variant)] uppercase font-mono tracking-wider font-semibold">
              Active Customers
            </p>
            <p className="text-2xl font-bold font-headline mt-1 text-white">
              {activeCustomersCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-[var(--color-surface-container-low)] border border-[var(--color-glass-stroke)] rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[var(--color-on-surface-variant)] uppercase font-mono tracking-wider font-semibold">
              Items Redeemed
            </p>
            <p className="text-2xl font-bold font-headline mt-1 text-white">
              {redeemedCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-[var(--color-surface-container-low)] border border-[var(--color-glass-stroke)] rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[var(--color-on-surface-variant)] uppercase font-mono tracking-wider font-semibold">
              Early Registrants
            </p>
            <p className="text-2xl font-bold font-headline mt-1 text-white">
              {totalRegistrations}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Register customers / Scanner queue */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Barista POS Terminal & Scan Simulator */}
          <div className="p-6 glass-card rounded-3xl border border-[var(--color-glass-stroke)]">
            <h2 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[var(--color-cyan-glow)]" />
              Barista Counter Terminal
            </h2>

            <p className="text-xs text-[var(--color-on-surface-variant)] mb-5">
              Select any active Customer Wallet Card registered under{" "}
              <span className="text-white font-semibold underline">
                {currentCampaign?.storeName}
              </span>{" "}
              to instantly allocate coffee points:
            </p>

            {campaignCards.length === 0 ? (
              <div className="py-6 text-center border border-dashed border-gray-700 rounded-2xl text-xs text-[var(--color-on-surface-variant)]">
                No active cards for this campaign. First instantiate a card for
                your customer below!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campaignCards.map((cCard) => (
                  <div
                    key={cCard.id}
                    className="p-4 bg-[var(--color-surface-container-high)] border border-white/5 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs text-white font-semibold">
                        Customer Wallet ID
                      </p>
                      <p className="text-[11px] text-[var(--color-on-surface-variant)] font-mono mt-0.5">
                        Code: NFC-
                        {cCard.id.split("-")[1]?.toUpperCase() || "782A"}
                      </p>

                      {/* Sub-stamps info */}
                      <p className="text-[11px] text-[var(--color-cyan-glow)] mt-2 font-mono">
                        Stamps: {cCard.stampsCount} / {cCard.totalNeeded}
                      </p>
                    </div>

                    <button
                      onClick={() => handleIssueStampDirect(cCard.id)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold font-headline rounded-xl active:scale-95 transition-all cursor-pointer"
                    >
                      +1 Stamp
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Customer Wallet Instance Form */}
            <form
              onSubmit={handleCreateCustomer}
              className="mt-6 p-4 bg-white/5 border border-white/5 rounded-2xl"
            >
              <h3 className="text-xs uppercase font-mono tracking-wider font-semibold text-[var(--color-on-surface-variant)] mb-3">
                ➕ Create Customer Loyalty Card
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={customerEmailArr}
                  onChange={(e) => setCustomerEmailArr(e.target.value)}
                  placeholder="Enter Customer Email..."
                  className="bg-[#020617] text-white text-xs px-4 py-2.5 rounded-xl border border-slate-800 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold font-headline rounded-xl shadow-lg shadow-indigo-500/10 transition-all active:scale-95 cursor-pointer"
                >
                  Instantiate Card
                </button>
              </div>
            </form>
          </div>

          {/* Interactive Custom SVG Analytics Graph */}
          <div className="p-6 glass-card rounded-3xl border border-[var(--color-glass-stroke)]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[var(--color-primary)]" />
                Loyalty Engagement Over Time
              </h2>
              <span className="text-[10px] text-[var(--color-on-surface-variant)] font-mono">
                MAY 2026
              </span>
            </div>

            <p className="text-xs text-[var(--color-on-surface-variant)] mb-6">
              Total number of check-ins registered day-by-day. Updates on stamp
              issuances.
            </p>

            {/* Premium custom hand-made SVG chart */}
            <div className="w-full h-48 bg-[#0B0E16] rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
              {/* SVG Grid with glowing columns */}
              <div className="w-full flex-grow relative flex items-end justify-between px-2 pt-4">
                {/* Visual horizontal guidelines */}
                <div
                  className="absolute left-0 right-0 border-t border-white/[0.04]"
                  style={{ top: "25%" }}
                ></div>
                <div
                  className="absolute left-0 right-0 border-t border-white/[0.04]"
                  style={{ top: "50%" }}
                ></div>
                <div
                  className="absolute left-0 right-0 border-t border-white/[0.04]"
                  style={{ top: "75%" }}
                ></div>

                {/* Bars */}
                {[
                  { label: "May 17", value: 12, height: "30%" },
                  { label: "May 18", value: 19, height: "45%" },
                  { label: "May 19", value: 28, height: "65%" },
                  { label: "May 20", value: 15, height: "35%" },
                  { label: "May 21", value: 45, height: "92%" },
                  { label: "May 22", value: 34, height: "70%" },
                  {
                    label: "May 23 (Today)",
                    value: Math.max(10, totalStampsIssued),
                    height: `${Math.min(100, totalStampsIssued * 3)}%\` or "60%`,
                  },
                ].map((bar, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 w-[11%] group relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 bg-black border border-(--color-glass-stroke) text-[9px] font-mono text-cyan-300 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {idx === 6 ? totalStampsIssued : bar.value} Check-ins
                      </div>

                      {/* Bar body */}
                      <div
                        className={`w-full rounded-t-md transition-all duration-700 cursor-pointer ${
                          idx === 6
                            ? "bg-linear-to-t from-(--color-electric-blue) to-(--color-cyan-glow) shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                            : "bg-indigo-900/60 group-hover:bg-indigo-800"
                        }`}
                        style={{
                          height:
                            idx === 6
                              ? `${Math.min(95, Math.max(25, totalStampsIssued * 10))}%`
                              : bar.height,
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* Labels Row */}
              <div className="w-full flex justify-between px-2 pt-2 border-t border-white/5 font-mono text-[9px] text-[var(--color-on-surface-variant)] mt-1.5">
                <span>May 17</span>
                <span>May 18</span>
                <span>May 19</span>
                <span>May 20</span>
                <span>May 21</span>
                <span>May 22</span>
                <span className="text-white font-semibold">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Campaign modifications & Early Access Table */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Campaign Criteria Settings Form */}
          <div className="p-6 glass-card rounded-3xl border border-[var(--color-glass-stroke)]">
            <h2 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[var(--color-primary)]" />
              Configure Strategy Settings
            </h2>

            <form
              onSubmit={handleUpdateCampaignSettings}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="stamps-required-input"
                  className="block text-xs font-mono text-[var(--color-on-surface-variant)] mb-1.5"
                >
                  Total Stamps Required per Card:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="stamps-required-input"
                    type="range"
                    min="4"
                    max="15"
                    value={newCampaignStamps}
                    onChange={(e) =>
                      setNewCampaignStamps(Number(e.target.value))
                    }
                    className="w-full accent-indigo-500 mt-1 cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-white whitespace-nowrap bg-white/5 px-2.5 py-1 rounded border border-white/5">
                    {newCampaignStamps} slots
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="campaign-reward-input"
                  className="block text-xs font-mono text-[var(--color-on-surface-variant)] mb-1.5"
                >
                  Redemption Gift Name:
                </label>
                <input
                  id="campaign-reward-input"
                  type="text"
                  value={newCampaignReward}
                  onChange={(e) => setNewCampaignReward(e.target.value)}
                  placeholder="e.g. Free Specialty Brew"
                  className="w-full bg-[#020617] text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-white/5 hover:bg-white/10 text-white font-bold font-headline text-xs rounded-xl transition-all border border-white/5 active:scale-95 cursor-pointer"
              >
                Apply Criteria Mod
              </button>
            </form>
          </div>

          {/* Reserved Early Access list */}
          <div className="p-6 glass-card rounded-3xl border border-[var(--color-glass-stroke)]">
            <h2 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-white/5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[var(--color-cyan-glow)]" />
                Waitlist Registrations
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-mono font-semibold">
                ACTIVE
              </span>
            </h2>

            <p className="text-xs text-[var(--color-on-surface-variant)] mb-4">
              A list of local merchants requesting integration access into our
              beta group:
            </p>

            <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1">
              {registrations.length === 0 ? (
                <p className="text-xs text-[var(--color-on-surface-variant)] py-4 text-center italic font-mono">
                  No early access waitlist records.
                </p>
              ) : (
                registrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-3 bg-white/5 border border-white/5 rounded-xl font-mono text-[11px] hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1 text-gray-400">
                      <span
                        className="font-bold text-white truncate max-w-[140px]"
                        title={reg.storeName}
                      >
                        🏪 {reg.storeName}
                      </span>
                      <span className="text-[9px] opacity-75">
                        {new Date(reg.timestamp).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-300 break-all pointer-events-auto">
                      ✉️ {reg.email}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
