import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { demoHistoricalData } from "../../data/historicalWaterData";
import { format, parseISO } from "date-fns";

export default function DailySummary() {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-3 pt-4 px-5">
        <CardTitle className="text-base font-bold text-slate-800">Daily Water Quality Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Date</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Readings</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Avg pH</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Avg Temp</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9">Avg Turbidity</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 h-9 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoHistoricalData.map((row) => (
                <TableRow key={row.date} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-700 text-sm py-2.5">
                    {format(parseISO(row.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.readings}</TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.averagePH}</TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.averageTemperature}°C</TableCell>
                  <TableCell className="text-sm py-2.5 text-slate-600">{row.averageTurbidity} NTU</TableCell>
                  <TableCell className="text-right py-2.5">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold uppercase tracking-wider text-[10px] px-2 py-0">
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
