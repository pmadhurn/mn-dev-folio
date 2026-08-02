import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { prerenderPlugin } from "./scripts/prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
    proxy: {
      // The FastAPI backend (server.py) serves routes at the root (/chat, /health),
      // so strip the /api prefix the frontend uses to hit the proxy.
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Ships a readable HTML snapshot + llms.txt for crawlers that don't run JS.
    prerenderPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    // Generate source maps for better debugging
    sourcemap: mode === 'development',
    // Use esbuild for minification (faster and more reliable)
    minify: 'esbuild',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Target modern browsers for better optimization
    target: 'esnext',
  },
  // Enable compression and caching
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
