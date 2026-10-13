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
      const jsonMatch = prediction.match(/\{.*\}/s);
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
