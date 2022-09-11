/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [jsx(), vue()],
  test: {}
});
