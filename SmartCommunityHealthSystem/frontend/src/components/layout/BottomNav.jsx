import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, History, AlertTriangle, Calendar } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "History", url: "/dashboard/history", icon: History },
    { title: "Summary", url: "/dashboard/summary", icon: Calendar },
    { title: "Alerts", url: "/dashboard/alerts", icon: AlertTriangle },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.url;
        return (
          <Link 
            key={item.title} 
            to={item.url} 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <item.icon className={`w-5 h-5 ${isActive ? 'fill-blue-100' : ''}`} />
            <span className="text-[10px] font-medium tracking-wide">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
