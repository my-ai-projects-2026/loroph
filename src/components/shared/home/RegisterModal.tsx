"use client";
import React, { useState } from "react";
import { Mail, Store, X, Sparkles, CheckCircle2, Ticket } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, storeName: string) => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
}: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !storeName) return;
    onSubmit(email, storeName);
    setIsSubmitted(true);
  };

  const handleFinished = () => {
    setEmail("");
    setStoreName("");
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="register-modal-overlay"
      className="fixed inset-0 z-50 bg-[#05070a]/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-[#111420] border border-[var(--color-glass-stroke)] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-scaleUp">
        {/* Glow behind modal */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-cyan-glow)]/15 rounded-full blur-3xl select-none pointer-events-none"></div>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono text-[var(--color-cyan-glow)] bg-[var(--color-cyan-glow)]/10 px-2 py-0.5 border border-[var(--color-cyan-glow)]/20 rounded font-semibold uppercase tracking-wider block w-fit mb-2">
                  Launch Phase 1
                </span>
                <h3 className="text-white font-headline font-extrabold text-xl">
                  Reserve Early Access Space
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed mb-6">
              Enter your details to register your coffee shop branch for our
              closed-beta group. You'll receive a pre-configured scanner trial
              pack when rollout commences.
            </p>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="modal-email-input"
                  className="text-[11px] font-mono font-medium text-[var(--color-on-surface-variant)]"
                >
                  Contact Email Address:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    id="modal-email-input"
                    type="email"
                    placeholder="you@coffeeshop.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--color-surface-container)] text-white text-xs pl-11 pr-4 py-3 rounded-xl border border-[var(--color-glass-stroke)] focus:ring-1 focus:ring-[var(--color-cyan-glow)] focus:border-[var(--color-cyan-glow)] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="modal-store-input"
                  className="text-[11px] font-mono font-medium text-[var(--color-on-surface-variant)]"
                >
                  Coffee Shop / Store Name:
                </label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    id="modal-store-input"
                    type="text"
                    placeholder="e.g. Ritual Brewing"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full bg-[var(--color-surface-container)] text-white text-xs pl-11 pr-4 py-3 rounded-xl border border-[var(--color-glass-stroke)] focus:ring-1 focus:ring-[var(--color-cyan-glow)] focus:border-[var(--color-cyan-glow)] outline-none"
                    required
                  />
                </div>
              </div>

              <p className="text-[10px] text-[var(--color-on-surface-variant)]/60 text-center mt-1">
                🛡️ Verified early-access secure registry. No credit card
                required.
              </p>

              <button
                type="submit"
                className="shimmer-btn w-full mt-4 py-3 bg-[var(--color-primary-container)] hover:bg-[var(--color-electric-blue)] text-white font-bold font-headline text-xs rounded-xl shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                Register Spot
              </button>
            </form>
          </div>
        ) : (
          /* Thank you Success state */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-scaleUp">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-white font-headline font-extrabold text-lg mb-1">
              You're on the list!
            </h3>
            <p className="text-xs text-[var(--color-cyan-glow)] font-mono mb-4 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-[var(--color-cyan-glow)]" />
              Queue spot reserved: #81-{Math.floor(Math.random() * 850) + 120}
            </p>

            <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed px-2 mb-6">
              Thank you for trusting L.O.R.O. We've registered{" "}
              <span className="text-white font-semibold">{storeName}</span> (
              {email}) for early staging. Keep your eyes on your inbox for
              onboarding instructions!
            </p>

            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3 text-left mb-6">
              <Ticket className="w-8 h-8 text-indigo-400 flex-shrink-0" />
              <div>
                <p className="text-white font-mono text-[11px] font-bold">
                  Beta Pack Eligible
                </p>
                <p className="text-[10px] text-[var(--color-on-surface-variant)] leading-normal mt-0.5">
                  Pre-configured QR scanners and NFC counters are allocated to
                  your store slot.
                </p>
              </div>
            </div>

            <button
              onClick={handleFinished}
              className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl transition-all border border-white/5 cursor-pointer"
            >
              Back to site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
