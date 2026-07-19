import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import leadHandler from './api/lead.js';
import { fileURLToPath } from 'node:url';

function localApi(path, handler) {
  return {
    name: `local-api-${path}`,
    configureServer(server) {
      server.middlewares.use(path, (req, res, next) => {
        Promise.resolve(handler(req, res)).catch(next);
      });
    },
  };
}

export default defineConfig({
  plugins: [localApi('/api/lead', leadHandler), react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        course: fileURLToPath(new URL('./course.html', import.meta.url)),
        miniapp: fileURLToPath(new URL('./miniapp.html', import.meta.url)),
        platform: fileURLToPath(new URL('./platform.html', import.meta.url)),
      },
    },
  },
});
