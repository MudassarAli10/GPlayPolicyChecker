import { scans, type Scan, type InsertScan } from "@shared/schema";

export interface IStorage {
  createScan(scan: InsertScan): Promise<Scan>;
  getScan(id: number): Promise<Scan | undefined>;
  getAllScans(): Promise<Scan[]>;
}

export class MemStorage implements IStorage {
  private scans: Map<number, Scan>;
  private currentId: number;

  constructor() {
    this.scans = new Map();
    this.currentId = 1;
  }

  async createScan(insertScan: InsertScan): Promise<Scan> {
    const id = this.currentId++;
    const scan = {
      ...insertScan,
      id,
      scannedAt: new Date()
    } satisfies Scan;

    this.scans.set(id, scan);
    return scan;
  }

  async getScan(id: number): Promise<Scan | undefined> {
    return this.scans.get(id);
  }

  async getAllScans(): Promise<Scan[]> {
    return Array.from(this.scans.values()).sort((a, b) => 
      b.scannedAt.getTime() - a.scannedAt.getTime()
    );
  }
}

export const storage = new MemStorage();