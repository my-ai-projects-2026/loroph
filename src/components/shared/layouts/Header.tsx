"use client";
import Link from "next/link";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { usePageNavigate } from "../NavigateProvider";
import { ShoppingBag } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const { onPageNavigate } = usePageNavigate();

  return (
    <nav
      id="navbar"
      className="fixed top-0 w-full z-45 flex justify-between items-center px-8 h-16 border-b border-(--color-glass-stroke) bg-(--color-header-bg) backdrop-blur-md transition-colors duration-300"
    >
      <Logo />
      <div
        id="nav-actions"
        className="hidden md:flex items-center gap-6 font-mono text-sm font-medium text-(--color-nav-text)"
      >
        <Button
          onClick={() => onPageNavigate("home")}
          className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer"
          variant={"ghost"}
        >
          Home
        </Button>
        <Button
          onClick={() => onPageNavigate("solution")}
          className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer"
          variant={"ghost"}
        >
          Solutions
        </Button>
        <Button
          onClick={() => onPageNavigate("customers")}
          className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer"
          variant={"ghost"}
        >
          Customers
        </Button>

        <Button
          onClick={() => onPageNavigate("contact")}
          className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer"
          variant={"ghost"}
        >
          Contact Us
        </Button>

        <Link
          href="/items"
          className="
            relative ml-2 flex items-center gap-1.5
            px-4 py-1.5 rounded-full
            font-mono text-xs font-bold tracking-wider uppercase
            text-white!
            overflow-hidden
            cursor-pointer
            transition-all duration-300
            hover:scale-105 active:scale-95
            hover:shadow-[0_0_22px_rgba(251,146,60,0.55)]
            
            group
          "
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
          }}
        >
          {/* shimmer sweep */}
          <span
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.28)_50%,transparent_60%)]
              -translate-x-full group-hover:translate-x-full
              transition-transform duration-500 ease-in-out
            "
          />
          <ShoppingBag className=" h-3.5 relative z-10" />
          <span className="relative z-10">Our merchandise</span>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};
export default Header;
