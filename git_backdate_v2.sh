#!/bin/bash

# Day 1: June 10, 2026 (3 days ago)
export GIT_COMMITTER_DATE="2026-06-10T14:20:00"
export GIT_AUTHOR_DATE="2026-06-10T14:20:00"
git add src/components/ui/RadarChart.tsx src/lib/data.ts
git commit -m "feat: update devops content and fix radar chart mobile clipping"

# Day 2: June 11, 2026 (2 days ago)
export GIT_COMMITTER_DATE="2026-06-11T11:45:00"
export GIT_AUTHOR_DATE="2026-06-11T11:45:00"
git add src/app/page.tsx src/components/CertificationsSection.tsx
git commit -m "feat: reorder sections and add new certifications component"

# Day 3: June 12, 2026 (Yesterday)
export GIT_COMMITTER_DATE="2026-06-12T16:10:00"
export GIT_AUTHOR_DATE="2026-06-12T16:10:00"
git add src/components/ContactSection.tsx src/app/globals.css
git commit -m "ui: redesign contact section with animated shimmer and quick actions"

# Day 4: June 13, 2026 (Today)
export GIT_COMMITTER_DATE="2026-06-13T12:30:00"
export GIT_AUTHOR_DATE="2026-06-13T12:30:00"
git add src/components/AboutSection.tsx src/components/HeroSection.tsx src/components/ProjectsSection.tsx src/components/ServicesSection.tsx src/components/StatsSection.tsx
git commit -m "style: optimize responsiveness across mobile and desktop breakpoints"

# Push to origin
git push origin main
