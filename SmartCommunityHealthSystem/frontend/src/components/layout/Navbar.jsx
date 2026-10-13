import { RefreshCw, Bell, User, ChevronRight, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import socket from "../../services/socket";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useDashboard from "../../hooks/useDashboard";

export default function Navbar({ title, onRefresh }) {
  const [connected, setConnected] = useState(socket.connected);
  const [lastSync, setLastSync] = useState(new Date());
  const [sensorsActive, setSensorsActive] = useState(false);
  const { alerts = [] } = useDashboard();

  useEffect(() => {
    let timeoutId;
    const handleConnect = () => { setConnected(true); setLastSync(new Date()); };
    const handleDisconnect = () => { setConnected(false); setSensorsActive(false); };
    const handleNewData = () => { 
      setLastSync(new Date());
      setSensorsActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setSensorsActive(false), 12000);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("sensor:new", handleNewData);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("sensor:new", handleNewData);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="h-4 mx-1" />
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium text-slate-900 dark:text-slate-100">{title}</span>
          <ChevronRight className="h-4 w-4 mx-1 opacity-50" />
          <span>Real-time monitoring</span>
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            {!connected ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-600">Server Offline</span>
              </>
            ) : sensorsActive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-600">Live Connected</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-amber-600">Sensors Offline</span>
              </>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground mt-0.5">
            Sync: {format(lastSync, 'HH:mm:ss')}
          </span>
        </div>
        
        {onRefresh && (
          <Button variant="outline" size="icon" onClick={() => { onRefresh(); setLastSync(new Date()); }} className="h-8 w-8 hover:bg-slate-100">
            <RefreshCw className="h-4 w-4 text-slate-600" />
          </Button>
        )}
        
        <Popover>
          <PopoverTrigger render={
            <Button variant="ghost" size="icon" className="relative h-8 w-8 hover:bg-slate-100">
              <motion.div animate={{ rotate: [0, -15, 15, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}>
                <Bell className="h-4 w-4 text-slate-600" />
              </motion.div>
              {alerts?.length > 0 && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </Button>
          } />
          <PopoverContent className="w-80 p-0 mr-4 mt-2" align="end">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h4 className="text-sm font-semibold text-slate-800">Notifications</h4>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">{alerts.length} new</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {alerts.length > 0 ? alerts.map((alert) => (
                <div key={alert._id} className="flex gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <div className={`mt-0.5 p-1.5 rounded-full h-fit ${alert.waterQuality === 'Unsafe' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    {alert.waterQuality === 'Unsafe' ? <ShieldAlert className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 tracking-tight">
                      {alert.waterQuality === 'Unsafe' ? 'Critical Water Quality' : 'Moderate Risk Detected'}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      pH: {alert.ph} | Temp: {alert.temperature}°C | Turbidity: {alert.turbidity}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                      {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="px-4 py-8 text-center flex flex-col items-center">
                   <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                     <Bell className="w-4 h-4 text-slate-300" />
                   </div>
                   <p className="text-sm text-slate-500">No new alerts</p>
                </div>
              )}
            </div>
            <div className="p-2 border-t border-slate-100">
              <Button variant="ghost" className="w-full text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">View all alerts</Button>
            </div>
          </PopoverContent>
        </Popover>

        <Link to="/dashboard/profile" className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer ml-1">
          AD
        </Link>
      </div>
    </header>
  );
}
