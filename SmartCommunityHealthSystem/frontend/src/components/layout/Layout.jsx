import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

export default function Layout({ children, title = "Dashboard", onRefresh }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        <Navbar title={title} onRefresh={onRefresh} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
          {children}
        </main>
        <BottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
