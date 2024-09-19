import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/demo/fitting-room/",
  resolve: {
    // alias: { "/src": fileURLToPath(new URL("./src", import.meta.url)) },
    // alias: [
    //   {
    //     find: "/src",
    //     replacement: fileURLToPath(new URL("./src", import.meta.url)),
    //   },
    // ],
  },
});
