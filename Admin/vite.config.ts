import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5321, 
    proxy: {
      "/api": {
        target: "https://be.wijiga.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
