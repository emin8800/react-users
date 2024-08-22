import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // veya başka bir port numarası
    host: '0.0.0.0' // Tüm ağ arayüzleri üzerinden erişilebilir
  }
});
