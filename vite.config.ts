import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), tsconfigPaths()],
  resolve: {
    alias: {
      '@Services': path.resolve(__dirname, 'src/services'), // @Services için alias tanımlaması
    }
  }
})
