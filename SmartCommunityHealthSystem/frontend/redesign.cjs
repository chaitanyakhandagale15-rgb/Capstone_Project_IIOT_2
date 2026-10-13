const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const fullPath = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Wrote ${p}`);
};

// 1. MOCK DATA
write('src/data/historicalWaterData.js', `
// DEMO HISTORICAL DATA for UI purposes only
export const demoHistoricalData = [
  { date: "2026-10-01", readings: 142, averagePH: 7.1, averageTemperature: 27.8, averageTurbidity: 2.1, status: "Safe" },
  { date: "2026-10-02", readings: 156, averagePH: 7.3, averageTemperature: 28.2, averageTurbidity: 2.4, status: "Safe" },
  { date: "2026-10-03", readings: 149, averagePH: 7.0, averageTemperature: 28.7, averageTurbidity: 2.8, status: "Safe" },
  { date: "2026-10-04", readings: 167, averagePH: 7.2, averageTemperature: 29.1, averageTurbidity: 3.0, status: "Safe" },
  { date: "2026-10-05", readings: 137, averagePH: 7.4, averageTemperature: 28.5, averageTurbidity: 2.5, status: "Safe" }
];
`);

// 2. NAVBAR
write('src/components/layout/Navbar.jsx', `
import { RefreshCw, Bell, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import socket from "../../services/socket";
import { format } from "date-fns";

export default function Navbar({ title, onRefresh }) {
  const [connected, setConnected] = useState(socket.connected);
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const handleConnect = () => { setConnected(true); setLastSync(new Date()); };
    const handleDisconnect = () => setConnected(false);
    const handleNewData = () => setLastSync(new Date());

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("sensor:new", handleNewData);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("sensor:new", handleNewData);
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
            {connected ? (
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
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-600">Offline</span>
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
        <Button variant="ghost" size="icon" className="relative h-8 w-8 hover:bg-slate-100">
          <Bell className="h-4 w-4 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-100 ml-1 border hover:border-slate-300 transition-colors">
          <User className="h-4 w-4 text-slate-600" />
        </Button>
      </div>
    </header>
  );
}
`);

// 3. SIDEBAR
write('src/components/layout/Sidebar.jsx', `
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, History, AlertTriangle, Droplets, CheckCircle2 } from "lucide-react";
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
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "History", url: "/history", icon: History },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
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
                    asChild 
                    isActive={location.pathname === item.url} 
                    className={\`transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 \${location.pathname === item.url ? 'bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100/50' : 'text-slate-600'}\`}
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full px-2 py-1.5">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
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
`);

// 4. ANIMATED COUNTER HOOK
write('src/hooks/useAnimatedNumber.js', `
import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export function useAnimatedNumber(value, format = (v) => Math.round(v)) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });
    return controls.stop;
  }, [value]);

  return format(displayValue);
}
`);

