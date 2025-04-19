export const navItems = [
  {
    href: "/",
    label: "Home",
    icon: "/home.png",
  },
  {
    href: "/community",
    label: "Community",
    icon: "/globe.png",
    dropdown: [
      { href: "/community/articles", label: "Articles" },
      { href: "/community/staff", label: "Staff" },
      { href: "/community/teams", label: "Teams" },
      { href: "/community/applications", label: "Staff applications" },
      { href: "/community/photos", label: "Photos" },
    ],
  },
];
