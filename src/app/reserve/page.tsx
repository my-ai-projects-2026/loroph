"use client";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Loader2,
  Mail,
  Network,
  ShieldCheck,
  Store,
  User,
  Lock,
  Tag,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input, InputGroup, Select } from "@/components/ui/input";

interface FormValues {
  fullName: string;
  businessName: string;
  email: string;
  industry: string;
  locations: string;
}

const ReservePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      businessName: "",
      email: "",
      industry: "coffee-shop",
      locations: "1",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log("Waitlist registered:", data);
    }, 1800);
  };

  return (
    <div
      className="text-on-surface selection:bg-electric-blue selection:text-white min-h-screen overflow-x-hidden font-body relative flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at top right, #0F172A 0%, #05070A 100%)",
      }}
    >
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full border border-glass-stroke bg-surface-card/30 backdrop-blur-md text-on-surface-variant hover:text-cyan-glow hover:border-cyan-glow/40 hover:bg-surface-card/60 transition-all duration-300 group cursor-pointer text-xs font-mono tracking-wider uppercase"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-electric-blue/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-glow/5 blur-[100px] rounded-full z-0 pointer-events-none"></div>

      {/* Visual Polish: Floating Card Background Decoration */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-electric-blue/20 to-transparent"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 py-12 w-full">
        {/* Brand Identifier */}
        <div className="mb-6 text-center">
          <h1 className="font-headline text-[24px] leading-[32px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-glow">
            LOYALTY.OS
          </h1>
        </div>

        {/* Registration Container */}
        <div className="w-full max-w-[480px] glass-card rounded-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-glass-stroke transition-all duration-300">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="font-headline text-[32px] leading-[40px] tracking-tight font-bold text-on-surface mb-3">
              Reserve Your Access
            </h2>
            <p className="font-body text-[15px] leading-[22px] text-on-surface-variant max-w-[340px] mx-auto opacity-90">
              Join the waitlist for the digital loyalty revolution. Built
              exclusively for merchants.
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-on-surface-variant uppercase ml-1"
              >
                Full Name
              </label>
              <InputGroup>
                <Input
                  id="fullName"
                  disabled={isSubmitting || isSuccess}
                  className={`pl-12 peer ${errors.fullName ? "border-rose-500/50 focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]" : ""}`}
                  placeholder="Jane Doe"
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                <User className="absolute left-4 w-5 h-5 text-on-surface-variant/40 pointer-events-none transition-colors duration-200 peer-focus:text-cyan-glow" />
              </InputGroup>
              {errors.fullName && (
                <span className="font-body text-xs text-rose-400 mt-1 block ml-1">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Merchant / Business Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="businessName"
                className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-on-surface-variant uppercase ml-1"
              >
                Merchant / Business Name
              </label>
              <InputGroup>
                <Input
                  id="businessName"
                  disabled={isSubmitting || isSuccess}
                  className={`pl-12 peer ${errors.businessName ? "border-rose-500/50 focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]" : ""}`}
                  placeholder="Gourmet Bistro"
                  type="text"
                  {...register("businessName", {
                    required: "Business name is required",
                  })}
                />
                <Store className="absolute left-4 w-5 h-5 text-on-surface-variant/40 pointer-events-none transition-colors duration-200 peer-focus:text-cyan-glow" />
              </InputGroup>
              {errors.businessName && (
                <span className="font-body text-xs text-rose-400 mt-1 block ml-1">
                  {errors.businessName.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-on-surface-variant uppercase ml-1"
              >
                Email Address
              </label>
              <InputGroup>
                <Input
                  id="email"
                  disabled={isSubmitting || isSuccess}
                  className={`pl-12 peer ${errors.email ? "border-rose-500/50 focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]" : ""}`}
                  placeholder="owner@shop.com"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Mail className="absolute left-4 w-5 h-5 text-on-surface-variant/40 pointer-events-none transition-colors duration-200 peer-focus:text-cyan-glow" />
              </InputGroup>
              {errors.email && (
                <span className="font-body text-xs text-rose-400 mt-1 block ml-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Industry Selection */}
            <div className="space-y-1.5">
              <label
                htmlFor="industry"
                className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-on-surface-variant uppercase ml-1"
              >
                Industry
              </label>
              <InputGroup>
                <Select
                  id="industry"
                  disabled={isSubmitting || isSuccess}
                  className="pl-12 peer cursor-pointer"
                  {...register("industry", { required: true })}
                >
                  <option value="coffee-shop">Coffee Shop</option>
                  <option value="franchise">Franchise</option>
                  <option value="retail">Retail</option>
                  <option value="food">Food & Beverage (F&B)</option>
                </Select>
                <Tag className="absolute left-4 w-5 h-5 text-on-surface-variant/40 pointer-events-none transition-colors duration-200 peer-focus:text-cyan-glow" />
                <ChevronDown className="absolute right-4 w-5 h-5 text-on-surface-variant/50 pointer-events-none" />
              </InputGroup>
            </div>

            {/* Number of Locations */}
            <div className="space-y-1.5">
              <label
                htmlFor="locations"
                className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-on-surface-variant uppercase ml-1"
              >
                Number of Locations
              </label>
              <InputGroup>
                <Select
                  id="locations"
                  disabled={isSubmitting || isSuccess}
                  className="pl-12 peer cursor-pointer"
                  {...register("locations", { required: true })}
                >
                  <option value="1">1 Location</option>
                  <option value="2-5">2-5 Locations</option>
                  <option value="6-10">6-10 Locations</option>
                  <option value="10+">10+ Locations</option>
                </Select>
                <Network className="absolute left-4 w-5 h-5 text-on-surface-variant/40 pointer-events-none transition-colors duration-200 peer-focus:text-cyan-glow" />
                <ChevronDown className="absolute right-4 w-5 h-5 text-on-surface-variant/50 pointer-events-none" />
              </InputGroup>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full font-headline text-[18px] font-bold py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg
                  ${
                    isSuccess
                      ? "bg-emerald-500 text-white shadow-emerald-500/20"
                      : "bg-gradient-to-r from-[#0066FF] to-[#003fa4] hover:from-[#0077FF] hover:to-[#004ab8] text-white shadow-blue-500/20 hover:shadow-[0_0_25px_rgba(0,102,255,0.45)] hover:scale-[1.01] active:scale-[0.98]"
                  }
                  ${isSubmitting ? "opacity-80" : ""}
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding to Waitlist...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>You're on the list!</span>
                  </>
                ) : (
                  <>
                    <span>Join the Waitlist</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust Section */}
          <div className="mt-8 border-t border-glass-stroke pt-5 flex flex-wrap justify-center gap-x-8 gap-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-glow" />
              <span className="font-mono text-[11px] leading-[16px] tracking-[0.08em] font-medium text-on-surface-variant/80 uppercase">
                No card required
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-glow fill-cyan-glow/10" />
              <span className="font-mono text-[11px] leading-[16px] tracking-[0.08em] font-medium text-on-surface-variant/80 uppercase">
                AES-256 secure
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 w-full max-w-[480px] flex flex-col items-center gap-3 opacity-60">
          <p className="font-mono text-[10px] leading-[14px] tracking-[0.1em] font-semibold text-on-surface-variant uppercase text-center">
            © 2026 LOYALTY.OS DIGITAL SOLUTIONS
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-mono text-[11px] leading-[16px] tracking-[0.08em] font-semibold text-on-surface-variant hover:text-cyan-glow transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-mono text-[11px] leading-[16px] tracking-[0.08em] font-semibold text-on-surface-variant hover:text-cyan-glow transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-mono text-[11px] leading-[16px] tracking-[0.08em] font-semibold text-on-surface-variant hover:text-cyan-glow transition-colors duration-200"
            >
              Support
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ReservePage;
