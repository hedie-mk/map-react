import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'MapViewLib',
      fileName: (format) => format === 'es' ? 'map-view-lib.js' : 'map-view-lib.umd.cjs'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@vis.gl/react-maplibre',
        'maplibre-gl'
      ]
    }
  }
});
