import Layout from "../components/layout/Layout";
import useDashboard from "../hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";
import { format } from "date-fns";

export default function History() {
  const { history, loading } = useDashboard(); // using the correct history array from the hook

  return (
    <Layout title="Data History">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Database className="text-blue-500" /> Sensor Readings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="p-8 text-center text-muted-foreground">Loading data...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>pH</TableHead>
                  <TableHead>Temp (°C)</TableHead>
                  <TableHead>Turbidity (NTU)</TableHead>
                  <TableHead>Quality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history?.slice().reverse().map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(record.createdAt), 'PP pp')}</TableCell>
                    <TableCell>{record.ph}</TableCell>
                    <TableCell>{record.temperature}</TableCell>
                    <TableCell>{record.turbidity}</TableCell>
                    <TableCell>
                      <Badge variant={record.waterQuality === 'Safe' ? 'outline' : 'secondary'} 
                             className={record.waterQuality === 'Safe' ? 'text-emerald-600' : record.waterQuality === 'Unsafe' ? 'text-red-600' : ''}>
                        {record.waterQuality}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {(!history || history.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No data found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
