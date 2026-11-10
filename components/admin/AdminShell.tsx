"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, LayoutDashboard, LogOut, Mail, Newspaper, Users } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/inbox", label: "Mail", icon: Mail },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
  { href: "/admin/donations", label: "Donations", icon: Heart },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-night text-ink md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-b border-gold/15 px-4 py-5 md:border-b-0 md:border-r md:px-5 md:py-8">
        <p className="font-data text-[10px] uppercase tracking-[0.28em] text-gold-bright">IEDF</p>
        <p className="mt-1 font-display text-2xl italic">Console</p>
        <nav className="mt-6 flex gap-2 overflow-x-auto md:mt-8 md:flex-col">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm md:rounded-xl ${
                  active ? "bg-gold/15 text-gold-pale" : "text-ink-muted hover:text-ink"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-6 flex items-center gap-2 text-sm text-ink-faint hover:text-gold-pale"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </aside>
      <div className="px-5 py-8 sm:px-8">{children}</div>
    </div>
  );
}
