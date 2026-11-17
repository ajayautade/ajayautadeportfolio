import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { A, H2 } from "@/components/blog/Prose";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "What personal information ajayautade.com collects through the contact form, analytics and payments, why, who processes it, and how to have it corrected or deleted.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title={title}
      path="/privacy"
      lead="What this site collects, why, and who else handles it. The short version: only what you send me, and only to reply to you and do the work."
    >
      <p>
        This site, {site.url.replace("https://", "")}, is run by {site.legalName}, an individual Cloud and DevOps
        engineer based in {site.locality}, {site.region}, India. &ldquo;I&rdquo; and &ldquo;me&rdquo; below mean{" "}
        {site.legalName}. This policy covers the website and the services sold through it.
      </p>

      <H2 id="what-i-collect">What I collect</H2>
      <ul>
        <li>
          <strong>Contact form.</strong> Your name, email address, the topic you pick and the message you write.
        </li>
        <li>
          <strong>Call booking.</strong> Your name, email address, the time you ask for, your device&rsquo;s time
          zone, and any note you add.
        </li>
        <li>
          <strong>Email and calls.</strong> Anything you send me directly, including your phone number if you share
          it.
        </li>
        <li>
          <strong>Payments.</strong> When you pay for a call or a project, I receive your name, email, phone number,
          the amount, and a payment reference. Card numbers, UPI IDs and bank details are entered on the payment
          provider&rsquo;s page and never reach this site or me.
        </li>
        <li>
          <strong>Project access.</strong> If we work together, you may give me access to repositories or a cloud
          account. That access is used only for the agreed work.
        </li>
        <li>
          <strong>Analytics.</strong> Page views and a few actions (such as sending the contact form or finishing the
          checkup) are counted in aggregate, without cookies and without building a profile of you. The content of
          what you type is never included.
        </li>
      </ul>

      <H2 id="why">Why I collect it</H2>
      <ul>
        <li>To reply to your message and scope the work you asked about.</li>
        <li>To deliver the service you paid for, and to send invoices and receipts.</li>
        <li>To keep the records that tax and accounting rules require.</li>
        <li>To see which pages are read, so I know what to improve.</li>
      </ul>
      <p>I do not sell personal information, and I do not use it for advertising.</p>

      <H2 id="who-else">Who else handles it</H2>
      <p>A few services process data on my behalf. Each has its own privacy policy.</p>
      <ul>
        <li>
          <strong>Web3Forms</strong> delivers contact form submissions and call requests to my inbox.
        </li>
        <li>
          <strong>Vercel</strong> hosts the site and provides the cookieless page-view analytics.
        </li>
        <li>
          <strong>{legal.paymentProcessor}</strong> processes payments. Your payment details are handled under{" "}
          {legal.paymentProcessor}&rsquo;s own terms and privacy policy.
        </li>
        <li>My email provider stores the messages we exchange.</li>
      </ul>
      <p>I share information with authorities only when the law requires it.</p>

      <H2 id="cookies">Cookies and local storage</H2>
      <p>
        This site sets no advertising or tracking cookies. Your light or dark theme choice is saved in your
        browser&rsquo;s local storage so the site remembers it; it is not sent anywhere. The payment page, hosted by{" "}
        {legal.paymentProcessor}, may set cookies of its own.
      </p>

      <H2 id="retention">How long I keep it</H2>
      <ul>
        <li>Inquiries that do not become a project: deleted on request, or when they are no longer needed.</li>
        <li>Invoices and payment records: kept for as long as Indian tax law requires.</li>
        <li>
          Access to your repositories and cloud account: you control it, and I ask you to remove it at handover.
        </li>
      </ul>

      <H2 id="security">Security</H2>
      <p>
        The site is served over HTTPS. Access to client systems uses the narrowest permissions the work allows, and
        I do not keep copies of client credentials after handover. No method of storing or sending data is
        completely secure, so I cannot promise absolute security.
      </p>

      <H2 id="your-choices">Your choices</H2>
      <p>
        You can ask to see, correct or delete the personal information I hold about you, or withdraw consent to
        being contacted. Email <a href={`mailto:${site.email}`}>{site.email}</a> and I will reply within{" "}
        {legal.replyWorkingDays}. Records I am legally required to keep, such as invoices, are the exception.
      </p>

      <H2 id="children">Children</H2>
      <p>This site and its services are for businesses and working professionals. They are not directed at anyone under 18.</p>

      <H2 id="changes">Changes to this policy</H2>
      <p>
        If this policy changes, the new version is published on this page with a new date at the top. See also the{" "}
        <A href="/terms">Terms &amp; Conditions</A> and the <A href="/refund-policy">Cancellation &amp; Refund Policy</A>.
      </p>
    </LegalPage>
  );
}
