"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar";
import { sidebarItems } from "@/app/types/sidebarItems";
import { MessagesStartup } from "@/components/startup/Messages";

export default function StartupAreaMessages() {
  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <SidebarTrigger />
      <MessagesStartup />
    </SidebarProvider >
  )
}
