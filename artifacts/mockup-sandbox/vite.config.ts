import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    port,
  },
});
