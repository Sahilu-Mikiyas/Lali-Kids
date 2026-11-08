/** Ge'ez numerals for 1–99 (there is no zero). Plain TypeScript, safe in the browser. */
export function geez(n: number): string {
  const ones = ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
  const tens = ["", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];
  if (!Number.isInteger(n) || n < 1 || n > 99) return String(n);
  return tens[Math.floor(n / 10)] + ones[n % 10];
}
