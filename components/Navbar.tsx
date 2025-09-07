"use client";

import { TextRipple } from "@/components/ui/text-ripple";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { List } from "lucide-react";
import { use, useEffect, useState } from "react";

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
      <div className="bg-primary p-4">
        <nav
          aria-label="Navigation principale"
          className="flex h-16 items-center justify-between rounded-xl bg-primary font-canela-black text-secondary px-2"
        >
          <Link href="/" className="flex-1">
            <TextRipple className="text-2xl text-white">JEB Incubator.</TextRipple>
          </Link>
          <div className="flex items-center">
            <List className="text-white" onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && (
              <div className="absolute right-4 top-16 z-10 w-48 rounded-md bg-white shadow-lg">
                <Link href="/project-catalog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Discover Startups
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  See Events
                </Link>
                {!isAuthenticated && (
                  <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Login
                  </Link>
                )}
                {isAuthenticated && isAdmin && (
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                )}
                {isAuthenticated && !isAdmin && (
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    ) : (
      <div>
        <nav
          aria-label="Navigation principale"
          className="relative mx-6 mt-5 flex h-24 items-center justify-between rounded-xl bg-primary font-canela-black text-secondary"
        >
          <Link href="/" className="absolute left-6 cursor-pointer">
            <TextRipple className="pt-2 text-4xl">JEB Incubator.</TextRipple>
          </Link>
          <div className="mx-auto flex">
            <Link
              href="project-catalog"
              className="group mx-6 font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
            >
              Discover Startups
              <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
            </Link>
            <Link
              href="#"
              className="group mx-6 font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
            >
              See Events
              <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
            </Link>
          </div>
          {!loading &&
            (isAuthenticated ? (
              <Link href={isAdmin ? "/dashboard" : "/startup-area"}
                className="group relative right-0 mr-6 px-6 py-3">
                <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
                <span className="relative text-secondary group-hover:text-primary">
                  Dashboard
                </span>
              </Link>
            ) : (
              <Link href="/login" className="group relative right-0 mr-6 px-6 py-3">
                <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
                <span className="relative text-secondary group-hover:text-primary">
                  Login
                </span>
              </Link>
            ))}
        </nav>
      </div>
    )
  );
}
