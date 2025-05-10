import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Scan } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { format } from "date-fns";
import { AlertTriangle, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";



export default function ScanHistory() {
  const { data: scans, isLoading, refetch } = useQuery<Scan[]>({
    queryKey: ["/api/scans"]
  });

  return (
      <div>
    <div className="min-h-screen bg-gray-950 p-8">
       <Navbar />
      <div className="max-w-6xl mx-auto space-y-8 mt-14">

        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Scan History
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/">New Scan</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => refetch()}
            >
              <RotateCcw className="w-4 h-4 text-black-300" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Scan Table */}
        <Card className="bg-gray-900/50 shadow-lg rounded-lg">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-400 border-t-transparent shadow-md" />
              </div>
            ) : (
              <Table className="rounded-lg overflow-hidden">
                <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-300">
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Violations</TableHead>
                    <TableHead>Scanned At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scans?.map((scan) => (
                    <Link key={scan.id} href={`/scan/${scan.id}`} className="contents">
                      <TableRow className="cursor-pointer hover:bg-gray-800 transition">
                        <TableCell className="text-gray-300">{scan.fileName}</TableCell>
                        <TableCell className="text-gray-300">{scan.packageName}</TableCell>
                        <TableCell>
                          <Badge
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-colors duration-200
                              ${scan.status === "completed"
                                ? "bg-green-600/20 text-green-400 border-green-400/30"
                                : "bg-red-600/20 text-red-400 border-red-400/30"}
                              hover:bg-green-600/30 hover:text-green-500 hover:border-green-500/40`}
                          >
                            {scan.status === "completed" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            {scan.status}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {scan.policyViolations.length > 0 ? (
                            <Badge className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-600/20 text-red-400 border-red-400/30 hover:bg-red-600/40 hover:text-red-500 hover:border-red-500">
                              <AlertTriangle className="w-4 h-4" />
                              {scan.policyViolations.length} issues
                            </Badge>
                          ) : (
                            <Badge className="bg-green-600/20 text-green-400 border-green-400/30 px-3 py-1 rounded-lg hover:bg-red-600/20 hover:text-red-400 hover:border-red-400/30">
                              No issues
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell className="text-gray-400">
                          {format(new Date(scan.scannedAt), "PPp")}
                        </TableCell>
                      </TableRow>
                    </Link>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </div>
  );
}
