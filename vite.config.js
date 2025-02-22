import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/server': {
        target: 'http://localhost:8888/functions/server',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/server/, ''),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})