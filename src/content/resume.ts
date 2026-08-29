export type ResumeEntry = {
  title: string;
  company?: string;
  meta?: string;
  date?: string;
  bullets?: string[];
};

export type ResumeSection = {
  title: string;
  entries?: ResumeEntry[];
  accomplishments?: { text: string; org: string; date: string }[];
  groups?: { label: string; body: string }[];
};

export const resumeName = "Travis S. McCormick";

export const resumeSections: ResumeSection[] = [
  {
    title: "Experience",
    entries: [
      {
        title: "Embedded Cybersecurity Engineer",
        company: "EveryPeer | Winter Haven, FL",
        date: "May 2025 – Present",
        bullets: [
          "Built an embedded agent to control WireGuard, automate config changes, and report real-time interface status.",
          "Added network-metrics collection for IP-latency measurement and high-usage endpoint identification.",
          "Contributed backend integrations for the customer web portal displaying embedded-device metrics.",
          "Expanded the embedded controller to manage the Wi-Fi card, bridge interface, and local device modes.",
          "Developed a WebRTC-based peer-discovery system that bootstraps automated WireGuard P2P tunnels.",
        ],
      },
      {
        title: "Reverse Engineering Intern",
        company: "ICR, Inc. | Orlando, FL",
        date: "May 2024 – August 2024",
        bullets: [
          "Deciphered firmware, assigning accurate symbols to functions, improving code readability and debugging.",
          "Engineered a testing framework to validate assigned symbols and ensure system integrity.",
          "Enhanced a remote PDU control program, increasing efficiency and reliability.",
          "Created client-specific test procedures, streamlining testing and improving client satisfaction.",
        ],
      },
    ],
  },
  {
    title: "Projects",
    entries: [
      {
        title: "Lifeguard App Development",
        company: "City Of Lakeland | Lakeland, FL",
        date: "January 2024 – May 2025",
        bullets: [
          "Developed a React web app for Lakeland to optimize lifeguard scheduling.",
          "Collaborated with the superintendent to define requirements and improve scheduling efficiency.",
        ],
      },
      {
        title: "Breadboard 4-Bit Arithmetic Logic Unit",
        company: "Florida Polytechnic University",
        date: "October 2024 – December 2024",
        bullets: [
          "Constructed a 4-bit Arithmetic Logic Unit (ALU) on a breadboard using discrete IC chips.",
          "Integrated core ALU functions, including addition, OR, AND, XOR, NAND, and comparative logic operations.",
          "Validated ALU functionality through comprehensive testing of various input combinations.",
        ],
      },
    ],
  },
  {
    title: "Certifications & Accomplishments",
    accomplishments: [
      { text: "Certified in Cybersecurity", org: "ISC2", date: "November 2025 - November 2028" },
      {
        text: "Southeast CCDC Regional Qualifier",
        org: "Florida Polytechnic Cybersecurity Club",
        date: "February 2025",
      },
      {
        text: "B-Sides Orlando In-Person CTF Champion",
        org: "Florida Polytechnic Cybersecurity Club",
        date: "October 2024",
      },
      {
        text: "Industrial Control Systems Cybersecurity Training (ICSC)",
        org: "SEL Engineering Services",
        date: "April 2023",
      },
    ],
  },
  {
    title: "Education",
    entries: [
      {
        title: "Bachelor of Science in Cybersecurity Engineering",
        company: "Florida Polytechnic University | Lakeland, FL",
        meta: "GPA: 3.25",
        date: "May 2025",
      },
    ],
  },
  {
    title: "Relevant Coursework",
    groups: [
      {
        label: "Cybersecurity:",
        body: "Network Security, Applied Cryptography, Secure Software Engineering, Protective & Forensic Tech For Cybersecurity, Hardware Security, Cyber-Physical Security, Embedded OS, Ethical Hacking, Cyber Design Lab",
      },
      {
        label: "CS/CE/EE:",
        body: "Data Structures & Algorithms, Object-Oriented Programming, Computer Architecture & Organization, Digital Logic Design, Digital Electronics, Electronic Devices, Intro to Unix, Circuits, Discrete Math, Linear Algebra",
      },
    ],
  },
  {
    title: "Skills",
    groups: [
      {
        label: "Programming Languages",
        body: "Go, C, C++, Bash, Python, JavaScript, MIPS, Matlab, Verilog, FreeRTOS",
      },
      {
        label: "Software and Tools",
        body: "IDA Pro, Ghidra, SolidWorks, LTSpice, Wireshark, Microsoft Office",
      },
      { label: "Security", body: "Windows & Linux Hardening, Nmap, Networking" },
    ],
  },
  {
    title: "Leadership",
    entries: [
      {
        title: "Cybersecurity Club Chief of Staff",
        company: "Florida Polytechnic University",
        date: "October 2024 – May 2025",
        bullets: [
          "Planned and organized weekly meetings, ensuring smooth execution and clear agendas.",
          "Designed presentation slides for meetings, tailoring content to the club's needs.",
          "Communicated with leadership to track task progress and provide updates on deadlines.",
          "Fostered a sense of community by promoting inclusiveness and collaboration within the club.",
        ],
      },
      {
        title: "Head Lifeguard",
        company: "Florida Polytechnic University",
        date: "August 2022 – May 2025",
        bullets: [
          "Applied 6+ years of first responder skills to ensure safety and rapid emergency response.",
          "Mentored and certified new lifeguards, fostering a competent and reliable team.",
          "Implemented risk management and loss prevention strategies, enhancing safety protocols.",
        ],
      },
    ],
  },
];
