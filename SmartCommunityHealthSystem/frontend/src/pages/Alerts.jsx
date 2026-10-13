import Layout from "../components/layout/Layout";
import useDashboard from "../hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert } from "lucide-react";
import { format } from "date-fns";

export default function Alerts() {
  const { alerts, loading } = useDashboard();

  return (
    <Layout title="System Alerts">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldAlert className="text-red-500" /> Alert History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="p-8 text-center text-muted-foreground">Loading alerts...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts?.map((alert) => (
                  <TableRow key={alert._id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(alert.createdAt), 'PP pp')}</TableCell>
                    <TableCell>{alert.deviceId || 'ESP32-001'}</TableCell>
                    <TableCell className="text-red-600 font-medium">{alert.message}</TableCell>
                    <TableCell>Unresolved</TableCell>
                  </TableRow>
                ))}
                {(!alerts || alerts.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No alerts found.</TableCell>
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
