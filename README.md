# 🚀 Ajay Autade — Personal Portfolio

A modern, production-ready personal portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features a premium SaaS-style design with glassmorphism effects, smooth animations, dark/light mode, and full SEO optimization.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss)

---

## ✨ Features

- **🎨 Premium Design** — SaaS-style glassmorphism with gradient accents
- **🌙 Dark/Light Mode** — System-aware theme switching
- **📱 Fully Responsive** — Mobile-first, works on all devices
- **⚡ Blazing Fast** — Next.js 15 with App Router
- **🎭 Smooth Animations** — Framer Motion scroll reveals & transitions
- **🔍 SEO Optimized** — Meta tags, JSON-LD schema, semantic HTML
- **💻 Interactive Terminal** — DevOps command animations in hero
- **📊 Skills Dashboard** — Animated progress bars with categorization
- **🗺️ DevOps Roadmap** — Visual learning journey timeline
- **📬 Contact Form** — Integrated mailto contact form

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://motion.dev/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark mode |

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0
- **npm** >= 9.0

### Installation

```bash
# Clone the repository
git clone https://github.com/ajayautade/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, theme, SEO)
│   ├── page.tsx            # Main page (all sections)
│   └── globals.css         # Design system & custom CSS
├── components/
│   ├── Navbar.tsx           # Sticky nav + mobile menu
│   ├── HeroSection.tsx      # Hero + terminal animation
│   ├── AboutSection.tsx     # Bio + info cards
│   ├── SkillsSection.tsx    # Skills + progress bars
│   ├── ProjectsSection.tsx  # Project cards + GitHub links
│   ├── RoadmapSection.tsx   # DevOps learning timeline
│   ├── ExperienceSection.tsx # Internship timeline
│   ├── ResumeSection.tsx    # Resume download CTA
│   ├── ContactSection.tsx   # Contact form + socials
│   ├── Footer.tsx           # Footer
│   ├── ThemeToggle.tsx      # Dark/light toggle
│   └── ui/
│       ├── ScrollReveal.tsx  # Scroll animation wrapper
│       └── SectionHeading.tsx # Section title component
└── lib/
    └── data.ts              # All portfolio data
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — click **Deploy**
4. Your site is live! 🎉

Or deploy via CLI:

```bash
npm i -g vercel
vercel
```

### Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
3. Connect your GitHub repository
4. Set build configuration:
   - **Build command:** `npx @cloudflare/next-on-pages@latest`
   - **Build output directory:** `.vercel/output/static`
   - **Environment variable:** `NODE_VERSION` = `18`
5. Click **Save and Deploy**

Or use the Cloudflare CLI:

```bash
npm install -D @cloudflare/next-on-pages
npx @cloudflare/next-on-pages@latest
npx wrangler pages deploy .vercel/output/static
```

> **Note:** For Cloudflare Pages, add `export const runtime = 'edge'` to any route using server features.

## 📝 Customization

### Update Personal Info

Edit `src/lib/data.ts` to update:
- Personal details (name, email, phone, location)
- Skills and proficiency levels
- Projects and GitHub links
- Work experience
- DevOps roadmap items

### Add Your Resume

Drop your resume PDF at `public/resume.pdf`.

### Change Colors

Edit the CSS custom properties in `src/app/globals.css` under `:root` and `.dark`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/ajayautade">Ajay Autade</a>
</p>
