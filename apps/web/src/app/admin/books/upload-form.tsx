"use client";

import { useActionState } from "react";

import { uploadBook, type UploadResult } from "./actions";

const field = "w-full rounded-xl border-2 border-line px-3 py-2 outline-none focus:border-blue";

export function UploadForm() {
  const [result, action, pending] = useActionState<UploadResult | null, FormData>(uploadBook, null);
  return (
    <form action={action} className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
      <label className="block space-y-1">
        <span className="font-bold">PDF file</span>
        <input id="pdf" name="pdf" type="file" accept="application/pdf" required className={field} />
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Title</span>
        <input id="title" name="title" required className={field} />
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Title in Amharic</span>
        <input id="title_am" name="title_am" className={`${field} font-ethiopic`} />
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Author</span>
        <input id="author" name="author" className={field} />
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Short description</span>
        <textarea id="description" name="description" rows={2} className={field} />
      </label>
      <div className="grid grid-cols-3 gap-3">
        <label className="block space-y-1">
          <span className="font-bold">Language</span>
          <select id="language" name="language" className={field} defaultValue="en">
            <option value="en">English</option>
            <option value="am">Amharic</option>
            <option value="bilingual">Both</option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="font-bold">Ages</span>
          <select id="age_band" name="age_band" className={field} defaultValue="3-5">
            <option>3-5</option>
            <option>6-7</option>
            <option>8-9</option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="font-bold">World</span>
          <select id="category" name="category" className={field} defaultValue="story">
            <option value="story">Story</option>
            <option value="english">English</option>
            <option value="maths">Maths</option>
            <option value="values">Values</option>
          </select>
        </label>
      </div>
      <label className="flex items-center gap-2 font-bold">
        <input id="is_free" name="is_free" type="checkbox" className="h-5 w-5" /> Free sample (readable without a plan)
      </label>
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? "Uploading and rendering pages…" : "Upload book"}
      </button>
      {result && (
        <p className={`rounded-xl p-3 ${result.ok ? "bg-teal/10 text-teal" : "bg-coral/10 text-coral"}`}>
          {result.ok ? `${result.title} is ready: ${result.pageCount} pages.` : result.error}
        </p>
      )}
    </form>
  );
}
