import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Enable JSX in .js files
      include: "**/*.{js,jsx,ts,tsx}"
    })
  ],
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      "@": "/src",
      crypto: "crypto-browserify"
    }
  },
  define: {
    global: {},
  }

});
