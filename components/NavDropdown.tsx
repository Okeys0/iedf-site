"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type DropdownItem = {
  href: string;
  label: string;
};

type NavDropdownProps = {
  label: string;
  /** Where clicking the label itself navigates to */
  href: string;
  items: DropdownItem[];
};

/**
 * The label is a real link (clicking "About" navigates to /about, same as
 * any other nav item). The small arrow next to it is a separate toggle
 * that reveals the dropdown of sub-pages without navigating — click,
 * hover (desktop convenience), outside-click, and Escape all work as
 * expected for the dropdown panel itself.
 */
export function NavDropdown({ label, href, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-0.5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={href} className="text-[var(--color-loam)] hover:text-[var(--color-forest)]">
        {label}
      </Link>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Show ${label} submenu`}
        className="p-0.5 text-[var(--color-loam)] hover:text-[var(--color-forest)]"
      >
        <svg
          aria-hidden="true"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-[7px] border border-black/10 bg-white py-1.5 shadow-lg"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-[var(--color-loam)] hover:bg-[var(--color-forest-tint)] hover:text-[var(--color-forest)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
