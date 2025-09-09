"use client";
import { AppSidebar } from "@/components/sideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarItems } from "../types/sidebarItems";

export default function StartupArea() {

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <SidebarTrigger />
    </SidebarProvider >
  )
}
