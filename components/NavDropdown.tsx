"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type DropdownItem = {
  href: string;
  label: string;
};

type NavDropdownProps = {
  label: string;
  items: DropdownItem[];
};

/**
 * Click-to-open (and hover-to-open, as a desktop convenience) nav dropdown.
 * Closes on outside click, Escape, or selecting an item — standard menu
 * behavior, keyboard accessible via aria-expanded/aria-haspopup/role=menu.
 */
export function NavDropdown({ label, items }: NavDropdownProps) {
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
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-[var(--color-loam)] hover:text-[var(--color-forest)]"
      >
        {label}
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
