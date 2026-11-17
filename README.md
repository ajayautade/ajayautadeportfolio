# ajayautade.com

The website of Ajay Autade, Cloud & DevOps Engineer: services, pricing, project case studies, a blog and a free infrastructure checkup.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Every page is prerendered as static HTML.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Requires Node.js 20 or newer. A `Dockerfile` builds the standalone output for container hosting.

## Pages

| Route | What it is |
|---|---|
| `/` | Home |
| `/services`, `/services/[id]` | Overview and one page per service |
| `/pricing` | Prices in INR |
| `/projects`, `/projects/[slug]` | Case studies, written from each repo's README |
| `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/feed.xml` | Articles, topic pages and RSS |
| `/tools`, `/tools/[tool]` | Free browser tools: infrastructure checkup, CIDR calculator, cron explainer, Kubernetes resource calculator |
| `/about`, `/contact`, `/certifications`, `/deep-dives`, `/resume` | Background and contact |
| `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy` | Policies |

## Where content lives

| File | Holds |
|---|---|
| `src/lib/site.ts` | Name, legal name, phone, address, email, navigation |
| `src/lib/pricing.ts` | Prices |
| `src/lib/legal.ts` | Payment, refund and delivery terms shared by the policy pages |
| `src/lib/services.ts` | The six services, process steps and FAQ |
| `src/lib/projects.ts` | Project case studies |
| `src/lib/posts.ts`, `src/content/posts/*.tsx` | Blog articles |
| `src/lib/checkup.ts` | Checkup questions |
| `src/lib/booking.ts` | Days and hours offered in the "Book a call" calendar |
| `src/lib/data.ts` | Skills, experience, certifications |

To add an article: create a file in `src/content/posts/`, then register it in `src/lib/posts.ts` and `src/content/posts/index.ts`. Tag pages, the RSS feed, the sitemap and the share image follow automatically.

## Before applying to a payment gateway

Fill in `street` and `postalCode` in `src/lib/site.ts`. They appear on the Contact page and the policy pages once set.

Once approved, create a Razorpay Payment Link for the paid session and put its URL in `paidSessionPaymentLink` in the same file. The Pricing page button then takes payment directly.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification token (optional) |

## Design

The visual system is documented in `src/app/globals.css`: a black opening stage, a white reading surface, 4px corners, and one accent colour used sparingly.
