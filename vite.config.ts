import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/syntax-highlight-component.ts',
      name: 'SyntaxHighlightComponent',
      fileName: (format) => `syntax-highlight-component.${format}.js`,
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: [/^lit/],
    },
  },
});
