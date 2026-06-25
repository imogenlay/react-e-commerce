import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Const from "./src/services/const.ts";

// https://vite.dev/config/
export default defineConfig({
  base: Const.BASE_NAME,
  plugins: [react()],
});
