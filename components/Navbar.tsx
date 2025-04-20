"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/config/crown";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="bg-gray-900 text-white h-15 px-4 flex items-center gap-6 text-sm font-bold relative">
      {navItems.map(({ href, label, icon, dropdown }) => {
        const isDropdownOpen = openDropdown === label;
        const isActive =
          pathname === href ||
          pathname.startsWith(href + "/") ||
          isDropdownOpen;

        return (
          <div key={label} className="relative group h-full" ref={dropdownRef}>
            {/* TOP LEVEL MENU */}
            {dropdown ? (
              <button
                onClick={() => toggleDropdown(label)}
                className={`flex cursor-pointer items-center gap-1 relative transition duration-250 ease-in-out border-b-4 hover:text-yellow-400 border-transparent h-full ${
                  isActive
                    ? "text-white border-yellow-400"
                    : "hover:border-yellow-400"
                }`}
              >
                <Image src={icon} alt={icon} height={15} width={15}></Image>
                <span>{label.toUpperCase()}</span>
              </button>
            ) : (
              <Link
                href={href}
                className={`flex cursor-pointer items-center gap-1 relative transition duration-250 ease-in-out border-b-4 hover:text-yellow-400 border-transparent h-full ${
                  isActive
                    ? "text-white border-yellow-400"
                    : "hover:border-yellow-400"
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
                className="absolute top-full left-0 w-56 bg-[#0e1621] shadow-lg rounded-md py-2 z-50 border border-gray-800"
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
