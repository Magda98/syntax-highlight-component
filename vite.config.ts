import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outDir: ['dist'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/syntax-highlight-component.ts',
      name: 'SyntaxHighlightComponent',
      fileName: () => `syntax-highlight-component.js`,
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: [/^lit/],
    },
  },
});
