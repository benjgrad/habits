import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      icons: [
        {
          "src": "/pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
        },
        {
          "src": "/pwa-256x256.png",
          "sizes": "256x256",
          "type": "image/png",
        },
        {
          "src": "/pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
        },
        {
          "src": "/pwa-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
        },
        {
          "src": "/pwa-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
        },
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      scope: "/",
      start_url: "/",
      name: "Habits",
      short_name: "Habits",
      description: "Habit Tracker",
      lang: "en-US",
      orientation: "portrait-primary",
    }

  })],
})
