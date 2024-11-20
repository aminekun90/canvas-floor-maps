import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'playground', // Set root to playground folder
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CanvasFloorMaps', // UMD global variable
      fileName: (format) => `canvas-floor-maps.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  server: {
    open: true, // Automatically open browser
  },
});
