import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

export default function TemperatureChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Temperature (°C)</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tickFormatter={(v) => format(new Date(v), 'MMM dd')} fontSize={12} tickMargin={8} />
              <YAxis fontSize={12} width={30} />
              <Tooltip labelFormatter={(v) => format(new Date(v), 'PP')} />
              <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="averageTemperature" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No data available</div>
        )}
      </CardContent>
    </Card>
  );
}
