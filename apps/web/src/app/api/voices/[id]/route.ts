import { deleteVoices, voiceUser } from "@/lib/voices/server";

/** DELETE /api/voices/:id: deletes one of the family's recordings (its file too). */
export async function DELETE(request: Request, { params }: RouteContext<"/api/voices/[id]">) {
  const me = await voiceUser(request);
  if (!me) return Response.json({ error: "Sign in" }, { status: 401 });
  const { id } = await params;
  const r = await deleteVoices(me, id);
  return Response.json(r.body, { status: r.status, headers: { "Cache-Control": "no-store" } });
}
