import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhoItIsFor from "@/components/sections/WhoItIsFor";
import AssetMapSimulation from "@/components/sections/AssetMapSimulation";
import ManagerBenefits from "@/components/sections/ManagerBenefits";
import HowItWorks from "@/components/sections/HowItWorks";
import TrustSection from "@/components/sections/TrustSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <WhoItIsFor />
        <AssetMapSimulation />
        <ManagerBenefits />
        <HowItWorks />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
