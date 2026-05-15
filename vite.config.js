import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import leadHandler from './api/lead.js';

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
});
