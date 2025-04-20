export const navItems = [
  {
    href: "/",
    label: "Home",
    icon: "/assets/home.png",
  },
  {
    href: "/community",
    label: "Community",
    icon: "/assets/globe.png",
    dropdown: [
      { href: "/community/articles", label: "Articles" },
      { href: "/community/staff", label: "Staff" },
      { href: "/community/teams", label: "Teams" },
      { href: "/community/applications", label: "Staff applications" },
      { href: "/community/photos", label: "Photos" },
    ],
  },
];

export const posts = [
  {
    title: "Lorem ipsum",
    href: "/1-lorem-ipsum",
    author: "belgrard",
    image: "/assets/hero-bg.png",
  },
  {
    title: "Lorem ipsum 2",
    href: "/2-lorem-ipsum",
    author: "belgrard",
    image: "/assets/hero-bg.png",
  },
  {
    title: "Lorem ipsum 3",
    href: "/3-lorem-ipsum",
    author: "belgrard",
    image: "/assets/hero-bg.png",
  },
  {
    title: "Lorem ipsum 4",
    href: "/4-lorem-ipsum",
    author: "belgrard",
    image: "/assets/hero-bg.png",
  },
];

export const defaultMotto = "Hey, I'm using Crown CMS!";

export const defaultCurrencies = {
  duckets: 5000,
  credits: 100_000,
  diamonds: 0,
};

// NEVER lose or share the following two strings anywhere!
// One small mistake can result in unauthorized access to your entire database.

export const MONGODB_URI: string = process.env.MONGODB_URI || "";

export const JWT_SECRET = process.env.JWT_SECRET || " ";
