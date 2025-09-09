"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith('/startup-area');

  if (hideNavbar)
    return null;

  return <Navbar />;
}
