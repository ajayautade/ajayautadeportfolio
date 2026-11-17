import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { A, H2 } from "@/components/blog/Prose";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

const title = "Shipping & Delivery Policy";
const description =
  "Ajay Autade sells services, not physical goods. How consultations and Cloud and DevOps project work are delivered online, and when.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/shipping-policy" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title={title}
      path="/shipping-policy"
      lead="Nothing is shipped. Everything I sell is a service, delivered online."
    >
      <p>
        {site.legalName} sells consultation calls and Cloud and DevOps engineering services. There are no physical
        products, so there is no shipping, no courier and no shipping charge.
      </p>

      <H2 id="how">How services are delivered</H2>
      <ul>
        <li>
          <strong>Calls</strong> happen over video at the time we agree. A paid working session is followed by a
          short written summary by email.
        </li>
        <li>
          <strong>Project work</strong> is delivered into your own Git repositories and your own cloud account, with
          documentation, and closed with a handover call.
        </li>
        <li>
          <strong>Reviews</strong> are delivered as a written findings document by email.
        </li>
      </ul>

      <H2 id="when">When</H2>
      <ul>
        <li>
          After you request an intro call or pay for a working session, I email you within {legal.replyWorkingDays} to agree a time for the call.
        </li>
        <li>
          Project dates are set in the written scope you accept before paying. Work starts on the date in that
          scope, once the advance is received and I have the access the work needs.
        </li>
        <li>If a date is going to move, I tell you as soon as I know, with the reason.</li>
      </ul>

      <H2 id="confirmation">Confirmation</H2>
      <p>
        You receive a payment confirmation by email from the payment provider, and a message from me confirming the
        booking or the project start.
      </p>

      <H2 id="where">Where</H2>
      <p>
        I work remotely from {site.locality}, India, with clients in any location. Services are delivered online
        only.
      </p>

      <H2 id="problems">If something has not arrived</H2>
      <p>
        If you have paid and have not heard from me within {legal.replyWorkingDays}, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.
        Cancellations and refunds are covered in the <A href="/refund-policy">Cancellation &amp; Refund Policy</A>.
      </p>
    </LegalPage>
  );
}
