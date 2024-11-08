import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      components: '/src/components',
      assets: '/src/assets',
      utils: '/src/utils',
      services: '/src/services',
      styles: '/src/styles',
      types: '/src/types',
      config: '/src/config',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        
      },
    },
  },
  server: {
    port: 3000,
  },
});
