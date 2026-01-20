import dayFile from "@/content/coco40_day_objects.json";
import { DayFileSchema } from "@/contracts/coco40.contracts";
import { ok, fail } from "@/app/api/_shared/http";

export async function GET(_: Request, ctx: { params: { dayNumber: string } }) {
  const parsed = DayFileSchema.parse(dayFile);
  const dayNumber = Number(ctx.params.dayNumber);
  const day = parsed.days.find((d) => d.day === dayNumber);
  if (!day) return fail("not_found", "Day not found", { dayNumber }, 404);
  return ok({ day });
}
