import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit, CheckCircle2, ShieldAlert } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { motion } from "framer-motion";

export default function AIHealthAssistant({ prediction, loading }) {
  const LoadingDots = () => (
    <div className="flex space-x-1 items-center h-4">
      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
      <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
    </div>
  );

  return (
    <Card className="h-full border-indigo-100 shadow-sm bg-white overflow-hidden flex flex-col">
      <CardHeader className="pb-3 border-b border-indigo-50 bg-indigo-50/30 py-3 px-5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-900 tracking-tight">
            <div className="p-1.5 bg-indigo-100 rounded-md">
              <BrainCircuit className="w-4 h-4 text-indigo-600" />
            </div>
            AI Health Assistant
          </CardTitle>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-500">
             {loading ? <LoadingDots /> : <><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-0.5"></span> Analysis Ready</>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-5 pb-5 flex-1 flex flex-col">
        {loading || !prediction ? (
          <div className="space-y-3 pt-2">
             <Skeleton className="h-4 w-3/4" />
             <Skeleton className="h-4 w-5/6" />
             <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
            <div className="text-sm text-slate-700 leading-relaxed bg-indigo-50/50 p-3.5 rounded-lg border border-indigo-100/50 flex-1">
              <div className="prose prose-sm prose-indigo max-w-none text-slate-600 marker:text-indigo-400">
                {typeof prediction === 'string' ? (
                  <ReactMarkdown>{prediction}</ReactMarkdown>
                ) : (
                  <ReactMarkdown>{prediction.summary || JSON.stringify(prediction)}</ReactMarkdown>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
