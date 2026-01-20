import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function getArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function requireEnv(key) {
  const val = process.env[key];
  if (!val) throw new Error(`Missing env: ${key}`);
  return val;
}

async function main() {
  const fileArg = getArg("--file") || getArg("-f");
  if (!fileArg) throw new Error("Missing --file <path>");

  const contentKey = getArg("--key") || "book1_dayObjects";

  const url = requireEnv("SUPABASE_URL");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const sb = createClient(url, key, { auth: { persistSession: false } });

  const fullPath = path.resolve(process.cwd(), fileArg);
  const json = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  const { data, error } = await sb
    .from("content")
    .upsert({ key: contentKey, json, updated_at: new Date().toISOString() }, { onConflict: "key" })
    .select("key, updated_at")
    .single();

  if (error) throw error;

  console.log(
    JSON.stringify(
      {
        ok: true,
        target: `content.key=${contentKey}`,
        row: data,
        daysCount: Array.isArray(json?.days) ? json.days.length : null
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
