import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy /analyze and /scan-repo from Vite dev server → backend
      '/analyze': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
      },
      '/scan-repo': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
      }
    }
  }
})
