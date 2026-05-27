import Image from "next/image";
import {
  Benefits,
  ContactUs,
  HeroSection,
  MerchantFocus,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MerchantFocus />
      <Benefits />
      <ContactUs />
    </>
  );
}
