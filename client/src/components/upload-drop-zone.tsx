import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { UploadCloud, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Scan } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // Utility for conditional class names

interface Props {
  onScanComplete: (scan: Scan) => void;
}

export default function UploadDropZone({ onScanComplete }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("apk", file);

      return new Promise<Scan>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.responseText || "Upload failed"));
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Network error occurred"));
        });

        xhr.open("POST", "/api/scans");
        xhr.send(formData);
      });
    },
    onSuccess: (scan: Scan) => {
      setUploadProgress(100);
      onScanComplete(scan);
      toast({
        title: "Upload Successful",
        description: "Your APK has been uploaded and analyzed!",
        icon: <CheckCircle className="text-green-500 w-5 h-5" />,
      });
    },
    onError: (error: Error) => {
      setUploadProgress(0);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Something went wrong while uploading.",
        icon: <XCircle className="text-red-500 w-5 h-5" />,
      });
    },
  });

  const handleFileUpload = (file: File | null) => {
    if (!file || !file.name.endsWith(".apk")) {
      toast({
        variant: "destructive",
        title: "Invalid File",
        description: "Only APK files are allowed. Please try again.",
      });
      return;
    }
    uploadFile(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files[0]);
  }, []);

  return (
    <Card
      className={cn(
        "relative border-2 border-dashed rounded-xl p-10 text-center transition-all",
        "shadow-md hover:shadow-lg hover:scale-[1.02] bg-gray-900",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => {
        if (isPending) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".apk";
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) handleFileUpload(file);
        };
        input.click();
      }}
    >
      {/* Disable interactions only inside the card while uploading */}
      {isPending && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-xl z-10">
          <p className="text-gray-600 text-lg font-medium animate-pulse">Uploading... {uploadProgress}%</p>
        </div>
      )}

      <div className={`flex flex-col items-center justify-center space-y-6 ${isPending ? "pointer-events-none" : ""}`}>
        <div className="p-6 bg-blue-100 rounded-full ring-2 ring-gray-300 hover:ring-blue-500 transition-transform duration-200 hover:scale-110">
          <UploadCloud className="w-14 h-14 text-blue-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-gray-200">Upload Your APK</h3>
          <p className="text-sm text-gray-300">
            Drag & drop your APK file here or{" "}
            <span className="font-medium text-blue-600 hover:underline">browse</span> to select.
          </p>
        </div>

        {isPending && (
          <div className="w-full max-w-md space-y-4">
            <Progress value={uploadProgress} className="h-2 bg-gray-200 rounded-full" />
          </div>
        )}
      </div>
    </Card>
  );
}
