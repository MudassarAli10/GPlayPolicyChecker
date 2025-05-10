import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const policyViolationType = z.object({
  category: z.string(),
  description: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  resolution: z.string()
});

export type PolicyViolation = z.infer<typeof policyViolationType>;

export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  packageName: text("package_name").notNull(),
  sdkVersion: integer("sdk_version").notNull(),
  permissions: text("permissions").array().notNull(),
  status: text("status", { enum: ["pending", "completed", "failed"] }).notNull(),
  policyViolations: jsonb("policy_violations").notNull().$type<PolicyViolation[]>(),
  scannedAt: timestamp("scanned_at").defaultNow().notNull(),
});

export const insertScanSchema = createInsertSchema(scans).omit({
  id: true,
  scannedAt: true
});

export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;