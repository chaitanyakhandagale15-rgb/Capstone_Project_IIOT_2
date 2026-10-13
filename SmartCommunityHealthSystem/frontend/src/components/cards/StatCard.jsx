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
