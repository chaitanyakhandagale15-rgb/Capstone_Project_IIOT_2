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
