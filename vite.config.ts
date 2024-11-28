import path from 'path';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";

export default defineConfig({
<<<<<<< HEAD
  base: "https://Semen12.github.io/food-kts/",
=======
   base: "https://Semen12.github.io/food-kts/",
>>>>>>> main
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@styles/_reset.scss" as *; @use "@styles/styles.scss" as *; @use "@styles/_fonts.scss" \
         as *;  @use "@styles/_mixin.scss" as *;',
      },
    },
    postcss: {
      plugins: [
        autoprefixer({}) // add options if needed
      ],
    },
  },
  server: {
    port: 3000,
    /* host: '0.0.0.0', */
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
    },
  },
});
