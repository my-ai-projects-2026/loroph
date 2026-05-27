"use client";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import Link from "next/link";
import { usePageNavigate } from "../NavigateProvider";

const Footer = () => {
  const { onPageNavigate } = usePageNavigate();

  return (
    <footer
      id="main-footer"
      className="w-full px-8 py-12 flex flex-col items-center gap-6 text-center bg-(--color-footer-bg) border-t border-(--color-glass-stroke) backdrop-blur-md mt-12 mb-20 md:mb-0 relative z-10 transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <Logo />
      </div>
      <div className="hidden md:flex flex-wrap justify-center gap-8 text-(--color-nav-text) text-xs font-mono">
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
      </div>
      <p className="text-(--color-on-surface-variant) text-xs font-mono opacity-80 mt-2">
        © {new Date().getFullYear()} L.O.R.O. Early-access site for coffee-shop
        loyalty launch.
      </p>
    </footer>
  );
};
export default Footer;
