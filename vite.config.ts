import { defineConfig, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import type { IncomingMessage, ServerResponse } from "http";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    // Custom plugin to serve static booking page
    {
      name: 'serve-booking-page',
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
          if (req.url?.startsWith('/boeken')) {
            const filePath = path.resolve(__dirname, 'public/boeken/index.html');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html');
              res.end(fs.readFileSync(filePath, 'utf-8'));
              return;
            }
          }
          next();
        });
      },
    },
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
