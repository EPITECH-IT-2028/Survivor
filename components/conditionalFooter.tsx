"use client";

import { usePathname } from "next/navigation";
import { Footer } from "react-day-picker";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isStartupArea = pathname.startsWith('/startup-area');

  if (isStartupArea) {
    return ""
  }

  return <Footer />
}
