import { AGE_BANDS, CATEGORIES } from "@/content/stories";

export const field = "w-full rounded-xl border-2 border-line px-3 py-2 outline-none focus:border-blue";

type Values = { title_en?: string; title_am?: string | null; category?: string; age_bands?: string[]; color?: string; is_free?: boolean; pack?: string | null };

/** The packs in the studio's own (English) words. */
const PACK_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Follow the world (Fidel → Fidel, Maths → Numbers, English → English, others → Story Garden)" },
  { value: "story", label: "Story Garden (Reader and up)" },
  { value: "fidel", label: "Fidel (Learner and VIP)" },
  { value: "numbers", label: "Numbers (Learner and VIP)" },
  { value: "english", label: "English (Learner and VIP)" },
];

/** Title, world, pack, age groups, colour and free/paid: shared by "new story" and the editor. */
export function StoryFields({ v = {} }: { v?: Values }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block space-y-1">
        <span className="font-bold">Title (English)</span>
        <input name="title_en" required maxLength={120} defaultValue={v.title_en} className={field} />
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Title (Amharic)</span>
        <input name="title_am" maxLength={120} defaultValue={v.title_am ?? ""} className={`${field} font-ethiopic`} />
      </label>
      <label className="block space-y-1">
        <span className="font-bold">World</span>
        <select name="category" defaultValue={v.category ?? "Bedtime"} className={field}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Pack</span>
        <select name="pack" defaultValue={v.pack ?? ""} className={field} data-studio-pack="">
          {PACK_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="block text-sm text-muted">Which plan opens it. Free samples open to everyone whatever their pack.</span>
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Book colour</span>
        <input name="color" type="color" defaultValue={v.color ?? "#2B3A8C"} className="h-11 w-full rounded-xl border-2 border-line" />
      </label>
      <fieldset className="space-y-1">
        <legend className="font-bold">Age groups</legend>
        <div className="flex flex-wrap gap-3">
          {AGE_BANDS.map((b) => (
            <label key={b} className="flex items-center gap-2">
              <input type="checkbox" name="age_bands" value={b} defaultChecked={(v.age_bands ?? ["3-5"]).includes(b)} className="h-5 w-5" />
              {b}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2 self-end font-bold">
        <input type="checkbox" name="is_free" defaultChecked={v.is_free} className="h-5 w-5" /> Free sample (readable without a plan)
      </label>
    </div>
  );
}

export function Message({ text }: { text?: string | string[] }) {
  if (typeof text !== "string" || !text) return null;
  return (
    <p role="status" className="rounded-2xl bg-sky-soft p-4 font-bold">
      {text}
    </p>
  );
}
