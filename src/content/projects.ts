import type { Icon } from "@phosphor-icons/react";
import {
  Brain,
  CalendarBlank,
  ChartLine,
  Keyboard,
  Cpu,
  Timer,
} from "@phosphor-icons/react";

export type FeaturedProject = {
  title: string;
  date: string;
  icon: Icon;
  heading: string;
  paragraphs: string[];
  tech: string[];
  link?: { href: string; label: string };
};

export type Project = {
  title: string;
  tags: string[];
  icon: Icon;
  body: string;
  tech: string[];
  link?: { href: string; label: string };
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Custom Corne Keyboard",
    date: "2024",
    icon: Keyboard,
    heading: "The Story Behind the Build",
    paragraphs: [
      "I've always been worried about working at a computer all day and what it might do long-term. I already need glasses from staring at screens and reading books in bad lighting as a kid, so I figured I should be proactive about preventing carpal tunnel before it becomes a problem.",
      'I had some "custom" keyboards before—I\'d spend time making them look, sound, and feel the way I wanted. But they were still QWERTY with the normal row-stagger layout. Then I saw a YouTube video where someone built their own split keyboard, and it completely changed how I thought about keyboards. I went down a rabbit hole learning about ortholinear layouts, custom keymaps, and how QWERTY and row-stagger were originally designed for typewriters to prevent keys from jamming—not for human hands. They\'re actually terrible ergonomically, but everyone got so used to them that it just became "normal" and no one really questions it.',
      "Two of my friends, Vineet and Jake, had already built their own keyboards, so I knew I could rely on them for help if I got stuck. I'd picked up soldering at an IEEE workshop one day—showed up, did it, burned myself a couple times, but picked it up pretty easily with very little instruction. The thing is, you don't get to use soldering often because buying plain PCBs and all the components (transistors, capacitors, microcontrollers) gets really expensive. Usually, buying things pre-manufactured is cheaper. But I wanted to build my own keyboard partly to get better at soldering, and I had a lot of fun building everything myself, piece by piece—even when things didn't work right away and even when I'd burn myself.",
      "I built a Corne split keyboard from scratch, dove into ZMK firmware, designed custom keymaps for my workflow, and got into 3D printing to make the case and a carrying case. It's one of my favorite projects because I fixed a potential problem before it even happened, and I got to practice a skill I don't usually get to use. The keyboard works great, and now I don't have to worry about wrecking my wrists.",
    ],
    tech: ["Hardware", "Soldering", "ZMK Firmware", "3D Printing", "Ergonomics"],
    link: { href: "https://github.com/TravisMcCormick/zmk-config", label: "View Firmware Config" },
  },
  {
    title: "Zettelkasten Knowledge Base",
    date: "Ongoing",
    icon: Brain,
    heading: "My Personal Knowledge Management System",
    paragraphs: [
      "A friend of mine, Joey, introduced me to Zettelkasten—basically a knowledge management system for organizing notes. In cybersecurity and technology, there's way too much information to remember everything, and I was tired of having scattered notes all over the place that I could never find when I needed them.",
      "The way Zettelkasten works is simple: instead of trying to write everything about a subject all at once, you just make small, atomic notes and link them together. For example, algebra shows up in both physics and calculus. Without Zettelkasten, I'd have to write the same algebra information in both the physics and calculus notes. With Zettelkasten, I just make one note on algebra and link to it from both. It's way more efficient.",
      "My Zettelkasten repository is a living collection of notes on everything I learn: networking protocols, firewall configurations, lockpicking techniques, security vulnerabilities, hardware concepts, and more. It makes it easier to see how concepts connect, and I can actually find things later instead of losing them in some random text file.",
    ],
    tech: ["Learning", "Knowledge Management", "Networking", "Security", "Documentation"],
    link: { href: "https://github.com/TravisMcCormick/ZettleKasten", label: "Explore My Notes" },
  },
  {
    title: "Lifeguard Scheduling App",
    date: "January 2024 – May 2025",
    icon: CalendarBlank,
    heading: "Solving a Real-World Problem",
    paragraphs: [
      "I'd been a lifeguard for six years—started at 16, became a Water Safety Instructor, taught kids and adults how to swim, and eventually worked my way up to Head Lifeguard at Florida Poly. When I started working for the City of Lakeland, I noticed they were still managing rotation schedules with a dry erase board. It seemed like an obvious problem to solve.",
      "I built a React web app to replace it. Lifeguards could pull up the schedule on their phones instead of having to look at the board. Managers could make changes in real-time without constantly erasing and rewriting. Everyone stayed synchronized.",
      "Why I Built It: This was a problem I understood from years of hands-on experience, and I had the technical skills to fix it. It was about bringing modern tools to an industry that doesn't always get the tech attention it deserves. Plus, I just wanted to make people's jobs easier.",
      "Unfortunately, when I left to graduate, the IT department didn't want to maintain it, so it never got fully implemented. But it taught me a lot about building real solutions for real problems, collaborating with users to understand their needs, and delivering something that actually works.",
    ],
    tech: ["React", "JavaScript", "Web Development", "UI/UX Design", "Real-time Updates"],
    link: {
      href: "https://github.com/TravisMcCormick/lakeland-lifeguard-react-app",
      label: "View Repository",
    },
  },
];

