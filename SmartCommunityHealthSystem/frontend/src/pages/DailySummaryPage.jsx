import Layout from "../components/layout/Layout";
import DailySummary from "../components/dashboard/DailySummary";
import { motion } from "framer-motion";

export default function DailySummaryPage() {
  return (
    <Layout title="Daily Summary">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Daily Water Quality Summary</h1>
          <p className="text-slate-500 text-sm mt-1">Detailed daily breakdown of water quality metrics and safety status.</p>
        </div>
        <DailySummary />
      </motion.div>
    </Layout>
  );
}
