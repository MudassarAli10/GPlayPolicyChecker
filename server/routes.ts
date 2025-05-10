import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import { insertScanSchema, type PolicyViolation } from "@shared/schema";
import apkReader from "adbkit-apkreader";
import { promises as fs } from "fs";

declare module "adbkit-apkreader" {
  interface Manifest {
    package: string;
    usesSdk?: {
      targetSdkVersion: number;
      minSdkVersion?: number;
    };
    usesPermissions?: Array<{ name: string }>;
    application?: {
      hasCode?: boolean;
      debuggable?: boolean;
      allowBackup?: boolean;
      services?: Array<{
        exported?: boolean;
        permission?: string;
        name?: string;
      }>;
      activities?: Array<{
        name?: string;
        exported?: boolean;
        intentFilters?: Array<{
          actions?: string[];
          categories?: string[];
          data?: Array<{
            scheme?: string;
            host?: string;
          }>;
        }>;
      }>;
      usesLibrary?: Array<{
        name: string;
        required?: boolean;
      }>;
      providers?: Array<{
        exported?: boolean;
        grantUriPermissions?: boolean;
        permission?: string;
      }>;
      receivers?: Array<{
        name?: string;
        exported?: boolean;
        permission?: string;
      }>;
      metaData?: Array<{
        name?: string;
        value?: string;
      }>;
    };
    usesFeature?: Array<{
      name: string;
      required?: boolean;
    }>;
  }
}

const upload = multer({ 
  dest: "/tmp",
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
  fileFilter: (_req, file, cb) => {
    if (file.originalname.endsWith('.apk')) {
      cb(null, true);
    } else {
      cb(new Error('Only APK files are allowed'));
    }
  }
});

async function analyzeApk(filePath: string): Promise<{
  packageName: string;
  sdkVersion: number;
  permissions: string[];
  policyViolations: PolicyViolation[];
}> {
  const reader = await apkReader.open(filePath);
  const manifest = await reader.readManifest();

  const packageName = manifest.package;
  const sdkVersion = manifest.usesSdk?.targetSdkVersion || 0;
  const permissions = manifest.usesPermissions?.map(p => p.name) || [];
  const policyViolations: PolicyViolation[] = [];

  // SDK Version Check
  if (sdkVersion < 31) {
    policyViolations.push({
      category: "SDK Version",
      description: `App targets SDK version ${sdkVersion}, which is below the required minimum of 31 (Android 12)`,
      severity: "high",
      resolution: "Update targetSdkVersion to at least 31 in your build.gradle file and test compatibility"
    });
  }

  // Privacy & Data Protection Checks
  const privacyPermissions = permissions.filter(p => 
    p.includes("READ_PHONE_STATE") || 
    p.includes("ACCESS_WIFI_STATE") || 
    p.includes("RECORD_AUDIO") ||
    p.includes("CAMERA") ||
    p.includes("READ_CONTACTS") ||
    p.includes("ACCESS_FINE_LOCATION")
  );

  if (privacyPermissions.length > 0) {
    const hasPrivacyPolicy = manifest.application?.metaData?.some(meta => 
      meta.name?.toLowerCase().includes("privacy_policy")
    );

    if (!hasPrivacyPolicy) {
      policyViolations.push({
        category: "Privacy Policy",
        description: `App collects sensitive data (${privacyPermissions.join(", ")}) but lacks a privacy policy URL in manifest`,
        severity: "high",
        resolution: "Add privacy policy URL in manifest and implement user consent flow for data collection"
      });
    }
  }

  // Background Execution & Battery Analysis
  const backgroundServices = manifest.application?.services?.filter(service => 
    !service.exported && !service.permission
  ) || [];

  if (backgroundServices.length > 2) {
    policyViolations.push({
      category: "Battery Usage",
      description: `Found ${backgroundServices.length} background services without proper declarations, which may drain battery`,
      severity: "medium",
      resolution: "Use WorkManager for background tasks and implement proper battery optimizations"
    });
  }

  // ANR Risk Analysis
  const riskyServices = manifest.application?.services?.filter(service =>
    service.name && !service.name.toLowerCase().includes("worker") &&
    !service.name.toLowerCase().includes("job")
  ) || [];

  if (riskyServices.length > 0) {
    policyViolations.push({
      category: "ANR Risk",
      description: `Found ${riskyServices.length} services that might cause ANR issues: ${riskyServices.map(s => s.name).join(", ")}`,
      severity: "medium",
      resolution: "Move heavy operations to background threads and implement proper service lifecycle"
    });
  }

  // Security Analysis
  if (manifest.application?.debuggable === true) {
    policyViolations.push({
      category: "Security",
      description: "App is debuggable in release build which is a security risk",
      severity: "high",
      resolution: "Disable debugging for release builds and implement proper ProGuard configuration"
    });
  }

  // In-app Purchase Compliance
  if (permissions.includes("com.android.vending.BILLING")) {
    const usesPlayBilling = manifest.application?.metaData?.some(meta =>
      meta.name?.includes("com.google.android.play.billingclient")
    );

    if (!usesPlayBilling) {
      policyViolations.push({
        category: "Billing Compliance",
        description: "App uses billing permission but may not be using Google Play Billing",
        severity: "high",
        resolution: "Implement Google Play Billing API for all in-app purchases"
      });
    }
  }

  return {
    packageName,
    sdkVersion,
    permissions,
    policyViolations
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/scans", upload.single("apk"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No APK file uploaded" });
      }

      const analysis = await analyzeApk(req.file.path);

      const scan = await storage.createScan({
        fileName: req.file.originalname,
        packageName: analysis.packageName,
        sdkVersion: analysis.sdkVersion,
        permissions: analysis.permissions,
        status: "completed",
        policyViolations: analysis.policyViolations
      });

      await fs.unlink(req.file.path);
      res.json(scan);
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to process APK" });
    }
  });

  app.get("/api/scans", async (_req, res) => {
    const scans = await storage.getAllScans();
    res.json(scans);
  });

  app.get("/api/scans/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const scan = await storage.getScan(id);

    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    res.json(scan);
  });

  const httpServer = createServer(app);
  return httpServer;
}