"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/config/crown"; // List of navigation items
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to close dropdown if a click occurs outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  // Add/remove event listener for outside click detection
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
    <nav className="bg-gray-900 mx-auto text-white h-15 px-20 flex items-center gap-8 text-sm font-bold relative">
      {/* Loop over each nav item */}
      {navItems.map(({ href, label, icon, dropdown }) => {
        const isDropdownOpen = openDropdown === label;
        const isActive =
          pathname === href ||
          pathname.startsWith(href + "/") ||
          isDropdownOpen;

        return (
          <div key={label} className="relative group h-full" ref={dropdownRef}>
            {/* Top-level navigation item - button if it has a dropdown, else a Link */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  data-darkreader-inline-fill=""
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
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
                onMouseLeave={() => setOpenDropdown(null)} // Auto-close dropdown on mouse leave
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
