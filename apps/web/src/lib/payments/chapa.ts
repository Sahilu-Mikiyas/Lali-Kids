import "server-only";

/**
 * Chapa (chapa.co): Ethiopian payments with Telebirr, CBE Birr, M-Pesa and cards.
 * We send the parent to Chapa's hosted checkout, then confirm every payment by
 * asking Chapa's verify endpoint ourselves, never by trusting what the browser
 * or a webhook says.
 */
const API = "https://api.chapa.co/v1";

// CHAPA_SECRET_KEY is the documented name; the others catch common slips when it is added by hand.
const KEY_NAMES = ["CHAPA_SECRET_KEY", "CHAPA_SECRET", "CHAPA_KEY", "CHAPA_API_KEY", "CHAPA_TEST_SECRET_KEY"];

function findKey(): string | null {
  for (const name of KEY_NAMES) {
    const value = process.env[name]?.trim().replace(/^["']|["']$/g, "");
    if (value) return value;
  }
  return null;
}

export function chapaConfigured(): boolean {
  return findKey() !== null;
}

/** Names (never values) of Chapa-looking settings the server can see, for diagnosing setup. */
export function chapaSettingNames(): string[] {
  return Object.keys(process.env).filter((k) => /chapa/i.test(k));
}

function key(): string {
  const k = findKey();
  if (!k) throw new Error("Missing CHAPA_SECRET_KEY. See docs/PAYMENTS.md.");
  return k;
}

export type CheckoutInput = {
  txRef: string;
  amountEtb: number;
  email: string;
  firstName: string;
  lastName: string;
  callbackUrl: string;
  returnUrl: string;
  title: string; // Chapa allows up to 16 characters
  description: string; // letters, numbers, spaces, dots, hyphens and underscores only
};

/** Starts a hosted checkout and returns the page to send the parent to. */
export async function createCheckout(input: CheckoutInput): Promise<string> {
  const res = await fetch(`${API}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: String(input.amountEtb),
      currency: "ETB",
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      tx_ref: input.txRef,
      callback_url: input.callbackUrl,
      return_url: input.returnUrl,
      customization: {
        title: input.title.slice(0, 16),
        description: input.description.replace(/[^A-Za-z0-9 ._-]/g, "").slice(0, 50),
      },
    }),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => null)) as { status?: string; message?: unknown; data?: { checkout_url?: string } } | null;
  const url = body?.data?.checkout_url;
  if (!res.ok || body?.status !== "success" || !url) {
    const message = typeof body?.message === "string" ? body.message : JSON.stringify(body?.message ?? res.status);
    throw new Error(`Chapa could not start the payment: ${message}`);
  }
  return url;
}

export type Verified = { paid: boolean; amountEtb: number; reference: string | null };

/** Asks Chapa whether a payment really succeeded and for how much. */
export async function verifyPayment(txRef: string): Promise<Verified> {
  const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(txRef)}`, {
    headers: { Authorization: `Bearer ${key()}` },
    cache: "no-store",
  });
  const body = (await res.json().catch(() => null)) as {
    status?: string;
    data?: { status?: string; amount?: number | string; currency?: string; reference?: string; tx_ref?: string } | null;
  } | null;
  const d = body?.data;
  const paid = res.ok && body?.status === "success" && d?.status === "success" && d?.currency === "ETB" && d?.tx_ref === txRef;
  return { paid, amountEtb: Number(d?.amount ?? 0), reference: d?.reference ?? null };
}
