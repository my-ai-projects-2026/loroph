import {
  Benefits,
  HeroSection,
  MerchantFocus,
  ContactUs,
} from "@/components/shared";
import Image from "next/image";

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
