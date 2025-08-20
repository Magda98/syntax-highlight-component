import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import generatePackageJson from 'rollup-plugin-generate-package-json';

export default defineConfig({
  plugins: [
    dts({
      // You can specify options here if needed.
      // For example, to include all source files:
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/syntax-highlight-component.ts', // your Lit entry file
      name: 'SyntaxHighlightComponent',
      fileName: (format) => `syntax-highlight-component.${format}.js`,
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    rollupOptions: {
      // externalize lit/lit-element if you want consumers to install it themselves
      external: [/^lit/],
      plugins: [
        generatePackageJson({
          outputFolder: 'dist',
          baseContents: {
            name: 'syntax-highlight-component',
            version: '1.0.0',
            main: 'syntax-highlight-component.es.js',
            module: 'syntax-highlight-component.umd.js',
            types: 'dist/types/index.d.ts',
          },
        }),
      ],
    },
  },
});