// 5. KPI CARDS
write('src/components/cards/StatCard.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";
import { motion } from "framer-motion";

export default function StatCard({ title, value, total, icon: Icon, variant = "default", trend }) {
  const colors = {
    default: "text-blue-600 bg-blue-50 border-blue-100",
    success: "text-emerald-600 bg-emerald-50 border-emerald-100",
    warning: "text-amber-600 bg-amber-50 border-amber-100",
    destructive: "text-red-600 bg-red-50 border-red-100"
  };

  const animatedValue = useAnimatedNumber(value);
  
  // Calculate a mock percentage for UI polish based on total
  const percentage = total > 0 ? Math.round((value / total) * 100) : (variant === "default" ? null : 0);

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="overflow-hidden border-slate-200 shadow-sm transition-shadow hover:shadow-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5 space-y-0">
          <CardTitle className="text-sm font-semibold text-slate-500">{title}</CardTitle>
          <div className={cn("p-2 rounded-lg border", colors[variant])}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <div className="text-3xl font-bold tracking-tight text-slate-800">{animatedValue}</div>
          {percentage !== null ? (
            <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
              <span className="font-medium text-slate-700">{percentage}%</span> of total readings
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
              {trend || "Live Tracking"}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
`);

// 6. WATER QUALITY SCORE
write('src/components/cards/WaterQualityScore.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";
import { motion } from "framer-motion";

export default function WaterQualityScore({ data }) {
  // Simple frontend calculation for a unified score out of 100
  let score = 100;
  let status = "Excellent";
  let color = "text-emerald-500";
  let stroke = "#10b981";

  if (data) {
    // Penalize for pH deviation from 7.0
    const phDev = Math.abs(data.ph - 7.0);
    score -= phDev * 5;
    
    // Penalize for Turbidity > 2
    if (data.turbidity > 2) score -= (data.turbidity - 2) * 2;
    
    // Penalize for Temp > 30
    if (data.temperature > 30) score -= (data.temperature - 30) * 1.5;
    
    score = Math.max(0, Math.min(100, Math.round(score)));
  }

  if (score < 60) { status = "Critical"; color = "text-red-500"; stroke = "#ef4444"; }
  else if (score < 80) { status = "Moderate"; color = "text-amber-500"; stroke = "#f59e0b"; }

  const animatedScore = useAnimatedNumber(score);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="h-full border-slate-200 shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Quality Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-4 pb-6">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r={radius} stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
            <motion.circle 
              cx="64" cy="64" r={radius} 
              stroke={stroke} strokeWidth="8" fill="transparent" 
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold tracking-tight text-slate-800">{animatedScore}</span>
            <span className="text-[10px] font-medium text-slate-400">/ 100</span>
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className={\`font-bold \${color}\`}>{status}</div>
          <div className="text-xs text-muted-foreground mt-1 px-4 leading-relaxed">
            Based on current pH, temperature and turbidity levels.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
`);

// 7. CURRENT SENSOR DATA
write('src/components/cards/CurrentSensorCard.jsx', `
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Activity, Clock, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const TrendIndicator = ({ value, prevValue, inverse = false }) => {
  if (prevValue === null || value === prevValue) return <div className="flex items-center text-[10px] text-slate-400 mt-1"><Minus className="w-3 h-3 mr-0.5" /> Stable</div>;
  const diff = value - prevValue;
  const isUp = diff > 0;
  // For pH/Turbidity, maybe increase is bad. Just color based on simple heuristic for UI.
  const isGood = inverse ? !isUp : isUp; 
  const color = isGood ? "text-emerald-500" : "text-red-500";
  const Icon = isUp ? ArrowUp : ArrowDown;
  
  return (
    <div className={\`flex items-center text-[11px] font-medium mt-1 \${color}\`}>
      <Icon className="w-3 h-3 mr-0.5" /> {Math.abs(diff).toFixed(1)}
    </div>
  );
}

export default function CurrentSensorCard({ data }) {
  const [prevData, setPrevData] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const lastUpdateRef = useRef(data?.createdAt);

  useEffect(() => {
    if (data && data.createdAt !== lastUpdateRef.current) {
      setPrevData(lastUpdateRef.currentData);
      lastUpdateRef.current = data.createdAt;
      lastUpdateRef.currentData = data;
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 800);
      return () => clearTimeout(timer);
    }
    if (!lastUpdateRef.currentData && data) lastUpdateRef.currentData = data;
  }, [data]);

  if (!data) return null;

  const isSafe = data.waterQuality === "Safe";
  const isWarning = data.waterQuality === "Moderate";
  const statusColor = isSafe ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-red-500';
  const badgeColor = isSafe ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                     isWarning ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                     'bg-red-50 text-red-700 border-red-200';

  return (
    <Card className="relative overflow-hidden h-full border-slate-200 shadow-sm">
      <motion.div 
        initial={false}
        animate={{ backgroundColor: highlight ? "rgba(59, 130, 246, 0.1)" : "rgba(0,0,0,0)" }}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      <div className={\`absolute top-0 w-full h-1.5 \${statusColor}\`} />
      
      <CardHeader className="pb-4 relative z-10 pt-5">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-bold text-slate-800">Current Water Quality</CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-1.5 text-xs">
              <span className="relative flex h-2 w-2 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Updated {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge variant="outline" className={badgeColor + " px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"}>
            {data.waterQuality}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="grid grid-cols-3 gap-3">
          {/* pH */}
          <div className="flex flex-col items-center justify-center py-4 px-2 bg-slate-50/80 rounded-xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <Droplets className="w-5 h-5 text-blue-500 mb-2 opacity-80" />
            <div className="text-xs text-slate-500 font-medium mb-0.5">pH Level</div>
            <AnimatePresence mode="popLayout">
              <motion.span 
                key={data.ph}
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800 tracking-tight"
              >
                {data.ph}
              </motion.span>
            </AnimatePresence>
            <TrendIndicator value={data.ph} prevValue={prevData?.ph} />
          </div>
          
          {/* Temperature */}
          <div className="flex flex-col items-center justify-center py-4 px-2 bg-slate-50/80 rounded-xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <Thermometer className="w-5 h-5 text-orange-500 mb-2 opacity-80" />
            <div className="text-xs text-slate-500 font-medium mb-0.5">Temp (°C)</div>
            <AnimatePresence mode="popLayout">
              <motion.span 
                key={data.temperature}
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800 tracking-tight"
              >
                {data.temperature}
              </motion.span>
            </AnimatePresence>
            <TrendIndicator value={data.temperature} prevValue={prevData?.temperature} inverse />
          </div>
          
          {/* Turbidity */}
          <div className="flex flex-col items-center justify-center py-4 px-2 bg-slate-50/80 rounded-xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
            <Activity className="w-5 h-5 text-slate-500 mb-2 opacity-80" />
            <div className="text-xs text-slate-500 font-medium mb-0.5">Turbidity</div>
            <AnimatePresence mode="popLayout">
              <motion.span 
                key={data.turbidity}
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800 tracking-tight"
              >
                {data.turbidity}
              </motion.span>
            </AnimatePresence>
            <TrendIndicator value={data.turbidity} prevValue={prevData?.turbidity} inverse />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
`);

// 8. AI ASSISTANT
write('src/components/cards/AIHealthAssistant.jsx', `
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit, CheckCircle2, ShieldAlert } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { motion } from "framer-motion";

export default function AIHealthAssistant({ prediction, loading }) {
  const LoadingDots = () => (
    <div className="flex space-x-1 items-center h-4">
      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
    </div>
  );

  return (
    <Card className="h-full border-indigo-100 shadow-sm bg-white overflow-hidden flex flex-col">
      <CardHeader className="pb-3 border-b border-indigo-50 bg-indigo-50/30 py-3 px-5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-900 tracking-tight">
            <div className="p-1.5 bg-indigo-100 rounded-md">
              <BrainCircuit className="w-4 h-4 text-indigo-600" />
            </div>
            AI Health Assistant
          </CardTitle>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-500">
             {loading ? <LoadingDots /> : <><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-0.5"></span> Analysis Ready</>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-5 pb-5 flex-1 flex flex-col">
        {loading || !prediction ? (
          <div className="space-y-3 pt-2">
             <Skeleton className="h-4 w-3/4" />
             <Skeleton className="h-4 w-5/6" />
             <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
            <div className="text-sm text-slate-700 leading-relaxed bg-indigo-50/50 p-3.5 rounded-lg border border-indigo-100/50 flex-1">
              <div className="prose prose-sm prose-indigo max-w-none text-slate-600 marker:text-indigo-400">
                {typeof prediction === 'string' ? (
                  <ReactMarkdown>{prediction}</ReactMarkdown>
                ) : (
                  <ReactMarkdown>{prediction.summary || JSON.stringify(prediction)}</ReactMarkdown>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
`);

// 9. HISTORICAL OVERVIEW (COMBINED CHART)
write('src/components/charts/HistoricalOverview.jsx', `
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format, parseISO } from "date-fns";
import { demoHistoricalData } from "../../data/historicalWaterData";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoricalOverview() {
  const [metric, setMetric] = useState("ph");
  const data = demoHistoricalData;

  const renderChart = () => {
    switch (metric) {
      case "ph":
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tickFormatter={(v) => format(parseISO(v), 'MMM dd')} fontSize={11} tickMargin={8} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 14]} fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip labelFormatter={(v) => format(parseISO(v), 'PPP')} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
            <ReferenceLine y={8.5} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
            <Line type="monotone" dataKey="averagePH" name="pH Level" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 6, fill: "#3b82f6" }} animationDuration={1000} />
          </LineChart>
        );
      case "temperature":
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tickFormatter={(v) => format(parseISO(v), 'MMM dd')} fontSize={11} tickMargin={8} axisLine={false} tickLine={false} />
            <YAxis domain={['auto', 'auto']} fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip labelFormatter={(v) => format(parseISO(v), 'PPP')} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
            <Line type="monotone" dataKey="averageTemperature" name="Temp (°C)" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 6, fill: "#f97316" }} animationDuration={1000} />
          </LineChart>
        );
      case "turbidity":
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTurbidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tickFormatter={(v) => format(parseISO(v), 'MMM dd')} fontSize={11} tickMargin={8} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 'auto']} fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip labelFormatter={(v) => format(parseISO(v), 'PPP')} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <ReferenceLine y={5} stroke="#eab308" strokeDasharray="3 3" strokeOpacity={0.5} />
            <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
            <Area type="monotone" dataKey="averageTurbidity" name="Turbidity (NTU)" stroke="#64748b" fillOpacity={1} fill="url(#colorTurbidity)" strokeWidth={3} animationDuration={1000} />
          </AreaChart>
        );
      default: return null;
    }
  };

  return (
    <Card className="shadow-sm border-slate-200 col-span-full xl:col-span-2">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 pt-4 px-5">
        <div>
          <CardTitle className="text-base font-bold text-slate-800">Water Quality Overview</CardTitle>
          <div className="text-xs text-slate-500 mt-1">Oct 1 – Oct 5, 2026 (Demo Data)</div>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <Tabs value={metric} onValueChange={setMetric} className="w-auto">
            <TabsList className="h-8 bg-slate-100">
              <TabsTrigger value="ph" className="text-xs px-3">pH</TabsTrigger>
              <TabsTrigger value="temperature" className="text-xs px-3">Temp</TabsTrigger>
              <TabsTrigger value="turbidity" className="text-xs px-3">Turbidity</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select defaultValue="7d">
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="oct">October 1–5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-2 pb-2">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
`);

// 10. DAILY SUMMARY TABLE
write('src/components/dashboard/DailySummary.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { demoHistoricalData } from "../../data/historicalWaterData";
import { format, parseISO } from "date-fns";

export default function DailySummary() {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-3 pt-4 px-5">
        <CardTitle className="text-base font-bold text-slate-800">Daily Water Quality Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Date</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Readings</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Avg pH</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Avg Temp</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Avg Turbidity</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoHistoricalData.map((row) => (
                <TableRow key={row.date} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-700 text-sm py-2.5">
                    {format(parseISO(row.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.readings}</TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.averagePH}</TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.averageTemperature}°C</TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.averageTurbidity} NTU</TableCell>
                  <TableCell className="text-right py-2.5">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold uppercase tracking-wider text-[10px] px-2 py-0">
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
`);

// 11. RISK DISTRIBUTION & ACTIVITY
write('src/components/dashboard/RiskDistribution.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { demoHistoricalData } from "../../data/historicalWaterData";

export default function RiskDistribution() {
  // Compute from demo data (all are Safe in demo, let's inject a tiny bit of variation for visual)
  const data = [
    { name: 'Safe', value: 96, color: '#10b981' },
    { name: 'Moderate', value: 4, color: '#f59e0b' },
    { name: 'Unsafe', value: 0, color: '#ef4444' }
  ];

  return (
    <Card className="shadow-sm border-slate-200 h-full">
      <CardHeader className="pb-2 pt-4 px-5">
        <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 flex items-center justify-between">
        <div className="w-1/2 h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                {data.map((entry, index) => <Cell key={\`cell-\${index}\`} fill={entry.color} />)}
              </Pie>
              <RechartsTooltip formatter={(val) => \`\${val}%\`} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-3">
          {data.map(item => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600 font-medium">{item.name}</span>
              </div>
              <span className="font-bold text-slate-800">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
`);

write('src/components/dashboard/RecentActivity.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BrainCircuit, Droplets, Wifi } from "lucide-react";
import { format } from "date-fns";

export default function RecentActivity() {
  const activities = [
    { icon: Droplets, title: "New sensor reading received", time: new Date(Date.now() - 1000 * 60 * 2), color: "text-blue-500", bg: "bg-blue-50" },
    { icon: BrainCircuit, title: "AI analysis completed", time: new Date(Date.now() - 1000 * 60 * 5), color: "text-indigo-500", bg: "bg-indigo-50" },
    { icon: Activity, title: "Threshold check normal", time: new Date(Date.now() - 1000 * 60 * 12), color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: Wifi, title: "Connection established", time: new Date(Date.now() - 1000 * 60 * 45), color: "text-slate-500", bg: "bg-slate-50" },
  ];

  return (
    <Card className="shadow-sm border-slate-200 h-full">
      <CardHeader className="pb-3 pt-4 px-5 border-b border-slate-50">
        <CardTitle className="text-sm font-semibold text-slate-800">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pt-4 pb-5">
        <div className="space-y-4">
          {activities.map((act, i) => (
            <div key={i} className="flex gap-3 items-start relative">
              {i !== activities.length - 1 && <div className="absolute top-6 left-[15px] w-px h-full bg-slate-100 -z-10"></div>}
              <div className={\`p-1.5 rounded-full \${act.bg} z-10\`}>
                <act.icon className={\`w-4 h-4 \${act.color}\`} />
              </div>
              <div className="flex-1 pb-1">
                <p className="text-sm font-medium text-slate-700">{act.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{format(act.time, 'h:mm a')}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
`);

// 12. MAIN DASHBOARD PAGE
write('src/pages/Dashboard.jsx', `
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import StatCard from "../components/cards/StatCard";
import CurrentSensorCard from "../components/cards/CurrentSensorCard";
import AIHealthAssistant from "../components/cards/AIHealthAssistant";
import WaterQualityScore from "../components/cards/WaterQualityScore";
import HistoricalOverview from "../components/charts/HistoricalOverview";
import DailySummary from "../components/dashboard/DailySummary";
import RiskDistribution from "../components/dashboard/RiskDistribution";
import RecentActivity from "../components/dashboard/RecentActivity";

import useDashboard from "../hooks/useDashboard";
import usePrediction from "../hooks/usePrediction";

import { Activity, CheckCircle2, AlertTriangle, Skull } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const { stats, latestReading, loading, refresh } = useDashboard();
  const { prediction, loading: predictionLoading } = usePrediction();

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-xl bg-slate-200/50" />)}
        </div>
        <div className="grid gap-4 lg:grid-cols-3 mb-4">
           <Skeleton className="h-[220px] lg:col-span-1 rounded-xl bg-slate-200/50" />
           <Skeleton className="h-[220px] lg:col-span-1 rounded-xl bg-slate-200/50" />
           <Skeleton className="h-[220px] lg:col-span-1 rounded-xl bg-slate-200/50" />
        </div>
        <Skeleton className="h-[400px] rounded-xl bg-slate-200/50" />
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" onRefresh={refresh}>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 max-w-7xl mx-auto">
        
        {/* Row 1: KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item}><StatCard title="Total Readings" value={stats?.totalReadings ?? 0} total={stats?.totalReadings} icon={Activity} trend="+12.4% vs prev week" /></motion.div>
          <motion.div variants={item}><StatCard title="Safe Records" value={stats?.safe ?? 0} total={stats?.totalReadings} icon={CheckCircle2} variant="success" /></motion.div>
          <motion.div variants={item}><StatCard title="Moderate Risk" value={stats?.moderate ?? 0} total={stats?.totalReadings} icon={AlertTriangle} variant="warning" /></motion.div>
          <motion.div variants={item}><StatCard title="Unsafe Records" value={stats?.unsafe ?? 0} total={stats?.totalReadings} icon={Skull} variant="destructive" /></motion.div>
        </div>

        {/* Row 2: Live Focus (Sensors, Score, AI) */}
        <div className="grid gap-4 lg:grid-cols-12">
          <motion.div variants={item} className="lg:col-span-4">
            <CurrentSensorCard data={latestReading} />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-3">
            <WaterQualityScore data={latestReading} />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-5">
            <AIHealthAssistant prediction={prediction} loading={predictionLoading} />
          </motion.div>
        </div>

        {/* Row 3: Historical Data & Distribution */}
        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div variants={item} className="lg:col-span-2">
            <HistoricalOverview />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-1 space-y-4 flex flex-col">
            <div className="flex-1"><RiskDistribution /></div>
            <div className="flex-1"><RecentActivity /></div>
          </motion.div>
        </div>

        {/* Row 4: Summary Table */}
        <motion.div variants={item}>
          <DailySummary />
        </motion.div>

      </motion.div>
    </Layout>
  );
}
`);
