import { type Scan } from "@shared/schema";
import { format } from "date-fns";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface Props {
  scan: Scan;
  onClose: () => void;
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4a4a4a',
  },
  badge: {
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 10,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  violationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#d97706',
  },
  violationText: {
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#4a4a4a',
  },
  bestPractices: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  bestPracticesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0f766e',
  },
  bestPracticeItem: {
    fontSize: 11,
    marginBottom: 5,
    color: '#4a4a4a',
  },
  recommendations: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0fdf4',
    borderRadius: 4,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#15803d',
  },
});

const getBestPractices = (category: string) => {
  switch (category) {
    case "SDK Version":
      return [
        "• Keep your targetSdkVersion up to date with latest Android releases",
        "• Test your app thoroughly on the latest Android version",
        "• Follow Android's backwards compatibility guidelines",
        "• Document any platform-specific features",
        "• Monitor Google Play console for SDK requirements"
      ];
    case "Privacy Policy":
      return [
        "• Create a comprehensive privacy policy covering all data collection",
        "• Implement clear user consent mechanisms",
        "• Use privacy-preserving alternatives when possible",
        "• Document data retention and deletion policies",
        "• Provide user data access and export options"
      ];
    case "Battery Usage":
      return [
        "• Use WorkManager for background tasks",
        "• Implement proper doze mode handling",
        "• Optimize network requests and location updates",
        "• Use Battery Historian for analysis",
        "• Follow Android's background execution limits"
      ];
    case "Performance":
      return [
        "• Implement proper threading and coroutines",
        "• Use Android Performance Profiler",
        "• Monitor ANR rates in production",
        "• Implement proper error handling",
        "• Follow Android vitals guidelines"
      ];
    case "Security":
      return [
        "• Follow Android security best practices",
        "• Implement proper encryption for sensitive data",
        "• Use the Security library for crypto operations",
        "• Regular security audits and penetration testing",
        "• Monitor security bulletins and patches"
      ];
    default:
      return [];
  }
};

const getAdditionalRecommendations = (severity: string) => {
  switch (severity) {
    case "high":
      return [
        "• Fix this issue immediately before publishing",
        "• Consider this a blocking issue for release",
        "• Perform security testing after fixing",
      ];
    case "medium":
      return [
        "• Address this issue in the next release cycle",
        "• Monitor for potential user impact",
        "• Document the limitation if not fixed immediately",
      ];
    case "low":
      return [
        "• Plan to address in future updates",
        "• Document in release notes",
        "• Monitor for changes in severity",
      ];
    default:
      return [];
  }
};

const PDFReport = ({ scan }: { scan: Scan }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>APK Policy Check Report</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <Text style={styles.text}>File Name: {scan.fileName}</Text>
        <Text style={styles.text}>Package Name: {scan.packageName}</Text>
        <Text style={styles.text}>SDK Version: {scan.sdkVersion}</Text>
        <Text style={styles.text}>
          Scan Date: {format(new Date(scan.scannedAt), "PPp")}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permissions ({scan.permissions.length})</Text>
        {scan.permissions.map((permission, index) => (
          <Text key={index} style={styles.text}>
            • {permission}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Policy Violations ({scan.policyViolations.length})
        </Text>
        {scan.policyViolations.length === 0 ? (
          <Text style={styles.text}>✓ No policy violations found</Text>
        ) : (
          scan.policyViolations.map((violation, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={styles.violationTitle}>
                ⚠️ {violation.category} - {violation.severity.toUpperCase()}
              </Text>
              <Text style={styles.violationText}>
                Description: {violation.description}
              </Text>
              <Text style={styles.violationText}>
                Resolution: {violation.resolution}
              </Text>

              <View style={styles.bestPractices}>
                <Text style={styles.bestPracticesTitle}>Best Practices</Text>
                {getBestPractices(violation.category).map((practice, i) => (
                  <Text key={i} style={styles.bestPracticeItem}>{practice}</Text>
                ))}
              </View>

              <View style={styles.recommendations}>
                <Text style={styles.recommendationsTitle}>Additional Recommendations</Text>
                {getAdditionalRecommendations(violation.severity).map((rec, i) => (
                  <Text key={i} style={styles.bestPracticeItem}>{rec}</Text>
                ))}
              </View>
            </View>
          ))
        )}
      </View>
    </Page>
  </Document>
);

export default function ReportViewer({ scan, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container flex flex-col h-screen max-w-6xl mx-auto py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">PDF Report Preview</h2>
            {scan.policyViolations.length > 0 ? (
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>
          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>
        </div>

        <div className="flex-1 w-full bg-muted rounded-lg overflow-hidden">
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <PDFReport scan={scan} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}