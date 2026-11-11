import type { Metadata } from "next";
import { adminAuthed } from "@/lib/admin/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin · IEDF",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await adminAuthed();
  if (!authed) return <AdminLogin />;
  return <AdminShell>{children}</AdminShell>;
}
