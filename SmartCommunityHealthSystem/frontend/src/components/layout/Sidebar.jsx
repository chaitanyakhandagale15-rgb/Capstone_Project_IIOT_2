import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, History, AlertTriangle, Droplets, CheckCircle2, Calendar } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "History", url: "/dashboard/history", icon: History },
  { title: "Summary", url: "/dashboard/summary", icon: Calendar },
  { title: "Alerts", url: "/dashboard/alerts", icon: AlertTriangle },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="inset" className="border-r border-slate-200">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2.5 font-bold text-slate-800 tracking-tight">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm leading-tight text-slate-900">Aqua AI</span>
            <span className="text-[10px] leading-tight text-slate-500 font-medium uppercase tracking-wider">Water Intelligence</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-slate-50/30">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 tracking-wider mb-2">APPLICATION</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={
                      <Link to={item.url} className="flex items-center gap-3 w-full px-2 py-1.5">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    }
                    isActive={location.pathname === item.url} 
                    className={`transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${location.pathname === item.url ? 'bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100/50' : 'text-slate-600'}`}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-100 bg-slate-50/80 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          All systems operational
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
