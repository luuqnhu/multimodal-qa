import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Chạy frontend trên cổng 5173 (có thể đổi)
    open: true,  // Tự động mở trình duyệt khi chạy `npm run dev`
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") // Định nghĩa alias "@"
    }
  }
});