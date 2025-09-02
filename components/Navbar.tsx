import { TextRipple } from "@/components/ui/text-ripple";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      aria-label="Navigation principale"
      className="mx-6 mt-5 flex h-24 items-center justify-between rounded-xl bg-primary px-16 font-instrument-serif text-secondary"
    >
      <TextRipple className="text-4xl">JEB Incubator.</TextRipple>
      <div className="flex gap-6">
        <Link
          href="#"
          className="rounded-lg px-6 py-2 font-sf-pro text-lg font-medium text-secondary underline decoration-wavy decoration-1 underline-offset-4 transition-all duration-100 hover:scale-x-110 hover:scale-y-95 hover:decoration-zinc-400"
        >
          Discover Startups
        </Link>
        <Link
          href="#"
          className="rounded-lg px-6 py-2 font-sf-pro text-lg font-medium text-secondary underline decoration-wavy decoration-1 underline-offset-4 transition-all duration-100 hover:scale-x-110 hover:scale-y-95 hover:decoration-zinc-400"
        >
          See Events
        </Link>
      </div>
      <Link
        href="#"
        className="rounded-lg border border-secondary bg-secondary px-6 py-2 text-lg font-medium text-primary transition-transform duration-100 hover:scale-x-110 hover:scale-y-95 hover:bg-primary hover:text-secondary"
      >
        Login
      </Link>
    </nav>
  );
}
