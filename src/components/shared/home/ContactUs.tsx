"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Mail, MapPin, Send } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, InputGroup } from "@/components/ui/input";
import { submitContactForm } from "@/lib/actions/contact.action";
import {
  type ContactFormValues,
  contactFormSchema,
} from "@/lib/schemas/contact.schema";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      shopName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setIsSuccess(true);
        reset();

        // Reset success state after a few seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        setErrorMessage(
          result.message || "Failed to send message. Please try again.",
        );
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 overflow-hidden text-(--color-on-surface) theme-page-bg"
    >
      {/* Corner glow orbs — matches DESIGN.md depth treatment */}
      <div className="absolute top-[-8%] right-[-8%] w-[500px] h-[500px] bg-(--color-electric-blue)/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-8%] left-[-8%] w-[400px] h-[400px] bg-(--color-cyan-glow)/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full border border-(--color-cyan-glow)/20 bg-(--color-cyan-glow)/5 text-(--color-cyan-glow) font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold uppercase">
                Contact Support
              </span>
            </div>

            <h2 className="font-headline text-[40px] md:text-[48px] leading-[48px] md:leading-[56px] font-bold tracking-tight text-(--color-on-surface) mb-6">
              Get in Touch
            </h2>

            <p className="font-body text-[16px] leading-[24px] text-(--color-on-surface-variant)/80 max-w-[420px] mb-10">
              Whether you're a shop owner ready to launch or have questions
              about the Reward Wallet, our team is here to help you scale your
              loyalty.
            </p>

            {/* Detail cards */}
            <div className="space-y-5 max-w-[440px]">
              {/* Card 1: Email */}
              <div className="group flex items-center gap-5 p-5 rounded-xl border border-(--color-glass-stroke) bg-(--color-surface-card)/40 backdrop-blur-md hover:border-(--color-electric-blue)/30 transition-all duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-(--color-electric-blue)/10 border border-(--color-electric-blue)/20 text-(--color-electric-blue) group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-(--color-on-surface-variant)/60 uppercase mb-1">
                    Email Us
                  </p>
                  <a
                    href="mailto:sales@loro.ph"
                    className="font-headline text-[18px] md:text-[20px] font-bold text-(--color-on-surface) hover:text-(--color-electric-blue) transition-colors duration-200"
                  >
                    sales@loro.ph
                  </a>
                </div>
              </div>

              {/* Card 2: HQ Location */}
              <div className="group flex items-start gap-5 p-5 rounded-xl border border-(--color-glass-stroke) bg-(--color-surface-card)/40 backdrop-blur-md hover:border-(--color-cyan-glow)/30 transition-all duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-(--color-cyan-glow)/10 border border-(--color-cyan-glow)/20 text-(--color-cyan-glow) mt-1 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-(--color-on-surface-variant)/60 uppercase mb-1">
                    Main Office
                  </p>
                  <p className="font-body text-[15px] leading-[22px] text-(--color-on-surface)/90 font-medium">
                    B3 L13 GENERAL CAPINPIN ST. TALON V SOLDIERS HILLS 2 LAS
                    PINAS CITY, Las Piñas, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="w-full glass-card rounded-xl p-8 md:p-10 shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-(--color-glass-stroke) bg-(--color-surface-card)/60 backdrop-blur-md relative overflow-hidden">
              {/* Subtle accent border at the top of the form */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-(--color-electric-blue) to-transparent opacity-50"></div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Two-column layout on medium+ screens for Name and Shop Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-(--color-on-surface-variant) uppercase ml-1"
                    >
                      Name
                    </label>
                    <InputGroup>
                      <Input
                        id="name"
                        disabled={isSubmitting}
                        placeholder="John Doe"
                        className={`${errors.name ? "border-rose-500/50 focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]" : ""}`}
                        {...register("name")}
                      />
                    </InputGroup>
                    {errors.name && (
                      <span className="font-body text-xs text-rose-400 mt-1 block ml-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Shop Name field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="shopName"
                      className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-(--color-on-surface-variant) uppercase ml-1"
                    >
                      Shop Name
                    </label>
                    <InputGroup>
                      <Input
                        id="shopName"
                        disabled={isSubmitting}
                        placeholder="Digital Brews"
                        className={`${errors.shopName ? "border-rose-500/50 focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]" : ""}`}
                        {...register("shopName")}
                      />
                    </InputGroup>
                    {errors.shopName && (
                      <span className="font-body text-xs text-rose-400 mt-1 block ml-1">
                        {errors.shopName.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email address field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-(--color-on-surface-variant) uppercase ml-1"
                  >
                    Email Address
                  </label>
                  <InputGroup>
                    <Input
                      id="email"
                      type="email"
                      disabled={isSubmitting}
                      placeholder="john@example.com"
                      className={`${errors.email ? "border-rose-500/50 focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]" : ""}`}
                      {...register("email")}
                    />
                  </InputGroup>
                  {errors.email && (
                    <span className="font-body text-xs text-rose-400 mt-1 block ml-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="font-mono text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-(--color-on-surface-variant) uppercase ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    disabled={isSubmitting}
                    placeholder="How can we help your business grow?"
                    rows={4}
                    className={`flex min-h-[120px] w-full rounded-lg border border-(--color-glass-stroke) bg-(--color-input-bg) px-4 py-3 text-base text-(--color-on-surface) transition-all placeholder:text-(--color-on-surface-variant)/30 focus:outline-none focus:border-(--color-electric-blue)/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.1)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${
                      errors.message
                        ? "border-rose-500/50 focus:border-rose-500/50 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                        : ""
                    }`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <span className="font-body text-xs text-rose-400 mt-1 block ml-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {errorMessage && (
                  <div className="text-xs md:text-sm font-body text-rose-400 text-center bg-rose-500/10 border border-rose-500/25 py-3 px-4 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    {errorMessage}
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-headline text-[18px] font-bold py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg
                      ${
                        isSuccess
                          ? "bg-emerald-500 text-white shadow-emerald-500/20"
                          : "bg-gradient-to-r from-[#0066FF] to-[#003fa4] hover:from-[#0077FF] hover:to-[#004ab8] text-white shadow-blue-500/20 hover:shadow-[0_0_25px_rgba(0,102,255,0.45)] hover:scale-[1.01] active:scale-[0.98]"
                      }
                      ${isSubmitting ? "opacity-80 cursor-not-allowed" : ""}
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
