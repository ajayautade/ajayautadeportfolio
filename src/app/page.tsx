import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hook — who you are */}
        <HeroSection />

        {/* 2. Context — background & philosophy */}
        <AboutSection />

        {/* 3. Proof of work — what you've done (most important for recruiters) */}
        <ExperienceSection />

        {/* 4. Evidence — real projects that demonstrate skills */}
        <ProjectsSection />

        {/* 5. Technical depth — skills & proficiency */}
        <SkillsSection />

        {/* 6. Credibility — certifications in progress */}
        <CertificationsSection />

        {/* 7. Impact numbers — quantified results */}
        <StatsSection />

        {/* 8. What you offer — capabilities overview */}
        <ServicesSection />

        {/* 9. Strong CTA — make it easy to reach you */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
