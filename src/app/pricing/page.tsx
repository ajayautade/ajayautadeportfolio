import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import BookCallButton from "@/components/site/BookCallButton";
import TrackedLink from "@/components/site/TrackedLink";
import { legal } from "@/lib/legal";
import { currency, formatInr, priceItems } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

const title = "Pricing: DevOps Consultation and Project Rates in USD";
const description =
  "Prices for Cloud and DevOps work by Ajay Autade: a free intro call, a paid 60-minute session, and project prices for CI/CD, Kubernetes, Terraform and AWS. In USD.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/pricing" },
};

const contactHref = (topic: string, item: string) =>
  `/contact?topic=${encodeURIComponent(topic)}&summary=${encodeURIComponent(`I'd like to ask about: ${item}.\n\n`)}`;

const terms = [
  {
    title: "How payment works",
    text: `The intro call is free. A working session is paid in full when you book. A project is paid ${legal.advancePercent}% in advance and ${100 - legal.advancePercent}% at handover. Payments are processed by ${legal.paymentProcessor}.`,
  },
  {
    title: "What a “from” price means",
    text: "It is the starting price for the scope described. I send a written scope with the final amount before you pay anything, so the number never changes after you agree to it.",
  },
  {
    title: "What is not included",
    text: "Your cloud provider bill, domains and third-party licences. Those are billed to you directly by the provider. Taxes, if applicable, are shown on the invoice.",
  },
  {
    title: "If plans change",
    text: `A working session can be cancelled or moved up to ${legal.consultationNoticeHours} hours before for a full refund. A project advance is refunded in full if you cancel before work starts.`,
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Pricing"
          title="Prices, written down before any work starts."
          lead="A free intro call, one fixed-price working session, and starting prices for the six kinds of project I take on. All amounts are in US Dollars."
          crumbs={[{ name: "Pricing", path: "/pricing" }]}
        />

        <section aria-labelledby="prices-heading" className="py-16 sm:py-24">
          <div className="section-container">
            <h2 id="prices-heading" className="type-eyebrow text-text-tertiary">
              {priceItems.length} items, prices in {currency}
            </h2>
            <ul className="mt-8 border-t border-text-primary">
              {priceItems.map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className="grid scroll-mt-24 gap-x-10 gap-y-4 border-b border-border py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_12rem] lg:items-start"
                >
                  <div>
                    <h3 className="type-headline text-text-primary text-balance">{item.title}</h3>
                    {item.serviceId && (
                      <Link
                        href={`/services/${item.serviceId}`}
                        className="tap mt-2 text-sm font-medium text-text-primary underline decoration-primary decoration-2 underline-offset-4"
                      >
                        What this service covers
                      </Link>
                    )}
                  </div>
                  <p className="text-text-secondary text-pretty">{item.covers}</p>
                  <div className="lg:text-right">
                    <p className="font-mono text-xl text-text-primary">
                      {item.from && <span className="mr-2 font-sans text-sm text-text-tertiary">from</span>}
                      {formatInr(item.amount)}
                    </p>
                    {item.id === "intro-call" ? (
                      <BookCallButton source="pricing" label="Pick a time" className="btn-primary mt-4" />
                    ) : (
                      <TrackedLink
                        href={
                          item.id === "consultation"
                            ? site.paidSessionPaymentLink || contactHref("A consultation call", item.title)
                            : contactHref("Pricing or a quote", item.title)
                        }
                        event="pricing_click"
                        props={{ item: item.id }}
                        className="btn-outline mt-4"
                      >
                        {item.id === "consultation"
                          ? site.paidSessionPaymentLink
                            ? "Pay and book"
                            : "Book this session"
                          : "Ask for a scope"}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </TrackedLink>
                    )}
                  </div>
                </li>
              ))}
              <li className="grid gap-x-10 gap-y-4 border-b border-border py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_12rem] lg:items-start">
                <h3 className="type-headline text-text-primary">Something else</h3>
                <p className="text-text-secondary text-pretty">
                  Work that spans several services, ongoing support, or anything not listed here. Tell me what you
                  need and I will send a written quote.
                </p>
                <div className="lg:text-right">
                  <p className="font-mono text-xl text-text-primary">Quote</p>
                  <Link href={contactHref("Pricing or a quote", "a custom quote")} className="btn-outline mt-4">
                    Ask for a quote
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="terms-heading" className="bg-surface py-16 sm:py-24">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <div>
              <h2 id="terms-heading" className="type-display-md text-text-primary">
                The terms, in short
              </h2>
              <p className="mt-5 text-text-secondary">
                The full versions are the{" "}
                <Link href="/terms" className="underline decoration-primary decoration-2 underline-offset-4">
                  Terms &amp; Conditions
                </Link>
                , the{" "}
                <Link href="/refund-policy" className="underline decoration-primary decoration-2 underline-offset-4">
                  Cancellation &amp; Refund Policy
                </Link>{" "}
                and the{" "}
                <Link href="/shipping-policy" className="underline decoration-primary decoration-2 underline-offset-4">
                  Shipping &amp; Delivery Policy
                </Link>
                .
              </p>
            </div>
            <dl className="border-t border-text-primary">
              {terms.map((term) => (
                <div key={term.title} className="border-b border-border py-5">
                  <dt className="type-card-title text-text-primary">{term.title}</dt>
                  <dd className="mt-2 max-w-2xl text-text-secondary">{term.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <CtaBand
          title="Not sure which of these you need?"
          text="Start with the free intro call, or send a note about what you run. I'll tell you what I'd look at first."
          primary={{ label: "Get in touch", href: "/contact" }}
          secondary={{ label: "Try the infrastructure checkup", href: "/tools/infrastructure-checkup" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Cloud and DevOps services by Ajay Autade",
          url: absoluteUrl("/pricing"),
          itemListElement: priceItems.map((item) => ({
            "@type": "Offer",
            name: item.title,
            description: item.covers,
            url: absoluteUrl(`/pricing#${item.id}`),
            priceCurrency: currency,
            price: item.amount,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: currency,
              ...(item.from ? { minPrice: item.amount } : { price: item.amount }),
            },
            seller: { "@id": `${site.url}/#person` },
          })),
        }}
      />
    </>
  );
}
