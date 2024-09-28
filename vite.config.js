import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa_16.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./",
  server: {
    https: true,
  },
});
