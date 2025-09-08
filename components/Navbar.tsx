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
      if (window.innerWidth <= 630) {
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
          className="flex mx-2 px-4 mt-5 h-24 items-center justify-between rounded-xl bg-primary font-canela-black text-secondary"
        >
          <Link href="/" className="w-auto">
            <TextRipple className="text-2xl text-white whitespace-nowrap">JEB Incubator.</TextRipple>
          </Link>
          <div className="flex items-center justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <List className="text-white flex-1" onClick={() => setMenuOpen(!menuOpen)} />
              </PopoverTrigger>
              <PopoverContent className="bg-secondary p-4 rounded-lg shadow-lg">
                <div className="flex flex-col gap-4">
                  <Link
                    href="/project-catalog"
                    className="font-sf-pro text-lg font-medium text-primary transition-all duration-100 hover:text-zinc-300"
                  >
                    Discover Startups
                  </Link>
                  <Link
                    href="#"
                    className="font-sf-pro text-lg font-medium text-primary transition-all duration-100 hover:text-red-300 hover:bg-primary"
                  >
                    See Events
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
          className="grid grid-cols-3 mx-6 px-6 mt-5 h-24 items-center rounded-xl bg-primary font-canela-black text-secondary"
        >
          {/* Left: Title */}
          <div className="flex items-center">
            <Link href="/" className="ml-2">
              <TextRipple className="text-2xl text-white whitespace-nowrap">JEB Incubator.</TextRipple>
            </Link>
          </div>
          {/* Center: Links */}
          <div className="flex justify-center items-left gap-8">
            <Link
              href="/project-catalog"
              className="group font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
            >
              Discover Startups
              <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
            </Link>
            <Link
              href="#"
              className="group font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
            >
              See Events
              <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
            </Link>
          </div>
          {/* Right: Login/Dashboard */}
          <div className="flex justify-end items-center">
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
