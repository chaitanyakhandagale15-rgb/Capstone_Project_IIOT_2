import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { demoHistoricalData } from "../../data/historicalWaterData";

export default function RiskDistribution() {
  // Compute from demo data
  const data = [
    { name: 'Safe', value: 60, color: '#10b981' },
    { name: 'Moderate', value: 20, color: '#f59e0b' },
    { name: 'Unsafe', value: 20, color: '#ef4444' }
  ];

  return (
    <Card className="shadow-sm border-slate-200 h-full">
      <CardHeader className="pb-2 pt-4 px-5">
        <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 flex items-center justify-between">
        <div className="w-1/2 h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <RechartsTooltip formatter={(val) => `${val}%`} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-3">
          {data.map(item => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600 font-medium">{item.name}</span>
              </div>
              <span className="font-bold text-slate-800">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
