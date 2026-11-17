import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { A, H2 } from "@/components/blog/Prose";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

const title = "Terms & Conditions";
const description =
  "Terms for using ajayautade.com and for buying Cloud and DevOps services from Ajay Autade: scope, payment, ownership of work, client responsibilities and liability.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title={title}
      path="/terms"
      lead="The terms for using this site and for buying a consultation or project from me. Plain language, and short enough to read."
    >
      <p>
        This site is operated by {site.legalName}, an individual Cloud and DevOps engineer based in {site.locality},{" "}
        {site.region}, India (&ldquo;I&rdquo;, &ldquo;me&rdquo;). By using the site or paying for a service, you agree
        to these terms. If you do not agree, please do not use the site or buy a service.
      </p>

      <H2 id="services">What I sell</H2>
      <p>
        Video calls (a free intro call and a paid working session) and Cloud and DevOps engineering work: AWS infrastructure, CI/CD pipelines, Docker and
        Kubernetes, Terraform and Ansible, monitoring, and infrastructure reviews. The <A href="/services">services</A>{" "}
        page describes each one and the <A href="/pricing">pricing</A> page lists current prices.
      </p>

      <H2 id="scope">Scope of work</H2>
      <p>
        The intro call and the working session are the calls described on the pricing page. For a project, I send a written scope before any
        payment: what I will do, what I need from you, what you receive, the price and the expected dates. That
        document, once you accept it, is the agreement for the project. Work outside it is quoted separately.
      </p>

      <H2 id="payment">Prices and payment</H2>
      <ul>
        <li>Prices are in US Dollars (USD). Taxes, if applicable, are shown on the invoice.</li>
        <li>
          &ldquo;From&rdquo; prices are starting points. The final amount is fixed in the written scope before you
          pay anything.
        </li>
        <li>The 30-minute intro call is free. A 60-minute working session is paid in full when you book it.</li>
        <li>
          A project is paid {legal.advancePercent}% in advance and the remaining {100 - legal.advancePercent}% at
          handover, unless the written scope says otherwise.
        </li>
        <li>
          Payments are processed by {legal.paymentProcessor}. Cloud provider bills, domain fees and other
          third-party costs are yours and are not included in my price.
        </li>
      </ul>

      <H2 id="cancellation">Cancellation and refunds</H2>
      <p>
        These are covered in the <A href="/refund-policy">Cancellation &amp; Refund Policy</A>, which is part of
        these terms. How and when work is delivered is in the <A href="/shipping-policy">Shipping &amp; Delivery Policy</A>.
      </p>

      <H2 id="your-part">Your part</H2>
      <ul>
        <li>Give me the access and information the work needs, and make sure you are entitled to give it.</li>
        <li>Keep your own backups before I change anything in a live environment.</li>
        <li>Review and reply within a reasonable time. Dates in the scope move if I am waiting on you.</li>
      </ul>

      <H2 id="ownership">Who owns the work</H2>
      <p>
        You do. I work in your Git repositories and your cloud account, and once the work is paid for in full, the
        code, configuration and documents I wrote for you are yours. Open-source tools and libraries stay under
        their own licences. I may reuse general know-how and non-confidential patterns in other work.
      </p>

      <H2 id="confidentiality">Confidentiality</H2>
      <p>
        I keep what I learn about your systems and business confidential, and I do not name you as a client or
        describe the work publicly without your written permission.
      </p>

      <H2 id="no-guarantees">No guaranteed outcomes</H2>
      <p>
        I do the work with reasonable skill and care, and I tell you what I find. I do not promise a specific cost
        saving, uptime figure or performance number, because those depend on your application, your traffic and
        services outside my control.
      </p>

      <H2 id="liability">Liability</H2>
      <p>
        To the extent the law allows, my total liability for any claim connected to a service is limited to the
        amount you paid me for that service. I am not liable for indirect or consequential loss, such as lost
        profit or lost data, or for outages and charges caused by third-party providers.
      </p>

      <H2 id="website">Using this website</H2>
      <p>
        The articles, case studies and tools on this site are general information, shared as they are. Check
        commands and configuration against your own environment before running them. The site&rsquo;s text and
        design belong to me; code samples in the articles may be reused. Links to other sites are provided for
        convenience and I am not responsible for their content.
      </p>

      <H2 id="law">Governing law</H2>
      <p>
        These terms are governed by the laws of {legal.governingLaw}. Any dispute is subject to the courts at{" "}
        {legal.jurisdiction}.
      </p>

      <H2 id="changes">Changes</H2>
      <p>
        I may update these terms. The version on this page on the day you pay applies to that purchase. Questions:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
