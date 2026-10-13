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
