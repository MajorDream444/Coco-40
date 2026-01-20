import config from "@/config/brand.config.json";
import { BrandConfigSchema } from "@/contracts/brand.contracts";

const BRAND = BrandConfigSchema.parse(config);

export function getBrand() {
  return BRAND;
}

export function appTitle() {
  return `${BRAND.brand.publicName} — ${BRAND.program.series}`;
}
