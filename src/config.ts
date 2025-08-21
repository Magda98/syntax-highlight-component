import { tokenize, tokenTypes } from './tokenizer';
import type { Config } from './syntax-highlight-component.types';

export const configDefaults: Config = {
  languages: ['markup', 'css', 'html', 'javascript', 'typescript'],
  tokenTypes,
  languageTokens: {},
  tokenize,
};
