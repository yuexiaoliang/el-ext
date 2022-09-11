import { defineConfig } from 'vite';
import baseConfig from '../vite.config';
import path from 'path';

export default defineConfig({
  ...baseConfig,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
