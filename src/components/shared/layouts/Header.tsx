"use client";
import { Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../Logo";
import { usePageNavigate } from "../NavigateProvider";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const { onPageNavigate } = usePageNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileNavigate = (
    view: "home" | "solution" | "customers" | "contact",
  ) => {
    onPageNavigate(view);
    setIsOpen(false);
  };

  return (
    <nav
      id="navbar"
      className="fixed top-0 w-full z-45 flex justify-between items-center px-8 h-16 border-b border-(--color-glass-stroke) bg-(--color-header-bg) backdrop-blur-md transition-colors duration-300"
    >
      <Logo />

      {/* Desktop Navigation */}
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

      {/* Mobile Responsive Navigation (Hamburger Menu Button and ThemeToggle) */}
      <div className="flex md:hidden items-center gap-4">
        <ThemeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer text-(--color-nav-text) hover:text-(--color-nav-text-hover)"
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] sm:w-[320px] bg-(--color-overlay-bg) border-l border-(--color-glass-stroke) text-(--color-on-surface) backdrop-blur-lg flex flex-col p-6 shadow-2xl"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex items-center justify-between pb-6 border-b border-(--color-glass-stroke)">
              <Logo />
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-3 py-6 font-mono text-sm font-medium">
              <Button
                onClick={() => handleMobileNavigate("home")}
                className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer justify-start w-full text-left h-10 px-3"
                variant="ghost"
              >
                Home
              </Button>
              <Button
                onClick={() => handleMobileNavigate("solution")}
                className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer justify-start w-full text-left h-10 px-3"
                variant="ghost"
              >
                Solutions
              </Button>
              <Button
                onClick={() => handleMobileNavigate("customers")}
                className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer justify-start w-full text-left h-10 px-3"
                variant="ghost"
              >
                Customers
              </Button>
              <Button
                onClick={() => handleMobileNavigate("contact")}
                className="hover:text-(--color-nav-text-hover) hover:bg-transparent transition-colors cursor-pointer justify-start w-full text-left h-10 px-3"
                variant="ghost"
              >
                Contact Us
              </Button>

              <Link
                href="/items"
                onClick={() => setIsOpen(false)}
                className="
                  relative mt-4 flex items-center justify-center gap-1.5
                  px-4 py-2.5 rounded-full
                  font-mono text-xs font-bold tracking-wider uppercase
                  text-white!
                  overflow-hidden
                  cursor-pointer
                  transition-all duration-300
                  hover:scale-102 active:scale-98
                  hover:shadow-[0_0_22px_rgba(251,146,60,0.55)]
                  group
                  w-full
                "
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
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
                <ShoppingBag className="h-3.5 relative z-10" />
                <span className="relative z-10">Our merchandise</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
export default Header;
