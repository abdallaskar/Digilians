import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Digilians',
        short_name: 'Digilians',
        description: 'Digilians Management Progressive Web App.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { "src": "/gold-star-192.png", "type": "image/png", "sizes": "192x192" },
          { "src": "/gold-star-256.png", "type": "image/png", "sizes": "256x256" },
          { "src": "/gold-star-512.png", "type": "image/png", "sizes": "512x512" }
        ]
      }
    })
  ]
})
