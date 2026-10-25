import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for the CarNC landing app.
 *
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Bind to all interfaces so the dev server is reachable from outside the container.
    host: '0.0.0.0',
    watch: {
      // Bind mounts from Windows hosts do not propagate file system events,
      // so HMR inside Docker requires polling. Enabled via docker-compose.
      usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
    },
  },
});
