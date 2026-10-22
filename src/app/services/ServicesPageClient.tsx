"use client";

import { CartProvider, useCart } from "@/components/services/CartProvider";
import ServicesPageHero from "@/components/services/ServicesPageHero";
import ArchitectureShowcase from "@/components/services/ArchitectureShowcase";
import ServiceGrid from "@/components/services/ServiceGrid";
import ScopeEstimator from "@/components/services/ScopeEstimator";
import PackageComparisonTable from "@/components/services/PackageComparisonTable";
import WhyChooseSection from "@/components/services/WhyChooseSection";
import ProcessSection from "@/components/services/ProcessSection";
import FaqSection from "@/components/services/FaqSection";
import ContactSection from "@/components/ContactSection";
import CartDrawer from "@/components/services/CartDrawer";
import CheckoutForm from "@/components/services/CheckoutForm";
import ConsultationModal from "@/components/services/ConsultationModal";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

// Floating cart button
function FloatingCartButton() {
  const { itemCount, toggleDrawer } = useCart();

  if (itemCount === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onClick={toggleDrawer}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-20 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-2xl shadow-primary/40 hover:opacity-95 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      aria-label="Open Scope Brief"
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Review Scope ({itemCount})</span>
    </motion.button>
  );
}

export default function ServicesPageClient() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-bg text-text-primary selection:bg-primary/20">
        {/* 1. Hero with Global Client Positioning & Quick Navigation */}
        <ServicesPageHero />

        <div className="section-divider" />

        {/* 2. Interactive Architecture & Live Delivery Showcase */}
        <ArchitectureShowcase />

        <div className="section-divider" />

        {/* 3. Interactive Service Packages, Standalone Solutions & Add-ons */}
        <ServiceGrid />

        <div className="section-divider" />

        {/* 4. Interactive Sprint Scope Estimator & Configurator */}
        <ScopeEstimator />

        <div className="section-divider" />

        {/* 5. Side-by-side Package Feature Comparison */}
        <PackageComparisonTable />

        <div className="section-divider" />

        {/* 6. Trust Signals & Why Global Tech Teams Partner With Ajay */}
        <WhyChooseSection />

        {/* 7. 4-Step Sprint Methodology */}
        <ProcessSection />

        {/* 8. FAQs for Global Engagements */}
        <FaqSection />

        <div className="section-divider" />

        {/* 9. Direct Send a Message & Consultation Section */}
        <ContactSection />

        {/* 10. Full Portfolio Footer */}
        <Footer />

        {/* Interactive Modals & Floating Cart */}
        <FloatingCartButton />
        <CartDrawer />
        <CheckoutForm />
        <ConsultationModal />
        <BackToTop />
      </div>
    </CartProvider>
  );
}
