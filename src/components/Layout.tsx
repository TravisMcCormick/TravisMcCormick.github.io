import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useKeyboardNav } from "../hooks/useKeyboardNav";

export function Layout() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  useKeyboardNav();

  // Reset scroll on navigation, unless the URL points at an in-page anchor.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <motion.main
        key={pathname}
        className="flex-1"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  );
}
