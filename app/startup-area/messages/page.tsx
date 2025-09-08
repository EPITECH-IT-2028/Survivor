"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar";
import { sidebarItems } from "@/app/types/sidebarItems";
import { MessagesStartup } from "@/components/startup/Messages";
import { useMediaQuery } from "@/app/hooks/mediaQuery/use-media-query";
import { MobilMessagesStartup } from "@/components/startup/MobileMessages";

export default function StartupAreaMessages() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <SidebarTrigger className={isMobile ? "fixed" : ""} />
      {!isMobile ? (
        <MessagesStartup />
      ) : (
        <MobilMessagesStartup />
      )}
    </SidebarProvider >
  )
}
