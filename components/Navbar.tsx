"use client";

import { TextRipple } from "@/components/ui/text-ripple";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { List } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

export default function Navbar() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isPageMobile, setIsPageMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 736) {
        setIsPageMobile(true);
      } else {
        setIsPageMobile(false);
        setMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    isPageMobile ? (
      <div>
        <nav
          aria-label="Navigation principale"
          className="mx-2 mt-5 flex h-24 items-center justify-between rounded-xl bg-primary px-4 font-canela-black text-secondary"
        >
          <Link href="/" className="w-auto">
            <TextRipple className="text-2xl whitespace-nowrap text-white">JEB Incubator.</TextRipple>
          </Link>
          <div className="flex items-center justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <List className="flex-1 text-white" onClick={() => setMenuOpen(!menuOpen)} />
              </PopoverTrigger>
              <PopoverContent className="rounded-lg bg-secondary p-4 shadow-lg">
                <div className="flex flex-col gap-4">
                  <Link
                    href="/project-catalog"
                    className="font-sf-pro text-lg font-medium text-primary transition-all duration-100 hover:text-zinc-300"
                  >
                    Discover Startups
                  </Link>
                  <Link
                    href="/event-calendar"
                    className="font-sf-pro text-lg font-medium text-primary transition-all duration-100 hover:bg-primary hover:text-red-300"
                  >
                    See Events
                  </Link>
                  <Link
                    href="/news"
                    className="font-sf-pro text-lg font-medium text-primary transition-all duration-100 hover:text-zinc-300"
                  >
                    See News
                  </Link>
                  {!loading &&
                    (isAuthenticated ? (
                      <Link
                        href={isAdmin ? "/dashboard" : "/startup-area"}
                        className="font-sf-pro text-lg font-medium text-primary transition-all duration-100 hover:text-zinc-300"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="font-sf-pro text-lg font-medium text-primary transition-all duration-100 hover:text-zinc-300"
                      >
                        Login
                      </Link>
                    ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </nav>
      </div>
    ) : (
      <div>
        <nav
          aria-label="Navigation principale"
          className="mx-6 mt-5 grid h-24 grid-cols-3 items-center rounded-xl bg-primary px-6 font-canela-black text-secondary"
        >
          {/* Left: Title */}
          <div className="flex items-center">
            <Link href="/" className="ml-2">
              <TextRipple className="text-2xl whitespace-nowrap text-white">JEB Incubator.</TextRipple>
            </Link>
          </div>
          {/* Center: Links */}
          <div className="items-left flex justify-center gap-8">
            <Link
              href="/project-catalog"
              className="group font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
            >
              Discover Startups
              <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
            </Link>
            <Link
              href="/event-calendar"
              className="group font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
            >
              See Events
              <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
            </Link>
            <Link
              href="/news"
              className="group font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
            >
              See News
              <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
            </Link>
          </div>
          {/* Right: Login/Dashboard */}
          <div className="flex items-center justify-end">
            {!loading &&
              (isAuthenticated ? (
                <Link
                  href={isAdmin ? "/dashboard" : "/startup-area"}
                  className="group relative px-6 py-3"
                >
                  <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
                  <span className="relative text-secondary group-hover:text-primary">
                    Dashboard
                  </span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="group relative px-6 py-3"
                >
                  <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
                  <span className="relative text-secondary group-hover:text-primary">
                    Login
                  </span>
                </Link>
              ))}
          </div>
        </nav>
      </div>
    )
  );
}
