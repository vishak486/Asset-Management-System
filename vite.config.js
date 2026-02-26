import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // Disable manual chunks to prevent loading issues
        manualChunks: undefined
      }
    }
  },
  // Ensure dependencies are bundled together
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'react-router-dom', 'axios', 'react-bootstrap']
  }
})
