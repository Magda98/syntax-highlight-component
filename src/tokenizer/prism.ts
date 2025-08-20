import * as Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import type { Token } from 'prismjs';

type FlatToken = { type: string; content: string; length: number };

export function tokenize(text: string, language: string): FlatToken[] {
  const lang = Prism.languages[language];
  if (!lang) {
    console.warn(`Prism language '${language}' not loaded.`);
    return [{ type: 'untyped', content: text, length: text.length }];
  }
  const tokens = Prism.tokenize(text, lang);
  return tokens.flatMap(getFlatToken);
}

export const tokenTypes: string[] = [
  'atrule',
  'attr-name',
  'attr-value',
  'bold',
  'boolean',
  'builtin',
  'cdata',
  'char',
  'class-name',
  'comment',
  'constant',
  'deleted',
  'doctype',
  'entity',
  'function',
  'important',
  'inserted',
  'italic',
  'keyword',
  'namespace',
  'number',
  'operator',
  'prolog',
  'property',
  'punctuation',
  'regex',
  'rule',
  'selector',
  'string',
  'symbol',
  'tag',
  'url',
];

function getFlatToken(token: string | Token): FlatToken[] {
  if (typeof token === 'string') {
    return [{ type: 'untyped', content: token, length: token.length }];
  }

  if (typeof token.content === 'string') {
    return [{ type: token.type, content: token.content, length: token.length }];
  }

  if (Array.isArray(token.content)) {
    return token.content.flatMap(getFlatToken);
  }

  if (token.content) {
    return getFlatToken(token.content as Token);
  }

  return [];
}
