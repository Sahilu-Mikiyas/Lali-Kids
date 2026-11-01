import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The rules for using Lali, plans and payments, and how books may be used.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="1 November 2026">
      <p>
        These terms are the agreement between Lali and the parent or guardian who opens an account. By creating an account or
        paying for a plan, you agree to them.
      </p>

      <h2>Who can use Lali</h2>
      <p>
        Accounts are for adults aged 18 or over who are parents, guardians or teachers. Children may use Lali through an adult&rsquo;s
        account and under that adult&rsquo;s supervision. You are responsible for activity on your account.
      </p>

      <h2>Plans and payments</h2>
      <ul>
        <li>Plans are priced in Ethiopian birr per month, per family. Current prices are shown on the plans page.</li>
        <li>New families can try a plan free for 7 days, once per family.</li>
        <li>
          Payments are made through Chapa (Telebirr, CBE Birr, cards and other methods it offers). Each payment covers 30 days
          of access. Plans do not renew automatically; we will remind you before your access ends.
        </li>
        <li>
          If a payment fails or access ends, your family keeps its account, children&rsquo;s profiles and stars; paid books
          simply lock until you renew.
        </li>
        <li>
          If you are charged in error or cannot use Lali because of a fault on our side, contact us and we will put it right,
          including a refund where appropriate.
        </li>
      </ul>

      <h2>The books and stories are licensed, not sold</h2>
      <p>
        A plan gives your family a personal, non-transferable right to read Lali&rsquo;s stories and books on Lali&rsquo;s website
        and apps. It does not give you ownership of any book or the right to copy it. You agree not to:
      </p>
      <ul>
        <li>download, screenshot, record, print or copy books or pages, or try to get around our protections;</li>
        <li>share your account, or pages from it, with people outside your household;</li>
        <li>use automated tools to collect pages or content.</li>
      </ul>
      <p>
        Book pages carry a watermark identifying the account they were shown to. If pages from your account are shared, we may
        suspend the account, and authors and publishers may take action to protect their work.
      </p>

      <h2>Devices and fair use</h2>
      <p>
        Each plan allows a set number of children and devices, shown on the plans page. We may limit unusual activity, such as
        very fast page requests, to protect the service and our authors.
      </p>

      <h2>What you can expect from us</h2>
      <ul>
        <li>No advertising in the children&rsquo;s area, ever.</li>
        <li>Content made for children aged 3 to 9, reviewed before it is published.</li>
        <li>A bedtime limit you control, and clear information about what your child read.</li>
      </ul>
      <p>
        We work hard to keep Lali available, but we cannot promise it will never be interrupted, and we may improve or change
        features over time.
      </p>

      <h2>Ending your account</h2>
      <p>
        You can stop using Lali at any time and ask us to delete your account. We may suspend or close accounts that break
        these terms, after telling you why where we can.
      </p>

      <h2>Law</h2>
      <p>These terms are governed by the laws of the Federal Democratic Republic of Ethiopia.</p>

      <h2>Changes</h2>
      <p>If we change these terms in a way that matters, we will tell you before the change takes effect.</p>
    </LegalPage>
  );
}
