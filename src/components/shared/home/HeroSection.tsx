import Link from "next/link";
import DynamicStamp from "../DynamicStamp";
import ManualStamp from "./ManualStamp";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full grow flex flex-col lg:flex-row items-center justify-center px-8 lg:px-12 py-12 lg:py-24 gap-12 overflow-hidden hero-gradient"
    >
      <div
        id="hero-content"
        className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10 space-y-8"
      >
        <div
          id="loyalty-badge"
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider"
        >
          <span>Universal Loyalty</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span>L.O.R.O. v1.0</span>
        </div>

        <h1
          id="hero-title"
          className="font-headline text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-xl"
        >
          A Loyalty Platform <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-blue-400">
            for your regulars.
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
          Simple digital rewards that keep customers returning — no punch cards,
          no fuss. Built for busy shops.
        </p>

        <div className="flex items-center space-x-4">
          <Link
            href="/reserve"
            className="px-8 py-4 flex  bg-indigo-600 text-white! rounded-xl font-semibold shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95 cursor-pointer"
          >
            Reserve Access
          </Link>
          <Link
            href="/items"
            className="px-8 py-4 bg-slate-850 text-slate-200 border border-slate-700/80 rounded-xl font-semibold hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
          >
            Merchant Items
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative min-h-[400px] flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center">
          <ManualStamp />
          <DynamicStamp />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
