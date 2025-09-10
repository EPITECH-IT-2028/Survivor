"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isStartupArea = pathname.startsWith('/startup-area');

  if (isStartupArea) {
    return null
  }

  return <Footer />
}
