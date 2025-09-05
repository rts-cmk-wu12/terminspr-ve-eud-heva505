"use client";
// Importer / استيراد

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SearchIcon, CalendarIcon } from "@/components/LDIcons";
// Komponent / المكوّن الرئيسي

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (base) =>
    pathname === base || pathname.startsWith(base + "/");

  // UI
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto w-full max-w-[411px]">
        <div
          className="
        mb-[calc(env(safe-area-inset-bottom))]
        bg-white/95 backdrop-blur-md
        px-9 py-7
        rounded-none   
      "
        >
          <ul className="flex items-center justify-between gap-8">
            <li>
              <Link href="/activities" aria-label="Aktiviteter">
                <HomeIcon active={isActive("/activities")} />
              </Link>
            </li>
            <li>
              <Link href="/search" aria-label="Søg">
                <SearchIcon active={isActive("/search")} />
              </Link>
            </li>
            <li>
              <Link href="/calendar" aria-label="Kalender">
                <CalendarIcon active={isActive("/calendar")} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
