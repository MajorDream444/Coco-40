import { getBrand } from "@/lib/brand";

async function fetchDay(dayNumber: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/firestore/day/${dayNumber}`, { cache: "no-store" });
  return res.json();
}

export default async function DayPage({ params }: { params: { dayNumber: string } }) {
  const b = getBrand();
  const data = await fetchDay(params.dayNumber);
  const day = data?.data?.day;

  return (
    <main className="min-h-screen p-6 space-y-4">
      <div className="text-sm opacity-70">
        {b.brand.publicName} — {b.program.series}
      </div>
      <h1 className="text-2xl font-semibold">
        {b.program.name}: Day {params.dayNumber}
      </h1>

      {!day ? (
        <p>Day not found.</p>
      ) : (
        <div className="space-y-3">
          <h2 className="text-xl font-medium">{day.title}</h2>
          <p className="opacity-90">{day.daily_message}</p>
          <div className="p-4 rounded-lg border">
            <div className="font-medium">Journal Prompt</div>
            <div className="opacity-90">{day.journal_prompt}</div>
          </div>
        </div>
      )}
    </main>
  );
}
