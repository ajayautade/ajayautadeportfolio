#!/bin/bash

# Day 1: June 7, 2026
export GIT_COMMITTER_DATE="2026-06-07T14:00:00"
export GIT_AUTHOR_DATE="2026-06-07T14:00:00"
git add src/components/ui/RadarChart.tsx src/components/SkillsSection.tsx
git commit -m "feat: add interactive radar chart for skills section"

# Day 2: June 8, 2026
export GIT_COMMITTER_DATE="2026-06-08T15:30:00"
export GIT_AUTHOR_DATE="2026-06-08T15:30:00"
git add src/components/ui/ParticleNetwork.tsx src/components/StatsSection.tsx src/components/HeroSection.tsx
git commit -m "feat: enhance hero section with particle network and stats"

# Day 3: June 9, 2026
export GIT_COMMITTER_DATE="2026-06-09T10:15:00"
export GIT_AUTHOR_DATE="2026-06-09T10:15:00"
git add src/lib/services-data.ts src/components/services/CartProvider.tsx src/components/services/ServiceCard.tsx src/components/services/ServiceGrid.tsx src/components/services/ServicesPageHero.tsx
git commit -m "feat(services): implement core services components and data layer"

# Day 4: June 11, 2026
export GIT_COMMITTER_DATE="2026-06-11T16:45:00"
export GIT_AUTHOR_DATE="2026-06-11T16:45:00"
git add src/components/services/CartDrawer.tsx src/components/services/CheckoutForm.tsx src/app/services/ src/components/ServicesSection.tsx
git commit -m "feat(services): add cart drawer, checkout flow, and services route"

# Day 5: June 12, 2026
export GIT_COMMITTER_DATE="2026-06-12T11:20:00"
export GIT_AUTHOR_DATE="2026-06-12T11:20:00"
git add src/app/opengraph-image.tsx src/app/robots.ts src/app/sitemap.ts src/app/layout.tsx
git commit -m "chore(seo): generate dynamic sitemap, robots.txt and opengraph images"

# Day 6: June 13, 2026 (Today)
export GIT_COMMITTER_DATE="2026-06-13T10:00:00"
export GIT_AUTHOR_DATE="2026-06-13T10:00:00"
git add src/components/Navbar.tsx src/components/AboutSection.tsx src/components/ui/IDETyping.tsx src/lib/data.ts src/app/page.tsx
git commit -m "fix: polish UI components, typing animations, and navbar layout"

# Push to origin
git push origin main
