import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

export default function TurbidityChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Turbidity (NTU)</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTurbidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tickFormatter={(v) => format(new Date(v), 'MMM dd')} fontSize={12} tickMargin={8} />
              <YAxis fontSize={12} width={30} />
              <Tooltip labelFormatter={(v) => format(new Date(v), 'PP')} />
              <ReferenceLine y={5} stroke="#eab308" strokeDasharray="3 3" />
              <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="averageTurbidity" stroke="#64748b" fillOpacity={1} fill="url(#colorTurbidity)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No data available</div>
        )}
      </CardContent>
    </Card>
  );
}
