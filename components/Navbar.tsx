"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/config/crown";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="bg-[#0e1621] text-white px-8 py-4 flex items-center gap-6 text-sm font-bold relative z-50">
      {navItems.map(({ href, label, icon, dropdown }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        const isDropdownOpen = openDropdown === label;

        return (
          <div key={label} className="relative group">
            {/* TOP LEVEL MENU */}
            {dropdown ? (
              <button
                onClick={() => toggleDropdown(label)}
                className={`flex items-center gap-1 relative pb-1 transition duration-200 hover:text-yellow-400 ${
                  isActive
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-yellow-400"
                    : "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-yellow-400 group-hover:after:w-full group-hover:after:transition-all"
                }`}
              >
                <Image src={icon} alt={icon} height={15} width={15}></Image>
                <span>{label.toUpperCase()}</span>
              </button>
            ) : (
              <Link
                href={href}
                className={`flex items-center gap-1 relative pb-1 transition duration-200 hover:text-yellow-400 ${
                  isActive
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-yellow-400"
                    : "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-yellow-400 group-hover:after:w-full group-hover:after:transition-all"
                }`}
              >
                <Image src={icon} alt={icon} height={15} width={15}></Image>
                <span>{label.toUpperCase()}</span>
              </Link>
            )}

            {/* DROPDOWN */}
            {dropdown && isDropdownOpen && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute top-full left-0 mt-2 w-56 bg-[#0e1621] shadow-lg rounded-md py-2 z-50 border border-gray-800"
              >
                {dropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
