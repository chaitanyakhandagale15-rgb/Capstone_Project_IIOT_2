import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import StatCard from "../components/cards/StatCard";
import CurrentSensorCard from "../components/cards/CurrentSensorCard";
import AIHealthAssistant from "../components/cards/AIHealthAssistant";
import WaterQualityScore from "../components/cards/WaterQualityScore";
import HistoricalOverview from "../components/charts/HistoricalOverview";
import RiskDistribution from "../components/dashboard/RiskDistribution";
import RecentActivity from "../components/dashboard/RecentActivity";

import useDashboard from "../hooks/useDashboard";
import usePrediction from "../hooks/usePrediction";

import { Activity, CheckCircle2, AlertTriangle, Skull } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const { stats, latestReading, loading, refresh } = useDashboard();
  const { prediction, loading: predictionLoading } = usePrediction();

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-xl bg-slate-200/50" />)}
        </div>
        <div className="grid gap-4 lg:grid-cols-3 mb-4">
           <Skeleton className="h-[220px] lg:col-span-1 rounded-xl bg-slate-200/50" />
           <Skeleton className="h-[220px] lg:col-span-1 rounded-xl bg-slate-200/50" />
           <Skeleton className="h-[220px] lg:col-span-1 rounded-xl bg-slate-200/50" />
        </div>
        <Skeleton className="h-[400px] rounded-xl bg-slate-200/50" />
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" onRefresh={refresh}>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 max-w-7xl mx-auto">
        
        {/* Row 1: KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item}><StatCard title="Total Readings" value={stats?.totalReadings ?? 0} total={stats?.totalReadings} icon={Activity} trend="+12.4% vs prev week" /></motion.div>
          <motion.div variants={item}><StatCard title="Safe Records" value={stats?.safe ?? 0} total={stats?.totalReadings} icon={CheckCircle2} variant="success" /></motion.div>
          <motion.div variants={item}><StatCard title="Moderate Risk" value={stats?.moderate ?? 0} total={stats?.totalReadings} icon={AlertTriangle} variant="warning" /></motion.div>
          <motion.div variants={item}><StatCard title="Unsafe Records" value={stats?.unsafe ?? 0} total={stats?.totalReadings} icon={Skull} variant="destructive" /></motion.div>
        </div>

        {/* Row 2: Live Focus (Sensors, Score, AI) */}
        <div className="grid gap-4 lg:grid-cols-12">
          <motion.div variants={item} className="lg:col-span-4">
            <CurrentSensorCard data={latestReading} />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-3">
            <WaterQualityScore data={latestReading} />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-5">
            <AIHealthAssistant prediction={prediction} loading={predictionLoading} />
          </motion.div>
        </div>

        {/* Row 3: Historical Data & Distribution */}
        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div variants={item} className="lg:col-span-2">
            <HistoricalOverview />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-1 space-y-4 flex flex-col">
            <div className="flex-1"><RiskDistribution /></div>
            <div className="flex-1"><RecentActivity /></div>
          </motion.div>
        </div>

      </motion.div>
    </Layout>
  );
}
