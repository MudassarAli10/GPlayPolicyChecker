import { type Scan, type PolicyViolation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Code } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, CheckCircle, Download, RotateCcw, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import jsPDF from "jspdf";

interface Props {
  scan: Scan;
  onReset: () => void;
}

const getViolationImpact = (severity: string) => {
  switch (severity) {
    case "high":
      return "High impact - May prevent app approval";
    case "medium":
      return "Medium impact - Requires attention before release";
    case "low":
      return "Low impact - Consider fixing in future updates";
    default:
      return "";
  }
};

const getRemediationSteps = (category: string) => {
  switch (category) {
    case "SDK Version":
      return [
        "1. Update build.gradle targetSdkVersion",
        "2. Test app compatibility",
        "3. Review API changes",
        "4. Update deprecated code"
      ];
    case "Privacy Policy":
      return [
        "1. Create comprehensive privacy policy",
        "2. Add policy URL to manifest",
        "3. Implement user consent flow",
        "4. Review data collection practices"
      ];
    case "Battery Usage":
      return [
        "1. Implement WorkManager",
        "2. Optimize background services",
        "3. Add battery optimization exceptions",
        "4. Monitor battery consumption"
      ];
    case "Performance":
      return [
        "1. Move heavy operations to background",
        "2. Implement proper threading",
        "3. Add ANR monitoring",
        "4. Optimize service lifecycle"
      ];
    default:
      return [];
  }
};

const getCodeExample = (category: string) => {
  switch (category) {
    case "SDK Version":
      return `// In build.gradle
android {
    defaultConfig {
        targetSdkVersion 31
        // ...
    }
}`;
    case "Privacy Policy":
      return `// In AndroidManifest.xml
<application>
    <meta-data
        android:name="privacy_policy_url"
        android:value="https://example.com/privacy" />
</application>`;
    case "Battery Usage":
      return `// Using WorkManager
val workRequest = PeriodicWorkRequestBuilder<MyWorker>(1, TimeUnit.HOURS)
    .setConstraints(Constraints.Builder()
        .setRequiresBatteryNotLow(true)
        .build())
    .build()

WorkManager.getInstance(context).enqueue(workRequest)`;
    case "Performance":
      return `// Proper background threading
coroutineScope.launch(Dispatchers.IO) {
    // Heavy operation
    withContext(Dispatchers.Main) {
        // Update UI
    }
}`;
    default:
      return "";
  }
};

