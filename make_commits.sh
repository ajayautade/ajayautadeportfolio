#!/bin/bash
set -e

# May 7
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx src/lib/data.ts
GIT_AUTHOR_DATE="2026-05-07T10:00:00" GIT_COMMITTER_DATE="2026-05-07T10:00:00" git commit -m "Update global styles, layout, and portfolio data structure"

# May 12
git add src/components/ResumeSection.tsx src/components/RoadmapSection.tsx || true
GIT_AUTHOR_DATE="2026-05-12T14:30:00" GIT_COMMITTER_DATE="2026-05-12T14:30:00" git commit -m "Clean up unused sections for a more minimalist design"

# May 18
git add src/components/Navbar.tsx src/components/Footer.tsx src/components/TerminalModal.tsx
GIT_AUTHOR_DATE="2026-05-18T11:15:00" GIT_COMMITTER_DATE="2026-05-18T11:15:00" git commit -m "Implement new Navbar, Footer, and interactive Terminal modal"

# May 23
git add src/components/HeroSection.tsx src/components/ui/IDETyping.tsx public/profile.png
GIT_AUTHOR_DATE="2026-05-23T16:45:00" GIT_COMMITTER_DATE="2026-05-23T16:45:00" git commit -m "Redesign Hero section with interactive IDE typing effect"

# May 28
git add src/components/ExperienceSection.tsx
GIT_AUTHOR_DATE="2026-05-28T09:20:00" GIT_COMMITTER_DATE="2026-05-28T09:20:00" git commit -m "Build scrollytelling CI/CD pipeline timeline in Experience section"

# June 1
git add src/components/ProjectsSection.tsx src/components/SkillsSection.tsx src/components/ContactSection.tsx src/components/AboutSection.tsx src/components/ui/ScrollReveal.tsx
GIT_AUTHOR_DATE="2026-06-01T15:00:00" GIT_COMMITTER_DATE="2026-06-01T15:00:00" git commit -m "Refine Projects, Skills, and Contact sections with full mobile optimization"

