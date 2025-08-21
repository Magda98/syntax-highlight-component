import { configs } from 'eslint-plugin-lit';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config(
  globalIgnores(['dist/']),
  {
    files: ['src/', 'eslint.config.ts', 'vite.config.ts'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  configs['flat/recommended'],
);
