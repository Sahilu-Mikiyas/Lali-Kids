import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Lali collects, uses and protects information about families and children.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="1 November 2026">
      <p>
        Lali is a reading service for children aged 3 to 9, used with their parents or guardians. We collect as little as we
        can, we never sell it, and we never show advertising. This policy explains what we collect and why.
      </p>

      <h2>Who we are</h2>
      <p>
        Lali is operated from Addis Ababa, Ethiopia. Questions about this policy can be sent to the contact address shown on
        our website.
      </p>

      <h2>Accounts belong to grown-ups</h2>
      <p>
        Only a parent or guardian can create a Lali account. Children use Lali through that account. We do not ask children
        for an email address, phone number or any way to contact them.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <b>From the grown-up:</b> email address (and phone number if you choose to sign in that way), and the name you
          give the account.
        </li>
        <li>
          <b>About each child you add:</b> a first name or nickname, an age band (such as 3 to 5), a preferred language and
          the character they picked. We do not ask for full names, photos, dates of birth or schools.
        </li>
        <li>
          <b>Reading activity:</b> which stories and books were opened and finished, pages read, stars earned and the time
          they were read. This powers stars, the bedtime limit and the weekly note to you.
        </li>
        <li>
          <b>Protection records:</b> when a protected book page is shown, we record the account, the device and the network
          address. This lets us limit copying and trace pages that are shared without permission.
        </li>
        <li>
          <b>Payments:</b> the plan, amount and payment reference. Card, Telebirr and bank details are handled by our payment
          provider, Chapa, and never reach us.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To run your account, show your child&rsquo;s progress and enforce the bedtime limit you set.</li>
        <li>To send you sign-in emails, receipts and, if you want it, the weekly reading note.</li>
        <li>To protect the books our authors and publishers trust us with.</li>
        <li>To improve Lali using totals and trends, not by profiling individual children.</li>
      </ul>
      <p>We do not use children&rsquo;s information for advertising, and we do not sell or rent anyone&rsquo;s information.</p>

      <h2>Watermarks on book pages</h2>
      <p>
        Protected book pages show a faint mark with part of the account&rsquo;s email or phone number and the date. Only the
        last few characters are shown. The mark exists so that a copied page can be traced back to the account it came from.
      </p>

      <h2>Who we share it with</h2>
      <p>We use a small number of service providers, each only for the job described:</p>
      <ul>
        <li>Supabase, to store accounts and reading data and to send sign-in emails.</li>
        <li>Render, to run the website.</li>
        <li>Chapa, to take payments.</li>
      </ul>
      <p>
        These providers may store data outside Ethiopia. We share information with authorities only when the law requires it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep account and reading data while your account is open. Page-view protection records are kept for up to 12
        months. When you delete your account, we delete your family&rsquo;s data within 30 days, except payment records we
        must keep by law.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>See, correct or delete your children&rsquo;s profiles at any time in the Grown-ups&rsquo; corner.</li>
        <li>Ask us for a copy of your family&rsquo;s data, or ask us to delete your account.</li>
        <li>Turn off the weekly email at any time.</li>
      </ul>
      <p>
        We aim to meet Ethiopia&rsquo;s personal data protection law and international standards for children&rsquo;s privacy,
        such as COPPA in the United States and the GDPR in Europe, for families who use Lali from abroad.
      </p>

      <h2>Security</h2>
      <p>
        Data is encrypted in transit, each family can only see its own records, and original book files are kept in private
        storage that browsers cannot reach. No system is perfect; if something goes wrong we will tell affected families
        promptly.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy in a way that matters, we will tell you by email or in the Grown-ups&rsquo; corner first.</p>
    </LegalPage>
  );
}
