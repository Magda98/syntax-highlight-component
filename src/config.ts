import type { Token } from 'prismjs';
import { tokenize, tokenTypes } from './tokenizer/prism';

/**
 * Default configuration object.
 */
export const configDefaults = {
  languages: ['markup', 'css', 'javascript'],
  tokenTypes,
  languageTokens: {},
  tokenize,
};

export type Config = {
  languages: string[];
  tokenTypes: string[];
  languageTokens: Record<string, Token[]>;
  tokenize: (text: string, language: string) => any;
};
