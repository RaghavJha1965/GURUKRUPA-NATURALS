import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BestsellersSection from "@/components/sections/BestsellersSection";
import HealthBenefits from "@/components/sections/HealthBenefits";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "GURUKRUPA NATURALS — Pure Organic Superfoods from Nature",
  description:
    "Discover premium organic superfoods, black garlic, herbal teas and natural wellness products. Farm fresh, lab tested, no preservatives. Shop now with free shipping above ₹999.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <BestsellersSection />
      <HealthBenefits />
      <TestimonialsSection />
      <InstagramSection />
    </>
  );
}
