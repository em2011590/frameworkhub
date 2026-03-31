"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Code2, Layers, GitCompare, Map, LayoutDashboard, Play, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openSearch } from "@/lib/redux/slices/searchSlice";
import { clsx } from "clsx";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/frameworks", label: "Frameworks", icon: Layers },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/pricing", label: "Pricing", icon: Code2 },
  { href: "/playground", label: "Playground", icon: Play },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-surface-border py-3" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center glow-purple">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">FrameworkHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === href
                    ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(openSearch())}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Search"
            >
              <Search size={18} />
            </button>

            <div className="hidden md:flex items-center gap-2 ml-2">
              {status === "authenticated" ? (
                <div className="flex items-center gap-3 font-medium text-sm">
                  <span className="text-gray-400">
                    Hi, <span className="text-white">{session.user?.name}</span>
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-surface-border p-4 md:hidden"
            onClickCapture={() => setMobileOpen(false)}
          >
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-all",
                  pathname === href
                    ? "bg-primary-500/20 text-primary-300"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-surface-border flex flex-col gap-2">
              {status === "authenticated" ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3"
                >
                  <LogOut size={16} />
                  Sign Out ({session.user?.name})
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all block"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-all text-center block"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
