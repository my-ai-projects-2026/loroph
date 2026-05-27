import { Award, Milestone, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const MerchantFocus = () => {
  return (
    <section
      id="merchant-solutions-view"
      className="relative px-(--spacing-container-margin) py-16 sm:py-24 bg-(--color-surface-container-lowest) border-t border-(--color-glass-stroke)"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-1/2">
          <div className="inline-block px-3 py-1 bg-(--color-primary-container)/10 border border-primary/20 rounded-full mb-6">
            <span className="text-(--color-primary) font-mono text-[10px] uppercase tracking-widest font-semibold">
              WHY WE BUILT L.O.R.O
            </span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4 text-(--color-on-surface) leading-tight">
            <span>Manual marketing cost you the customers you</span>
            <span className="text-(--color-primary)"> can&apos;t see</span>
          </h2>

          <p className="text-(--color-on-surface-variant) mb-10 font-body max-w-xl text-base">
            L.O.R.O. helps coffee shops keep customers coming back without
            adding friction to the team’s daily work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-primary-container)]/10 border border-primary/20 flex items-center justify-center text-[var(--color-primary)]">
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-[var(--color-primary)] text-sm font-headline">
                  Quick onboarding
                </h4>
                <p className="text-xs text-[var(--color-on-surface-variant)]/80 leading-relaxed">
                  Get a new counter ready from a browser without dragging setup
                  into service hours.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-(--color-primary-container)/10 border border-primary/20 flex items-center justify-center text-(--color-primary)">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-(--color-primary) text-sm font-headline">
                  Built for service
                </h4>
                <p className="text-xs text-(--color-on-surface-variant)/80 leading-relaxed">
                  Built for rush hour so the team can scan, serve, and keep the
                  line moving fast.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-(--color-primary-container)/10 border border-primary/20 flex items-center justify-center text-(--color-primary)">
                <Milestone className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-(--color-primary) text-sm font-headline">
                  One customer identity
                </h4>
                <p className="text-xs text-(--color-on-surface-variant)/80 leading-relaxed">
                  QR scans connect back to the same Reward Wallet every time
                  across every branch.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-primary-container)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-[var(--color-primary)] text-sm font-headline">
                  All-in-one campaigns
                </h4>
                <p className="text-xs text-[var(--color-on-surface-variant)]/80 leading-relaxed">
                  Create promotions and send instant notifications all in one
                  central place.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="shop-img-container"
          className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl h-[400px] border border-[var(--color-glass-stroke)]"
        >
          <Image
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            src="/screen.png"
            alt="L.O.R.O. Counter POS"
            height={600}
            width={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-navy)]/90 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white font-headline font-semibold text-lg">
              Integrated Counter POS
            </p>
            <p className="text-[var(--color-on-surface-variant)] text-xs font-sans mt-1">
              Ready in less than 3 minutes. Zero custom hardware or costly
              server setups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MerchantFocus;
