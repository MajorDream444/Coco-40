import { z } from "zod";

export const BrandConfigSchema = z
  .object({
    brand: z.object({
      publicName: z.literal("PlantBasedMan"),
      voice: z.enum(["calm_masculine_grounded", "neutral", "coach"]),
      ethos: z.array(z.string().min(1)).min(1),
    }),
    program: z.object({
      name: z.string().min(1),
      shortName: z.string().min(1),
      series: z.string().min(1),
      tagline: z.string().min(1),
    }),
    legal: z.object({
      entityName: z.null(),
      showEntityInUI: z.literal(false),
    }),
    copyRules: z.object({
      defaultBranding: z.string().min(1),
      allowLegalEntityReference: z.literal(false),
      requireExplicitOverrideForLegal: z.literal(true),
    }),
  })
  .strict();

export type BrandConfig = z.infer<typeof BrandConfigSchema>;
