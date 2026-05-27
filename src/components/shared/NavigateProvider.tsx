"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";

type NavigateContextType = {
  onPageNavigate: (view: "home" | "solution" | "customers" | "contact") => void;
  onOpenEarlyAccess: () => void;
};

const NavigateContext = React.createContext<NavigateContextType | undefined>(
  undefined,
);

/** Isolated component so useSearchParams() sits inside a Suspense boundary */
const ScrollToHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isHome = pathname === "/" || pathname === "";
    if (!isHome) return;

    const scrollTo = searchParams.get("scrollTo");
    if (!scrollTo) return;

    // Small delay to allow the home page to render before scrolling
    const timeout = setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      // Clean up the URL without triggering a navigation
      const url = new URL(window.location.href);
      url.searchParams.delete("scrollTo");
      window.history.replaceState({}, "", url.toString());
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return null;
};

const NavigateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useRouter();
  const pathname = usePathname();

  const handleNavigate = (
    view: "home" | "solution" | "customers" | "contact",
  ) => {
    if (typeof document === "undefined") return;

    const idTarget = {
      home: "home-root",
      solution: "merchant-solutions-view",
      customers: "customers",
      contact: "contact",
    }[view];

    if (!idTarget) return;

    const isHome = pathname === "/" || pathname === "";

    if (isHome) {
      document.getElementById(idTarget)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home page, then scroll to the section after the page loads
      navigate.push(`/?scrollTo=${idTarget}`);
    }
  };

  const onOpenEarlyAccess = () => {
    navigate.push("/early-access");
  };

  return (
    <NavigateContext.Provider
      value={{ onPageNavigate: handleNavigate, onOpenEarlyAccess }}
    >
      <Suspense fallback={null}>
        <ScrollToHandler />
      </Suspense>
      {children}
    </NavigateContext.Provider>
  );
};

export const usePageNavigate = () => {
  const context = React.useContext(NavigateContext);
  if (!context) {
    throw new Error("usePageNavigate must be used within a NavigateProvider");
  }
  return context;
};

export default NavigateProvider;
