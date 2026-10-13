const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const fullPath = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Wrote ${p}`);
};

// 1. Layout & Sidebar & Navbar
write('src/components/layout/Layout.jsx', `
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children, title = "Dashboard", onRefresh }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar title={title} onRefresh={onRefresh} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
`);

write('src/components/layout/Sidebar.jsx', `
import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, History, AlertTriangle, Settings, Droplet } from "lucide-react";
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
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "History", url: "/history", icon: History },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <Droplet className="h-6 w-6" />
          <span>Aqua AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
`);

write('src/components/layout/Navbar.jsx', `
import { RefreshCw, Bell, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Navbar({ title, onRefresh }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check global socket or recreate a lightweight status check
    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", { transports: ["websocket"] });
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    return () => socket.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      
      <div className="ml-auto flex items-center gap-4">
        {connected ? (
          <Badge variant="outline" className="text-green-600 border-green-600/30 bg-green-50 dark:bg-green-950/20">
            <Wifi className="mr-1 h-3 w-3" /> Connected
          </Badge>
        ) : (
          <Badge variant="outline" className="text-red-600 border-red-600/30 bg-red-50 dark:bg-red-950/20">
            <Wifi className="mr-1 h-3 w-3" /> Disconnected
          </Badge>
        )}
        
        {onRefresh && (
          <Button variant="outline" size="icon" onClick={onRefresh} title="Refresh Data">
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600"></span>
        </Button>
      </div>
    </header>
  );
}
`);

// 2. Dashboard
write('src/pages/Dashboard.jsx', `
import { Link } from "react-router-dom";
import { Activity, CheckCircle2, AlertTriangle, Skull, Droplets, Thermometer, Wind, RefreshCcw } from "lucide-react";
import Layout from "../components/layout/Layout";
import StatCard from "../components/cards/StatCard";
import PHChart from "../components/charts/PHChart";
import TemperatureChart from "../components/charts/TemperatureChart";
import TurbidityChart from "../components/charts/TurbidityChart";
import LatestReading from "../components/common/LatestReading";
import AlertsPanel from "../components/common/AlertsPanel";
import WeatherCard from "../components/cards/WeatherCard";
import AIPredictionCard from "../components/cards/AIPredictionCard";
import SmartWarningCard from "../components/cards/SmartWarningCard";

import useDashboard from "../hooks/useDashboard";
import useWeather from "../hooks/useWeather";
import useWarnings from "../hooks/useWarnings";
import usePrediction from "../hooks/usePrediction";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { stats, chartData, latestReading, alerts, loading, refresh } = useDashboard();
  const { weather, loading: weatherLoading } = useWeather();
  const { warnings } = useWarnings();
  const { prediction, loading: predictionLoading } = usePrediction();

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
           <Skeleton className="h-[400px] lg:col-span-2 rounded-xl" />
           <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" onRefresh={refresh}>
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Readings" value={stats?.totalReadings ?? 0} icon={Activity} trend="Live Tracking" />
        <StatCard title="Safe Records" value={stats?.safe ?? 0} icon={CheckCircle2} variant="success" />
        <StatCard title="Moderate Risk" value={stats?.moderate ?? 0} icon={AlertTriangle} variant="warning" />
        <StatCard title="Unsafe Records" value={stats?.unsafe ?? 0} icon={Skull} variant="destructive" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left Column - Real-time & Weather */}
        <div className="lg:col-span-1 space-y-6">
          <LatestReading data={latestReading} />
          {weatherLoading ? <Skeleton className="h-48 rounded-xl" /> : <WeatherCard weather={weather} />}
          <SmartWarningCard warnings={warnings} />
        </div>

        {/* Right Column - AI & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <AIPredictionCard prediction={prediction} loading={predictionLoading} />
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <PHChart data={chartData} />
        <TemperatureChart data={chartData} />
        <TurbidityChart data={chartData} />
      </div>

    </Layout>
  );
}
export default Dashboard;
`);

// 3. Components
write('src/components/cards/StatCard.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatCard({ title, value, icon: Icon, variant = "default", trend }) {
  const colors = {
    default: "text-blue-500",
    success: "text-emerald-500",
    warning: "text-amber-500",
    destructive: "text-red-500"
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("h-5 w-5", colors[variant])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </CardContent>
    </Card>
  );
}
`);

write('src/components/common/LatestReading.jsx', `
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, Thermometer, Activity, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function LatestReading({ data }) {
  if (!data) return null;

  const isSafe = data.waterQuality === "Safe";
  const isWarning = data.waterQuality === "Moderate";

  return (
    <Card className="relative overflow-hidden">
      <div className={\`absolute top-0 w-full h-1 \${isSafe ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-red-500'}\`} />
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Current Sensor Data</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge variant={isSafe ? "outline" : isWarning ? "secondary" : "destructive"} 
                 className={isSafe ? "text-emerald-600 border-emerald-200 bg-emerald-50" : ""}>
            {data.waterQuality}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <Droplet className="w-5 h-5 text-blue-500 mb-2" />
            <span className="text-xl font-bold">{data.ph}</span>
            <span className="text-xs text-muted-foreground">pH Level</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <Thermometer className="w-5 h-5 text-orange-500 mb-2" />
            <span className="text-xl font-bold">{data.temperature}°</span>
            <span className="text-xs text-muted-foreground">Temp (C)</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <Activity className="w-5 h-5 text-slate-500 mb-2" />
            <span className="text-xl font-bold">{data.turbidity}</span>
            <span className="text-xs text-muted-foreground">NTU</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
`);

write('src/components/cards/AIPredictionCard.jsx', `
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export default function AIPredictionCard({ prediction, loading }) {
  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-indigo-500" /> AI Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!prediction) return null;

  // Assuming prediction might be a JSON string or object from Cloudflare AI
  let data = prediction;
  if (typeof prediction === 'string') {
    try {
      // Find JSON block in string if it's wrapped in markdown
      const jsonMatch = prediction.match(/\\{.*\\}/s);
      if (jsonMatch) data = JSON.parse(jsonMatch[0]);
    } catch (e) {
      // fallback
    }
  }

  const isHighRisk = data?.risk?.toLowerCase() === 'high';
  const isModRisk = data?.risk?.toLowerCase() === 'moderate';

  return (
    <Card className="h-full border-indigo-100 dark:border-indigo-900/50 shadow-sm">
      <CardHeader className="pb-3 bg-indigo-50/50 dark:bg-indigo-950/20 border-b border-indigo-100/50">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
            <BrainCircuit className="w-5 h-5" /> 
            AI Health Assistant
          </CardTitle>
          {data?.risk && (
            <Badge variant={isHighRisk ? "destructive" : isModRisk ? "warning" : "outline"} className={!isHighRisk && !isModRisk ? "border-emerald-200 text-emerald-600 bg-emerald-50" : ""}>
              {data.risk} Risk
            </Badge>
          )}
        </div>
        <CardDescription>Powered by LLaMA 3.1 8B</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {data?.diseases?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2 text-slate-700 dark:text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Potential Health Risks
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.diseases.map((d, i) => (
                <Badge key={i} variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-100">{d}</Badge>
              ))}
            </div>
          </div>
        )}

        {data?.prevention?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2 text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Recommended Actions
            </h4>
            <ul className="text-sm space-y-1.5 text-muted-foreground">
              {data.prevention.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2 text-slate-700 dark:text-slate-300">
            <Activity className="w-4 h-4 text-blue-500" /> Summary
          </h4>
          <div className="text-sm text-muted-foreground leading-relaxed bg-slate-50 dark:bg-slate-900 p-3 rounded-md border">
            {typeof data === 'string' ? <ReactMarkdown>{data}</ReactMarkdown> : data.summary || "No summary provided."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
`);

write('src/components/cards/WeatherCard.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, ThermometerSun } from "lucide-react";

export default function WeatherCard({ weather }) {
  if (!weather || !weather.current) return null;
  const { current, location } = weather;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
          <span>Local Weather</span>
          <span className="text-xs">{location.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <img src={current.condition.icon} alt={current.condition.text} className="w-12 h-12" />
          <div>
            <div className="text-3xl font-bold">{current.temp_c}°C</div>
            <div className="text-sm text-muted-foreground">{current.condition.text}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-400" /> {current.humidity}%</div>
          <div className="flex items-center gap-2"><Wind className="w-4 h-4 text-slate-400" /> {current.wind_kph} km/h</div>
        </div>
      </CardContent>
    </Card>
  );
}
`);

write('src/components/common/AlertsPanel.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BellRing, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function AlertsPanel({ alerts }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BellRing className="w-5 h-5 text-amber-500" /> Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pt-4 space-y-3">
        {alerts && alerts.length > 0 ? (
          alerts.slice(0, 4).map((alert, idx) => (
            <Alert key={alert._id || idx} variant="destructive" className="bg-red-50 dark:bg-red-950/20">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle className="text-xs font-semibold">System Warning</AlertTitle>
              <AlertDescription className="text-xs mt-1">
                {alert.message}
                <div className="text-[10px] opacity-70 mt-1">
                  {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                </div>
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <ShieldAlert className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-sm">No recent alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
`);

write('src/components/cards/SmartWarningCard.jsx', `
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function SmartWarningCard({ warnings }) {
  if (!warnings || warnings.length === 0) return null;
  
  return (
    <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900">
      <CardContent className="p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-800 dark:text-amber-500">Active Warnings</h4>
          <ul className="text-sm text-amber-700 dark:text-amber-400 mt-1 space-y-1">
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
`);

// 4. Update Charts to use standard shadcn Card wrappers
write('src/components/charts/PHChart.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

export default function PHChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">pH Level History</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="createdAt" tickFormatter={(v) => format(new Date(v), 'HH:mm')} fontSize={12} tickMargin={8} />
              <YAxis domain={[0, 14]} fontSize={12} width={30} />
              <Tooltip labelFormatter={(v) => format(new Date(v), 'PP pp')} />
              <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="3 3" />
              <ReferenceLine y={8.5} stroke="#ef4444" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No data available</div>
        )}
      </CardContent>
    </Card>
  );
}
`);

write('src/components/charts/TemperatureChart.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

export default function TemperatureChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Temperature (°C)</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="createdAt" tickFormatter={(v) => format(new Date(v), 'HH:mm')} fontSize={12} tickMargin={8} />
              <YAxis fontSize={12} width={30} />
              <Tooltip labelFormatter={(v) => format(new Date(v), 'PP pp')} />
              <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No data available</div>
        )}
      </CardContent>
    </Card>
  );
}
`);

write('src/components/charts/TurbidityChart.jsx', `
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

export default function TurbidityChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Turbidity (NTU)</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTurbidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="createdAt" tickFormatter={(v) => format(new Date(v), 'HH:mm')} fontSize={12} tickMargin={8} />
              <YAxis fontSize={12} width={30} />
              <Tooltip labelFormatter={(v) => format(new Date(v), 'PP pp')} />
              <ReferenceLine y={5} stroke="#eab308" strokeDasharray="3 3" />
              <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="turbidity" stroke="#64748b" fillOpacity={1} fill="url(#colorTurbidity)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No data available</div>
        )}
      </CardContent>
    </Card>
  );
}
`);

// Other pages: Alerts, History
write('src/pages/Alerts.jsx', `
import Layout from "../components/layout/Layout";
import useDashboard from "../hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert } from "lucide-react";
import { format } from "date-fns";

export default function Alerts() {
  const { alerts, loading } = useDashboard();

  return (
    <Layout title="System Alerts">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldAlert className="text-red-500" /> Alert History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="p-8 text-center text-muted-foreground">Loading alerts...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts?.map((alert) => (
                  <TableRow key={alert._id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(alert.createdAt), 'PP pp')}</TableCell>
                    <TableCell>{alert.deviceId || 'ESP32-001'}</TableCell>
                    <TableCell className="text-red-600 font-medium">{alert.message}</TableCell>
                    <TableCell>Unresolved</TableCell>
                  </TableRow>
                ))}
                {(!alerts || alerts.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No alerts found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
`);

write('src/pages/History.jsx', `
import Layout from "../components/layout/Layout";
import useDashboard from "../hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";
import { format } from "date-fns";

export default function History() {
  const { chartData: history, loading } = useDashboard(); // using chartData as a quick history array

  return (
    <Layout title="Data History">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Database className="text-blue-500" /> Sensor Readings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="p-8 text-center text-muted-foreground">Loading data...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>pH</TableHead>
                  <TableHead>Temp (°C)</TableHead>
                  <TableHead>Turbidity (NTU)</TableHead>
                  <TableHead>Quality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history?.slice().reverse().map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(record.createdAt), 'PP pp')}</TableCell>
                    <TableCell>{record.ph}</TableCell>
                    <TableCell>{record.temperature}</TableCell>
                    <TableCell>{record.turbidity}</TableCell>
                    <TableCell>
                      <Badge variant={record.waterQuality === 'Safe' ? 'outline' : 'secondary'} 
                             className={record.waterQuality === 'Safe' ? 'text-emerald-600' : record.waterQuality === 'Unsafe' ? 'text-red-600' : ''}>
                        {record.waterQuality}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {(!history || history.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No data found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
`);
