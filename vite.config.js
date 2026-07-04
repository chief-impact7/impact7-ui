import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// 라이브러리 모드: React 컴포넌트(index) + mount 어댑터를 각각 ESM으로 빌드.
// react/react-dom은 external — 소비 앱의 것을 쓴다(중복 번들·hook 충돌 방지).
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        'impact7-ui': resolve(__dirname, 'src/index.js'),
        mount: resolve(__dirname, 'src/mount.js'),
        icons: resolve(__dirname, 'src/icons-entry.js'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client'],
      output: { assetFileNames: 'impact7-ui.[ext]' },
    },
  },
});