export default function ScanResults({ scan, onReset }: Props) {
 const downloadReport = () => {
   const doc = new jsPDF();

   // **Header Section**
   doc.setFont("helvetica", "bold");
   doc.setFontSize(18);
   doc.setTextColor(0, 102, 204); // Blue color
   doc.text("PlayPolicyChecker Report", 10, 10);

   doc.setFontSize(12);
   doc.setTextColor(0, 0, 0); // Black color
   doc.text(`Generated on: ${new Date().toLocaleString()}`, 10, 20);

   doc.setLineWidth(0.5);
   doc.line(10, 25, 200, 25); // Horizontal line for separation

   // **Scan Details**
   doc.setFont("helvetica", "bold");
   doc.setFontSize(14);
   doc.text(scan.fileName, 10, 35);
   doc.setFont("helvetica", "normal");
   doc.setFontSize(12);
   doc.text(`Package: ${scan.packageName}`, 10, 45);
   doc.text(`SDK Version: ${scan.sdkVersion}`, 10, 55);
   doc.text(`Permissions Count: ${scan.permissions.length}`, 10, 65);

   let yOffset = 75;
   doc.setFont("helvetica", "normal");

   // **Policy Violations**
   if (scan.policyViolations.length > 0) {
     doc.setFont("helvetica", "bold");
     doc.setTextColor(204, 0, 0); // Red color for heading
     doc.text("Policy Violations:", 10, yOffset);
     doc.setTextColor(0, 0, 0); // Reset to black
     doc.setFont("helvetica", "normal");
     yOffset += 10;

     scan.policyViolations.forEach((violation, index) => {
       if (yOffset > 270) {
         doc.addPage();
         yOffset = 20;
         addWatermark(doc);
       }
       doc.setFont("helvetica", "bold");
       doc.text(`${index + 1}. ${violation.category} (${violation.severity})`, 10, yOffset);
       doc.setFont("helvetica", "normal");
       doc.text(`- Description: ${violation.description}`, 15, yOffset + 10);
       doc.text(`- Impact: ${getViolationImpact(violation.severity)}`, 15, yOffset + 20);
       doc.text(`- Resolution: ${violation.resolution}`, 15, yOffset + 30);
       yOffset += 40;
     });
   } else {
     doc.text("No policy violations found", 10, yOffset);
   }

   // **Footer**
   addFooter(doc);

   // **Watermark**
   addWatermark(doc);

   // **Save Report**
   doc.save(`${scan.fileName}-report.pdf`);
 };

 // **Function to Add Watermark**
 const addWatermark = (doc) => {
   doc.setFontSize(30);
   doc.setTextColor(200, 200, 200); // Light gray
   doc.setFont("helvetica", "bold");
   doc.text("PlayPolicyChecker", 35, 150, { angle: 45, opacity: 0.5 });
 };

 // **Function to Add Footer**
 const addFooter = (doc) => {
   const pageCount = doc.internal.getNumberOfPages();
   for (let i = 1; i <= pageCount; i++) {
     doc.setPage(i);
     doc.setFontSize(10);
     doc.setTextColor(100, 100, 100);
     doc.text("PlayPolicyChecker - www.playpolicychecker.com", 10, 285);
     doc.text(`Page ${i} of ${pageCount}`, 180, 285);
   }
 };


  // Group violations by severity
  const violationsBySeverity = scan.policyViolations.reduce((acc, violation) => {
    if (!acc[violation.severity]) {
      acc[violation.severity] = [];
    }
    acc[violation.severity].push(violation);
    return acc;
  }, {} as Record<string, PolicyViolation[]>);

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4">
      <div className="flex justify-between items-start bg-gray-900/50 p-4 rounded-lg shadow-lg">
        {/* Left Side - File Info */}
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
            {scan.fileName}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Package: <span className="text-gray-300 font-medium">{scan.packageName}</span>
          </p>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadReport}
            className="bg-gray-800/40 backdrop-md hover:bg-white transition-all text-white px-4 py-2 flex items-center gap-2 shadow-md rounded-lg"
          >
            <Download className="w-5 h-5 text-black-300" />
            <span className="font-medium">Download Report</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="bg-gray-800/40 backdrop-md hover:bg-white transition-all text-white px-4 py-2 flex items-center gap-2 shadow-md rounded-lg"
          >
            <RotateCcw className="w-5 h-5 text-black-300" />
            <span className="font-medium">New Scan</span>
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-4 gap-6">
        {/* SDK Version */}
        <Card className="p-6 bg-gray-800/50 backdrop-lg rounded-xl shadow-lg transition-all hover:scale-[1.03] hover:bg-gray-800/70">
          <div className="text-sm font-semibold text-gray-400">SDK Version</div>
          <div className="text-3xl font-extrabold mt-2 text-white drop-shadow-md">
            {scan.sdkVersion}
          </div>
        </Card>

        {/* Permissions Count */}
        <Card className="p-6 bg-gray-800 rounded-xl shadow-lg transition-all hover:scale-[1.03] hover:bg-gray-800/70">
          <div className="text-sm font-semibold text-gray-400">Permissions</div>
          <div className="text-3xl font-extrabold mt-2 text-white drop-shadow-md">
            {scan.permissions.length}
          </div>
        </Card>

        {/* High-Risk Issues */}
        <Card className="p-6 bg-gray-800 rounded-xl shadow-lg transition-all hover:scale-[1.03] hover:bg-gray-800/70">
          <div className="text-sm font-semibold text-gray-400">High Risk Issues</div>
          <div className="text-3xl font-extrabold mt-2 flex items-center gap-2 text-white drop-shadow-md">
            {violationsBySeverity.high?.length || 0}
            {violationsBySeverity.high?.length ? (
              <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse drop-shadow-md" />
            ) : (
              <CheckCircle className="w-6 h-6 text-green-500 drop-shadow-md" />
            )}
          </div>
        </Card>

        {/* Other Issues */}
        <Card className="p-6 bg-gray-800/50 backdrop-lg rounded-xl shadow-lg transition-all hover:scale-[1.03] hover:bg-gray-800/70">
          <div className="text-sm font-semibold text-gray-400">Other Issues</div>
          <div className="text-3xl font-extrabold mt-2 flex items-center gap-2 text-white drop-shadow-md">
            {(violationsBySeverity.medium?.length || 0) + (violationsBySeverity.low?.length || 0)}
            <Shield className="w-6 h-6 text-yellow-500 drop-shadow-md" />
          </div>
        </Card>
      </div>


      <Tabs defaultValue="violations" className="w-full">
        {/* Tabs Navigation */}
        <TabsList>
                  <TabsTrigger value="violations" className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 drop-shadow" />
                    <span className="font-semibold">Policy Violations</span>
                  </TabsTrigger>
                  <TabsTrigger value="permissions" className="flex items-center gap-1">
                    <Shield className="w-5 h-5 gap-2 text-blue-500 drop-shadow" />
                    <span className="font-semibold ">Permissions</span>
                  </TabsTrigger>
                </TabsList>

        {/* Policy Violations Tab */}
        <TabsContent value="violations" className="mt-6">
          {scan.policyViolations.length === 0 ? (
            <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-lg shadow-md">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">No policy violations found</span>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {scan.policyViolations.map((violation: PolicyViolation, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-gray-800 rounded-xl shadow-md hover:scale-[1.02] transition-all">
                  <AccordionTrigger className="hover:no-underline px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      {/* Icon with animated attention effect */}
                      <AlertTriangle
                        className={`w-6 h-6 drop-shadow-md transition-transform duration-200 ${
                          violation.severity === 'high' ? 'text-red-500 animate-pulse' :
                          violation.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`}
                      />

                      {/* Category Name */}
                      <span className="font-semibold text-white tracking-wide drop-shadow">
                        {violation.category}
                      </span>

                      {/* Severity Badge */}
                      <Badge
                        variant="outline"
                        className={`ml-auto text-sm font-bold px-3 py-1.5 rounded-full border border-opacity-50 shadow-sm transition-all ${
                          violation.severity === 'high' ? 'text-red-600 bg-red-100 border-red-500 shadow-red-400/50' :
                          violation.severity === 'medium' ? 'text-yellow-600 bg-yellow-100 border-yellow-500 shadow-yellow-400/50' :
                          'text-blue-600 bg-blue-100 border-blue-500 shadow-blue-400/50'
                        }`}
                      >
                        {violation.severity}
                      </Badge>
                    </div>
                  </AccordionTrigger>

                  {/* Violation Details */}
                  <AccordionContent className="p-5 text-gray-300 space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-lg text-white">Description</h4>
                      <p className="text-sm text-gray-400">{violation.description}</p>
                    </div>

                    {/* Impact */}
                    <div className="flex items-center gap-3">
                      <AlertCircle size={20} className="text-yellow-500" />
                      <div>
                        <h4 className="font-semibold text-lg text-white">Impact</h4>
                        <p className="text-sm text-gray-400">{getViolationImpact(violation.severity)}</p>
                      </div>
                    </div>

                    {/* Resolution */}
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500" />
                      <div>
                        <h4 className="font-semibold text-lg text-white">Resolution</h4>
                        <p className="text-sm text-gray-400">{violation.resolution}</p>
                      </div>
                    </div>

                    {/* Remediation Steps */}
                    <div>
                      <h4 className="font-semibold text-lg text-white">Remediation Steps</h4>
                      <ul className="list-none space-y-3">
                        {getRemediationSteps(violation.category).map((step, index) => (
                          <li key={index} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg shadow-md">
                            <span className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full">
                              {index + 1}
                            </span>
                            <p className="text-sm text-gray-300">{step}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Code Example */}
                    {getCodeExample(violation.category) && (
                      <div>
                        <h4 className="font-semibold text-lg text-white flex items-center gap-2">
                          <Code size={20} className="text-blue-400" />
                          Code Example
                        </h4>
                        <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-200 border border-gray-700 whitespace-pre-wrap">
                          {getCodeExample(violation.category)}
                        </pre>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="mt-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {scan.permissions.map((permission) => (
                <Badge
                  key={permission}
                  variant="secondary"
                  className={`text-xs px-2 py-1.5 rounded-md shadow-md transition-all ${
                    permission.toLowerCase().includes('dangerous') ||
                    permission.includes('SMS') ||
                    permission.includes('LOCATION') ||
                    permission.includes('CAMERA') ||
                    permission.includes('CONTACTS')
                      ? 'bg-red-100 text-red-800 border-red-400 shadow-red-400/50'
                      : 'bg-gray-200 text-gray-800 border-gray-300'
                  }`}
                >
                  {permission.includes('.permission.') ? permission.split('.permission.')[1] : permission}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}