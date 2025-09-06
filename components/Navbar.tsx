"use client";

import { TextRipple } from "@/components/ui/text-ripple";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <nav
      aria-label="Navigation principale"
      className="relative mx-6 my-5 flex h-24 items-center justify-between rounded-xl bg-primary font-canela-black text-secondary"
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
      {!isAuthenticated && (
        <Link href="/login" className="group relative right-0 mr-6 px-6 py-3">
          <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
          <span className="relative text-secondary group-hover:text-primary">
            Login
          </span>
        </Link>
      )}
      {isAuthenticated && isAdmin && (
        <Link
          href="/dashboard"
          className="group relative right-0 mr-6 px-6 py-3"
        >
          <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
          <span className="relative text-secondary group-hover:text-primary">
            Dashboard
          </span>
        </Link>
      )}
      {isAuthenticated && !isAdmin && (
        <Link
          href="#"
          className="group relative right-0 mr-6 px-6 py-3"
        >
          <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
          <span className="relative text-secondary group-hover:text-primary">
            Profile
          </span>
        </Link>
      )}
    </nav>
  );
}
