import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        // target: "https://blog-list-s9ru.onrender.com/",
        changeOrigin: true,
      },
    },
  },
});
