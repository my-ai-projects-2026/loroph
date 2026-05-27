import { ArrowRight, Coffee, LayoutGrid, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const Benefits = () => {
  return (
    <section
      id="customers"
      className="px-(--spacing-container-margin) py-16 sm:py-24 max-w-7xl mx-auto w-full"
    >
      <div className="text-center mb-16">
        <h2 className="font-headline text-3xl sm:text-4xl font-semibold mb-4 text-(--color-on-surface)">
          Customer Experience Made Simple
        </h2>
        <p className="text-(--color-on-surface-variant) max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Customers use one Reward Wallet to earn and redeem at the counter —
          fast, paper-free, and consistent across your branches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-8 glass-card rounded-3xl flex flex-col border border-(--color-glass-stroke) hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-2xl bg-(--color-cyan-glow)/10 flex items-center justify-center text-(--color-cyan-glow) mb-6">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-lg mb-3 text-(--color-on-surface)">
            One Wallet
          </h3>
          <p className="text-(--color-on-surface-variant)/90 text-sm leading-relaxed">
            One QR-linked Reward Wallet for every visit at any of your branches.
            Automatically discovers stores nearby.
          </p>
        </div>

        <div className="p-8 glass-card rounded-3xl flex flex-col border border-(--color-glass-stroke) hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-2xl bg-(--color-cyan-glow)/10 flex items-center justify-center text-(--color-cyan-glow) mb-6">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-headline font-bold text-lg mb-3 text-(--color-on-surface)">
            Fast Earning
          </h3>
          <p className="text-(--color-on-surface-variant)/90 text-sm leading-relaxed">
            Instant redemption at the counter. No scanning physical cards,
            typing emails, or manual lookup lines.
          </p>
        </div>

        <div className="p-8 glass-card rounded-3xl flex flex-col border border-(--color-glass-stroke) hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-2xl bg-(--color-primary-container)/5 flex items-center justify-center text-(--color-primary) mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-lg mb-3 text-(--color-on-surface)">
            Paper-free
          </h3>
          <p className="text-(--color-on-surface-variant)/90 text-sm leading-relaxed">
            A clean, digital reward history that doesn't clutter the customer's
            physical wallet or harm the environment.
          </p>
        </div>
      </div>

      <div
        id="cta-banner"
        className="mt-16 p-8 sm:p-12 bg-linear-to-r from-indigo-600 to-blue-600 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between relative overflow-hidden group shadow-2xl shadow-indigo-500/10"
      >
        <div className="relative z-10 max-w-xl text-center sm:text-left mb-6 sm:mb-0">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
            Stay ready for the Reward Wallet launch.
          </h2>
          <p className="text-sm opacity-90 leading-relaxed font-sans max-w-md text-indigo-100">
            Reserve early access now, then keep the rollout conversation moving
            with the team while launch access is being prepared.
          </p>
        </div>

        <Link
          href="/early-access"
          className="relative z-10 px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          Reserve early access
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="absolute -bottom-10 -right-10 opacity-10 transform group-hover:scale-110 transition-transform duration-700 select-none pointer-events-none">
          <Coffee className="w-45 h-45" />
        </div>
      </div>
    </section>
  );
};
export default Benefits;
