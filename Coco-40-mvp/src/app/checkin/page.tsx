"use client";

import { useState } from "react";
import { getPhaseIdForDay } from "@/contracts/coco40.contracts";
import { getBrand } from "@/lib/brand";

export default function CheckinPage() {
  const b = getBrand();
  const [dayNumber, setDayNumber] = useState(1);
  const [hydration, setHydration] = useState(1500);
  const [journalText, setJournalText] = useState("");
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setOut(null);

    const payload = {
      userId: "demo-user",
      checkinDate: new Date().toISOString().slice(0, 10),
      dayNumber,
      phaseId: getPhaseIdForDay(dayNumber),
      hydrationMlToday: hydration,
      symptoms: [] as string[],
      journalText
    };

    const res = await fetch("/api/firestore/checkins", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": "demo-user" },
      body: JSON.stringify(payload)
    });

    setOut(await res.json());
    setLoading(false);
  }

  return (
    <main className="min-h-screen p-6 space-y-4">
      <div className="text-sm opacity-70">
        {b.brand.publicName} — {b.program.series}
      </div>
      <h1 className="text-2xl font-semibold">Check-in</h1>

      <label className="block">
        <div className="text-sm opacity-80">Day</div>
        <input
          className="border rounded p-2 w-40"
          type="number"
          min={1}
          max={40}
          value={dayNumber}
          onChange={(e) => setDayNumber(Number(e.target.value))}
        />
      </label>

      <label className="block">
        <div className="text-sm opacity-80">Hydration (ml)</div>
        <input
          className="border rounded p-2 w-40"
          type="number"
          min={0}
          max={10000}
          value={hydration}
          onChange={(e) => setHydration(Number(e.target.value))}
        />
      </label>

      <label className="block">
        <div className="text-sm opacity-80">Journal</div>
        <textarea
          className="border rounded p-2 w-full max-w-xl h-32"
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
        />
      </label>

      <button
        className="border rounded px-4 py-2 disabled:opacity-50"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {out && (
        <pre className="text-xs border rounded p-3 overflow-auto max-w-xl">
          {JSON.stringify(out, null, 2)}
        </pre>
      )}
    </main>
  );
}
