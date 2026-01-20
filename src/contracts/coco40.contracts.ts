import { z } from "zod";

export const SymptomKeySchema = z.enum([
  "headache",
  "dizziness",
  "irritability",
  "cravings",
  "fatigue",
  "weakness",
  "palpitations",
  "confusion",
  "sleep_changes",
  "low_mood",
  "restlessness",
  "bloating",
  "fainting"
]);
export type SymptomKey = z.infer<typeof SymptomKeySchema>;

export const ChecklistFocusKeySchema = z.enum([
  "hydration",
  "gentle_walk",
  "walking",
  "movement",
  "light_movement",
  "rest",
  "early_rest",
  "no_stimulation",
  "simplicity",
  "presence",
  "breath",
  "journal",
  "journaling",
  "colon_support",
  "silence",
  "reflection",
  "refeed_planning",
  "calm_completion",
  "consistency",
  "routine"
]);

export const PhaseIdSchema = z.enum(["P1", "P2", "P3", "P4"]);
export type PhaseId = z.infer<typeof PhaseIdSchema>;

export const CheckinSchema = z.object({
  userId: z.string().min(1),
  checkinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dayNumber: z.number().int().min(1).max(40),
  phaseId: PhaseIdSchema,
  hydrationMlToday: z.number().int().min(0).max(10000).default(0),
  symptoms: z.array(SymptomKeySchema).default([]),
  journalText: z.string().max(12000).optional(),
  createdAt: z.string().optional()
});
export type Checkin = z.infer<typeof CheckinSchema>;

export const DayObjectSchema = z.object({
  day: z.number().int().min(1).max(40),
  phase: z.string().min(1),
  title: z.string().min(1),
  daily_message: z.string().min(1),
  journal_prompt: z.string().min(1),
  checklist_focus: z.array(ChecklistFocusKeySchema).default([]),
  symptom_guidance: z.record(SymptomKeySchema, z.string().min(1)).default({})
});

export const DayFileSchema = z.object({
  file: z.string().min(1),
  series: z.string().min(1),
  module: z.string().min(1),
  defaults: z
    .object({
      golden_rule: z.string().optional(),
      hydration_note: z.string().optional(),
      movement_note: z.string().optional(),
      safety_note: z.string().optional()
    })
    .optional(),
  days: z.array(DayObjectSchema)
});
export type DayFile = z.infer<typeof DayFileSchema>;

export function getPhaseIdForDay(day: number): PhaseId {
  if (day <= 10) return "P1";
  if (day <= 20) return "P2";
  if (day <= 30) return "P3";
  return "P4";
}