export const projects: Project[] = [
  {
    title: "Zettelkasten",
    tags: ["Knowledge Management"],
    icon: Brain,
    body: "A collection of my personal Zettelkasten notes, organized for efficient knowledge management and exploration. Covers topics including networking, security, firewall configurations, and lockpicking.",
    tech: ["Learning", "Networking", "Security"],
    link: { href: "https://github.com/TravisMcCormick/ZettleKasten", label: "View Repository" },
  },
  {
    title: "Lifeguard Scheduling App (React)",
    tags: ["Professional", "Web Development"],
    icon: CalendarBlank,
    body: "Developed a React web application for the City of Lakeland to optimize lifeguard scheduling. Collaborated directly with the superintendent to define requirements and improve operational efficiency.",
    tech: ["React", "JavaScript", "Web App"],
    link: {
      href: "https://github.com/TravisMcCormick/lakeland-lifeguard-react-app",
      label: "View Repository",
    },
  },
  {
    title: "Lifeguard Rotation Scheduler",
    tags: ["C++"],
    icon: Timer,
    body: "A user-friendly and efficient desktop tool designed to streamline lifeguard rotation scheduling. Features real-time information updates, dynamic stand management, threading for performance, and weather pause functionality.",
    tech: ["C++", "Threading", "Real-time"],
    link: { href: "https://github.com/TravisMcCormick/Lifeguard-App", label: "View Repository" },
  },
  {
    title: "4-Bit Arithmetic Logic Unit (ALU)",
    tags: ["Hardware"],
    icon: Cpu,
    body: "Constructed a 4-bit ALU on a breadboard using discrete IC chips. Integrated core functions including addition, OR, AND, XOR, NAND, and comparative logic operations with comprehensive validation testing.",
    tech: ["Digital Logic", "Hardware", "IC Chips"],
  },
  {
    title: "Digital Stopwatch",
    tags: ["Verilog"],
    icon: Timer,
    body: "Created a stopwatch using Verilog as part of Digital Logic Design coursework. Utilized D flip-flops, clock dividers, and state machines to implement precise timing functionality.",
    tech: ["Verilog", "FPGA", "Digital Design"],
    link: { href: "https://github.com/TravisMcCormick/StopWatch", label: "View Repository" },
  },
  {
    title: "Data Optimization Algorithm",
    tags: ["Algorithms"],
    icon: ChartLine,
    body: "Developed an optimization algorithm to maximize data value within budget constraints. Given 100 subjects selling data, the solution identifies the most valuable subjects within a $10 budget using advanced algorithms.",
    tech: ["C++", "Algorithms", "Optimization"],
    link: {
      href: "https://github.com/TravisMcCormick/Data-Structures-and-Algorithms-Final",
      label: "View Repository",
    },
  },
  {
    title: "ZMK Keyboard Configuration",
    tags: ["Personal"],
    icon: Keyboard,
    body: "Custom keyboard firmware configuration for mechanical keyboards using ZMK. Personalized layouts and key mappings for enhanced productivity.",
    tech: ["ZMK", "Firmware", "Configuration"],
    link: { href: "https://github.com/TravisMcCormick/zmk-config", label: "View Repository" },
  },
];
