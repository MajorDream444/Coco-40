import fs from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function initFirebaseAdmin() {
  if (getApps().length) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey })
    });
    return;
  }

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      "Set FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY or GOOGLE_APPLICATION_CREDENTIALS."
    );
  }

  initializeApp();
}

async function main() {
  const fileArg = getArg("--file") || getArg("-f");
  if (!fileArg) throw new Error("Missing --file <path-to-json>");

  const docId = process.env.FIRESTORE_CONTENT_DOC_ID || "book1";
  const fullPath = path.resolve(process.cwd(), fileArg);
  const raw = fs.readFileSync(fullPath, "utf8");
  const json = JSON.parse(raw);

  initFirebaseAdmin();
  const db = getFirestore();

  const ref = db.collection("content").doc(docId);
  const payload = {
    dayObjects: json,
    dayObjectsVersion: json?.file || "unknown",
    updatedAt: new Date().toISOString()
  };

  await ref.set(payload, { merge: true });

  console.log(
    JSON.stringify(
      {
        ok: true,
        target: `content/${docId}`,
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
