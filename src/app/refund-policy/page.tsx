import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { A, H2 } from "@/components/blog/Prose";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

const title = "Cancellation & Refund Policy";
const description =
  "How to cancel a consultation or project with Ajay Autade, when a refund applies, and how long a refund takes to reach your original payment method.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/refund-policy" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title={title}
      path="/refund-policy"
      lead="When you can cancel, what you get back, and how long the money takes to arrive."
    >
      <p>
        This policy applies to paid working sessions and project work bought from {site.legalName} through this site.
        It is part of the <A href="/terms">Terms &amp; Conditions</A>.
      </p>

      <H2 id="consultations">Calls</H2>
      <p>
        The 30-minute intro call is free, so there is nothing to refund. If you cannot make it, reply to the
        confirmation email and we will find another time. The rest of this section is about the paid 60-minute
        working session.
      </p>
      <ul>
        <li>
          Cancel or reschedule at least {legal.consultationNoticeHours} hours before the call and you can choose a
          full refund or a new time.
        </li>
        <li>
          With less than {legal.consultationNoticeHours} hours&rsquo; notice, or if you do not join the call, the
          fee is not refunded. I will offer one rescheduled slot where I can.
        </li>
        <li>If I have to cancel and we cannot agree a new time, you get a full refund.</li>
      </ul>

      <H2 id="projects">Project work</H2>
      <ul>
        <li>
          <strong>Before work starts:</strong> cancel for any reason and the advance is refunded in full.
        </li>
        <li>
          <strong>After work starts:</strong> you can stop the project at any time. The refund is the advance minus
          the value of the work already done, measured against the written scope. I hand over everything completed
          up to that point.
        </li>
        <li>
          <strong>After handover:</strong> the work is delivered, so no refund applies. If something in the written
          scope was not delivered, tell me and I will fix it at no extra cost.
        </li>
        <li>
          <strong>If I cannot complete the work:</strong> I refund the part of the scope that was not delivered.
        </li>
      </ul>

      <H2 id="not-refundable">What is not refundable</H2>
      <p>
        Costs paid to third parties on your behalf, such as cloud provider charges, domains or licences, are not
        refundable by me. Those are billed to you by the provider.
      </p>

      <H2 id="how-to-request">How to cancel or ask for a refund</H2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>{" "}
        with your name, the date of payment and the payment reference. I reply within {legal.replyWorkingDays}.
      </p>

      <H2 id="timeline">When the refund arrives</H2>
      <p>
        Approved refunds are sent to the original payment method through {legal.paymentProcessor}. They are credited
        within {legal.refundWorkingDays}; the exact time depends on your bank or card issuer.
      </p>

      <H2 id="failed-payments">Failed or duplicate payments</H2>
      <p>
        If money left your account but the payment failed, or you were charged twice, send me the payment reference.
        Duplicate charges are refunded in full on the same timeline.
      </p>
    </LegalPage>
  );
}
