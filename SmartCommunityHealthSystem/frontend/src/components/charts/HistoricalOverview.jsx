import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from "recharts";
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
          <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tickFormatter={(v) => format(parseISO(v), 'MMM dd')} fontSize={11} tickMargin={12} axisLine={false} tickLine={false} />
            <YAxis domain={[4, 10]} fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip labelFormatter={(v) => format(parseISO(v), 'PPP')} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.7}>
              <Label value="Min Safe pH (6.5)" position="insideBottomRight" fill="#ef4444" fontSize={11} />
            </ReferenceLine>
            <ReferenceLine y={8.5} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.7}>
              <Label value="Max Safe pH (8.5)" position="insideTopRight" fill="#ef4444" fontSize={11} />
            </ReferenceLine>
            <Line type="monotone" dataKey="averagePH" name="pH Level" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 6, fill: "#3b82f6" }} animationDuration={1000} />
          </LineChart>
        );
      case "temperature":
        return (
          <AreaChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tickFormatter={(v) => format(parseISO(v), 'MMM dd')} fontSize={11} tickMargin={12} axisLine={false} tickLine={false} />
            <YAxis domain={[20, 40]} fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip labelFormatter={(v) => format(parseISO(v), 'PPP')} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.8} strokeWidth={2}>
               <Label value="High Temp Warning (35°C)" position="insideBottomRight" fill="#ef4444" fontSize={11} />
            </ReferenceLine>
            <Area type="monotone" dataKey="averageTemperature" name="Temp (°C)" stroke="#f97316" fill="url(#colorTemp)" strokeWidth={3} animationDuration={1000} />
          </AreaChart>
        );
      case "turbidity":
        return (
          <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tickFormatter={(v) => format(parseISO(v), 'MMM dd')} fontSize={11} tickMargin={12} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 15]} fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip labelFormatter={(v) => format(parseISO(v), 'PPP')} cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <ReferenceLine y={5} stroke="#eab308" strokeDasharray="3 3" strokeOpacity={0.8}>
               <Label value="Moderate Risk (5 NTU)" position="insideTopRight" fill="#ca8a04" fontSize={11} />
            </ReferenceLine>
            <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.8}>
               <Label value="Unsafe Turbidity (10 NTU)" position="insideBottomRight" fill="#ef4444" fontSize={11} />
            </ReferenceLine>
            <Bar dataKey="averageTurbidity" name="Turbidity (NTU)" fill="#64748b" radius={[4, 4, 0, 0]} animationDuration={1000} />
          </BarChart>
        );
      default: return null;
    }
  };

  return (
    <Card className="shadow-sm border-slate-200 col-span-full xl:col-span-2">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 pt-4 px-5">
        <div>
          <CardTitle className="text-base font-bold text-slate-800">Water Quality Overview</CardTitle>
          <div className="text-xs text-slate-500 mt-1">Last 30 Days (Demo Data)</div>
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
