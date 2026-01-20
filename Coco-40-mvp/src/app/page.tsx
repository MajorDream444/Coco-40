import Link from "next/link";
import { appTitle } from "@/lib/brand";

export default function Home() {
  return (
    <main className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{appTitle()}</h1>
      <p className="text-sm opacity-80">
        MVP: Day viewer + check-in API stubs (Firestore/Supabase). PlantBasedMan branding locked.
      </p>

      <div className="flex gap-3">
        <Link className="underline" href="/day/1">
          Open Day 1
        </Link>
        <Link className="underline" href="/checkin">
          Submit Check-in
        </Link>
      </div>

      <div className="text-xs opacity-70">
        Tip: switch data source by changing fetch from /api/firestore/... to /api/supabase/...
      </div>
    </main>
  );
}
