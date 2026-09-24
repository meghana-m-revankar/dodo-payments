import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sdk:  resolve(__dirname, '../sdk/checkout.ts')
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === 'sdk' ? 'sdk/checkout.js' : 'assets/[name]-[hash].js'
      }
    }
  }
})