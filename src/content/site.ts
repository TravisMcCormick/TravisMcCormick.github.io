export const site = {
  name: "Travis McCormick",
  shortName: "TSM",
  role: "Embedded Cybersecurity Engineer",
  company: "EveryPeer",
  location: "Winter Haven, FL",
  email: "mccormicktravis1110@gmail.com",
  phone: "407-433-4441",
  phoneHref: "tel:+14074334441",
  github: "https://github.com/TravisMcCormick",
  linkedin: "https://linkedin.com/in/travissmccormick",
  swimcloud: "https://www.swimcloud.com/swimmer/762084/",
  url: "https://travismccormick.github.io",

  // Numeric Goodreads user id (the digits in your profile URL:
  // goodreads.com/user/show/12345678-travis -> "12345678"). The /books page
  // and scripts/fetch-books.mjs both read this. Until it is set, the Books
  // page shows an empty state and nothing is fetched.
  goodreadsUserId: "203879028",
};

export const goodreadsProfileUrl = `https://www.goodreads.com/user/show/${site.goodreadsUserId}`;

export const goodreadsShelfUrl = (shelf: "currently-reading" | "read" | "to-read") =>
  `https://www.goodreads.com/review/list/${site.goodreadsUserId}?shelf=${shelf}`;

export type NavItem = { label: string; to: string; key: string };

export const navItems: NavItem[] = [
  { label: "Home", to: "/", key: "h" },
  { label: "About", to: "/about", key: "a" },
  { label: "Projects", to: "/projects", key: "p" },
  { label: "Resume", to: "/resume", key: "r" },
  { label: "Books", to: "/books", key: "k" },
  { label: "Swimming", to: "/swimming", key: "s" },
  { label: "Contact", to: "/contact", key: "c" },
];

// Number-key aliases kept from the original site (1 = Home, 2 = About, ...).
export const numberAliases: Record<string, string> = {
  "1": "/",
  "2": "/about",
  "3": "/projects",
  "4": "/resume",
  "5": "/books",
  "6": "/swimming",
  "7": "/contact",
};
