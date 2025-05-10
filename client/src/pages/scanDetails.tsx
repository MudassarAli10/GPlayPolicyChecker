import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, RotateCcw } from "lucide-react";
import ScanResults from "../components/scan-results";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";



export default function ScanDetails() {
  const [match, params] = useRoute("/scan/:id");
  const scanId = params?.id;

  const { data: scan, isLoading, error, refetch } = useQuery({
    queryKey: ["scan", scanId],
    queryFn: async () => {
      const res = await fetch(`/api/scans/${scanId}`);
      if (!res.ok) throw new Error("Failed to fetch scan details");
      return res.json();
    },
    enabled: !!scanId,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-400 drop-shadow-lg" />
        <p className="text-lg text-gray-400">Fetching scan details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 drop-shadow-lg" />
        <p className="text-lg text-red-400">{error.message}</p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => window.location.href = "/"}
            className="hover:bg-gray-800 transition"
          >
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="flex items-center gap-2 hover:bg-blue-600/80 transition text-white px-4 py-2 shadow-md rounded-lg"
          >
            <RotateCcw className="w-4 h-4 text-blue-300" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
    <Navbar />
      <div className="min-h-screen bg-gray-950 p-8 ">
        <div className="max-w-4xl mx-auto space-y-8 mt-14">
          <Card className="shadow-xl border border-gray-800/50 bg-gray-900/50 rounded-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  Scan Details
                </h1>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/history"}
                  className="hover:bg-gray-100 transition"
                >
                  Back to History
                </Button>
              </div>
              <ScanResults scan={scan} />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );

}
