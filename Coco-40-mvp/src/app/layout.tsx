import "./globals.css";
import type { Metadata } from "next";
import { appTitle } from "@/lib/brand";

export const metadata: Metadata = {
  title: appTitle(),
  description: "PlantBasedMan — Coco Protocol (Coco Water 40) MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
