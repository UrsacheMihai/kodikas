/**
 * Vite Configuration
 * Configures the build system, React and Tailwind CSS plugins, bundle chunking, and deployment base path.
 * 
 * Optional:
 * - When configuring a custom domain (e.g. kodikas.ro) on GitHub Pages or hosting at root, modify `base: './'` to `base: '/'` or create `public/CNAME`.
 * - Adjust `chunkSizeWarningLimit` or customize `rollupOptions.output.manualChunks` if adding large third-party libraries.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'],
          'vendor-gsap': ['gsap', '@gsap/react', 'lenis'],
        },
      },
    },
  },
})
