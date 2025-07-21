import { resolve } from 'path'
import { defineConfig } from 'Vite'
import react from '@Vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(() => ({
  plugins: [react(), typescript(), cssInjectedByJsPlugin()],
  server: {
    port: 3000,
    strictPort: true
  },
  preview: {
      allowedHosts: true
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  build: {
    lib: {
      formats: ['umd'],
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'index',
      fileName: (_format) => `bundle.js`,
    },
    cssCodeSplit: false, // Ensures a single CSS file output
    minify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // Ensures a single file output
      },
    },
  },
}))