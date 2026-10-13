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
      <div className={`absolute top-0 w-full h-1 ${isSafe ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-red-500'}`} />
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
