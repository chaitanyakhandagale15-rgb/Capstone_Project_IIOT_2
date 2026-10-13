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
          <div className={`font-bold ${color}`}>{status}</div>
          <div className="text-xs text-muted-foreground mt-1 px-4 leading-relaxed">
            Based on current pH, temperature and turbidity levels.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
