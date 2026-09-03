import type { Icon } from "@phosphor-icons/react";
import {
  BookOpen,
  EnvelopeSimple,
  FolderOpen,
  House,
  PersonSimpleSwim,
  ReadCvLogo,
  User,
} from "@phosphor-icons/react";

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
  // Digits from the Goodreads profile URL; drives the Books page sync.
  goodreadsUserId: "203879028",
};

export const goodreadsProfileUrl = `https://www.goodreads.com/user/show/${site.goodreadsUserId}`;

export const goodreadsShelfUrl = (shelf: "currently-reading" | "read" | "to-read") =>
  `https://www.goodreads.com/review/list/${site.goodreadsUserId}?shelf=${shelf}`;

export type NavItem = { label: string; to: string; key: string; icon: Icon };

export const navItems: NavItem[] = [
  { label: "Home", to: "/", key: "h", icon: House },
  { label: "About", to: "/about", key: "a", icon: User },
  { label: "Resume", to: "/resume", key: "r", icon: ReadCvLogo },
  { label: "Contact", to: "/contact", key: "c", icon: EnvelopeSimple },
  { label: "Projects", to: "/projects", key: "p", icon: FolderOpen },
  { label: "Books", to: "/books", key: "k", icon: BookOpen },
  { label: "Swimming", to: "/swimming", key: "s", icon: PersonSimpleSwim },
];

// Number keys 1..6 map to the nav items after Home, in order.
export const numberAliases: Record<string, string> = Object.fromEntries(
  navItems.slice(1).map((item, i) => [String(i + 1), item.to]),
);
