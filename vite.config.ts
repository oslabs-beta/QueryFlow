import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
const PORT = process.env.PORT || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      }
    },
  },
  plugins: [svelte()],
});