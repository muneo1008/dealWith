import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import viteReact from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
      viteReact(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My PWA App',               // 앱의 전체 이름
        short_name: 'PWA App',             // 앱의 짧은 이름 (홈 화면에 표시됨)
        description: 'A Progressive Web App built with Vite',
        theme_color: '#ffffff',            // 테마 색상
        background_color: '#ffffff',       // 백그라운드 색상
        display: 'standalone',             // 독립형 앱으로 표시
        start_url: '/',                    // 앱이 시작될 때의 URL
        scope: '/',                        // 앱의 범위
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173
  },
});
