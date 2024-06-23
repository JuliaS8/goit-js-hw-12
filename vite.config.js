import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import stdLibBrowser from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
  plugins: [stdLibBrowser(), injectHTML(), FullReload(['./src/**/**.html'])],
  define: {
    global: 'window',
  },
  root: 'src',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: 'commonHelpers.js',
      },
    },
    outDir: '../dist',
  },
});
