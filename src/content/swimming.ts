export const howItStarted: string[] = [
  "I started swimming in 7th grade. Before that, I played a bunch of different sports at the YMCA and did little league baseball for a few seasons. By the end of my last baseball season, I was pretty tired of my dad always telling me to go outside and practice, so I decided to try something different, swimming.",
  "I ended up joining the St. Cloud Aquatics team, and honestly, it was one of the best decisions I made. I met some of my closest friends through that team. What I liked about swimming was that it's an individual sport. You're competing against yourself and the clock. That pushed me to work harder than I ever did in team sports.",
  "The discipline I got from swimming carried over into everything else. I became a lifeguard at 16, got my Water Safety Instructor certification, taught kids and adults how to swim, and eventually became Head Lifeguard at Florida Poly. All of that started because I wanted to try something new in 7th grade.",
  "These times don't really mean much now since I'm out of high school, but I'm still pretty proud of what I was able to accomplish. Swimming taught me that if you keep showing up and putting in the work, you'll get better. That applies to pretty much everything: coding, building stuff, whatever.",
];

export const timesIntro =
  "Competed from 2016-2021 with St. Cloud High School and St. Cloud Aquatics";

export const timesNote =
  "These are both of my High School and Club times. I couldn't remember which meets were which, so I just put both.";

export type SwimTime = { event: string; time: string; meet: string; date: string };

export const swimTimes: SwimTime[] = [
  { event: "50 Free SCY", time: "27.83", meet: "Seminole Aquatics A Day", date: "Oct 7, 2017" },
  { event: "50 Free LCM", time: "29.23", meet: "Sunshine State Games", date: "Jun 7, 2019" },
  { event: "100 Free LCM", time: "1:05.59", meet: "Sunshine State Games", date: "Jun 9, 2019" },
  { event: "200 Free SCY", time: "1:57.30", meet: "FHSAA 3A District 6", date: "Nov 3, 2019" },
  { event: "200 Free LCM", time: "2:24.72", meet: "Sunshine State Games", date: "Jun 8, 2019" },
  { event: "400 Free LCM", time: "5:13.82", meet: "Sunshine State Games", date: "Jun 7, 2019" },
  { event: "500 Free SCY", time: "5:20.70", meet: "FHSAA 4A District 4", date: "Oct 26, 2018" },
  { event: "1000 Free SCY", time: "11:27.55", meet: "FL SPA / PVP Invitational", date: "Nov 24, 2019" },
  { event: "50 Back SCY", time: "37.00", meet: "Seminole Aquatics A Day", date: "Oct 7, 2017" },
  { event: "100 Back LCM", time: "1:22.65", meet: "Sunshine State Games", date: "Jun 8, 2019" },
  { event: "50 Breast SCY", time: "33.17", meet: "FHSAA 3A Region 2", date: "Oct 30, 2020" },
  { event: "100 Breast SCY", time: "1:10.26", meet: "FHSAA 3A District 6", date: "Oct 23, 2020" },
  { event: "100 Breast LCM", time: "1:33.82", meet: "Sunshine State Games", date: "Jun 9, 2019" },
  { event: "200 Breast LCM", time: "3:21.79", meet: "Sunshine State Games", date: "Jun 8, 2019" },
  { event: "50 Fly SCY", time: "35.25", meet: "Seminole Aquatics A Day", date: "Oct 7, 2017" },
  { event: "200 Fly LCM", time: "3:26.38", meet: "Sunshine State Games", date: "Jun 9, 2019" },
  { event: "200 IM SCY", time: "2:15.79", meet: "FHSAA 3A Region 2", date: "Oct 30, 2020" },
  { event: "200 IM LCM", time: "2:49.39", meet: "Sunshine State Games", date: "Jun 7, 2019" },
];

export const beyondThePool = {
  before:
    "Swimming didn't just stay in the pool. It shaped everything that came after. The discipline I learned from training carried over into lifeguarding, teaching, and eventually into engineering. When I saw an inefficiency at the City of Lakeland, I didn't just accept it. I built the ",
  linkText: "Lifeguard Scheduling App",
  linkTo: "/projects",
  after:
    " to fix it. That same mindset applies to everything I do now: if something's broken, figure out how to build a better solution.",
};
