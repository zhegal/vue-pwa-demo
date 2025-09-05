import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> | false = {
  theme_color: "#fff",
  background_color: "#595959",
  icons: [
    { purpose: "maskable", sizes: "512x512", src: "icon512_maskable.png", type: "image/png" },
    { purpose: "any", sizes: "512x512", src: "icon512_rounded.png", type: "image/png" },
  ],
  screenshots: [
    { src: "/screenshots/desktop.png", type: "image/png", sizes: "1920x1080", form_factor: "wide" },
    {
      src: "/screenshots/mobile.png",
      type: "image/png",
      sizes: "1080x1920",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  dir: "ltr",
  lang: "en-US",
  name: "My PWA Demo App",
  short_name: "PWA Demo",
  start_url: "/",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: { globPatterns: ["**/*.{html,css,js,ico,png,svg}"] },
      manifest,
      injectRegister: "auto",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
