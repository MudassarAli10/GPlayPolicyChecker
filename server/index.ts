import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from 'path';

const app = express();

// Add a simple API endpoint to verify the server is running
app.get("/", (_req: Request, res: Response) => {
  res.send("GPlay Policy Checker API is live!");
});

// Middlewares for JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log request duration and responses
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Register API routes
(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Development setup for Vite (hot reloading)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // Production setup to serve the static files from the dist folder
    const distPath = path.join(__dirname, "../dist");
    app.use(express.static(distPath));  // Serve static files from the dist folder

    // Catch-all route to serve the React app's entry point (index.html)
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Serve the app on port 5000
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort : true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
