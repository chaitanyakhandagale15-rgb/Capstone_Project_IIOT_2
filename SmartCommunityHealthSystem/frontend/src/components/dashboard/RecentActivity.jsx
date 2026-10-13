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
              <div className={`p-1.5 rounded-full ${act.bg} z-10`}>
                <act.icon className={`w-4 h-4 ${act.color}`} />
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
