import { PostCheckinBodySchema } from "@/contracts/coco40.api.contracts";
import { CheckinSchema } from "@/contracts/coco40.contracts";
import { ok, fail, parseJsonSafely } from "@/app/api/_shared/http";
import { requireUserId } from "@/app/api/_shared/auth";

export async function POST(req: Request) {
  const authedUserId = await requireUserId(req);
  const json = await parseJsonSafely(req);
  if (!json) return fail("bad_json", "Invalid JSON body");

  const body = PostCheckinBodySchema.parse(json);
  if (body.userId !== authedUserId) return fail("forbidden", "userId mismatch", undefined, 403);

  // MVP stub: validate + echo
  const saved = CheckinSchema.parse({ ...body, createdAt: new Date().toISOString() });
  return ok({ saved: true as const, checkin: saved });
}
