"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import DeepDivesBanner from "@/components/DeepDivesBanner";
import SkillsSection from "@/components/SkillsSection";
import CertificationsBanner from "@/components/CertificationsBanner";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SectionDots from "@/components/SectionDots";

export default function Home() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* 1. Hook — who you are */}
        <HeroSection />

        <div className="section-divider" />

        {/* 2. Context — background & philosophy */}
        <AboutSection />

        <div className="section-divider" />

        {/* 3. Proof of work — what you've done (most important for recruiters) */}
        <ExperienceSection />

        <div className="section-divider" />

        {/* 4. Evidence — real projects that demonstrate skills */}
        <ProjectsSection />

        <div className="section-divider" />

        {/* 4.5. Teaser CTA — link to dedicated Interactive Lab & Deep Dives page */}
        <DeepDivesBanner />

        <div className="section-divider" />

        {/* 5. Technical depth — skills & proficiency */}
        <SkillsSection />

        <div className="section-divider" />

        {/* 6. Credibility — certifications & verified credentials teaser */}
        <CertificationsBanner />

        <div className="section-divider" />

        {/* 7. Impact numbers — quantified results */}
        <StatsSection />

        <div className="section-divider" />

        {/* 8. What you offer — capabilities overview */}
        <ServicesSection />

        <div className="section-divider" />

        {/* 9. Strong CTA — make it easy to reach you */}
        <ContactSection />
      </motion.main>
      <Footer />
      <BackToTop />
      <SectionDots />
    </>
  );
}
