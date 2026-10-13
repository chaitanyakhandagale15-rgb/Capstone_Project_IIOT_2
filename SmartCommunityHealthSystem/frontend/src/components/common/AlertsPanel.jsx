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
