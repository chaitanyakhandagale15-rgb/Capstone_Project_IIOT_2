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
    <div className={`flex items-center text-[11px] font-medium mt-1 ${color}`}>
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
      <div className={`absolute top-0 w-full h-1.5 ${statusColor}`} />
      
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
