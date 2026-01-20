import { z } from "zod";
import { CheckinSchema, DayObjectSchema } from "./coco40.contracts";

export const ApiErrorSchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  details: z.record(z.string(), z.any()).optional(),
});

export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({ ok: z.literal(true), data: dataSchema });

export const ApiFailureSchema = z.object({ ok: z.literal(false), error: ApiErrorSchema });

export const PostCheckinBodySchema = CheckinSchema.omit({ createdAt: true });
export const PostCheckinResponseSchema = z.union([
  ApiSuccessSchema(z.object({ saved: z.literal(true), checkin: CheckinSchema })),
  ApiFailureSchema,
]);

export const GetDayResponseSchema = z.union([
  ApiSuccessSchema(z.object({ day: DayObjectSchema })),
  ApiFailureSchema,
]);
