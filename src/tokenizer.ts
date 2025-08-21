import * as Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import type { Token } from 'prismjs';
import type { FlatToken, Language } from './syntax-highlight-component.types';

export async function tokenize(
  text: string,
  language: Language,
): Promise<FlatToken[]> {
  const lang = Prism.languages[language];
  if (!lang) {
    try {
      await getLanguageImport(language);
    } catch (error) {
      console.warn(`Prism language '${language}' not loaded.`);
      return [{ type: 'untyped', content: text, length: text.length }];
    }
  }
  const tokens = Prism.tokenize(text, Prism.languages[language]);
  return tokens.flatMap(getFlatToken);
}

function getLanguageImport(language: Language) {
  switch (language) {
    case 'tsx':
      return import('prismjs/components/prism-tsx');
    case 'python':
      return import('prismjs/components/prism-python');
    case 'typescript':
      return import('prismjs/components/prism-typescript');
    case 'css':
      return import('prismjs/components/prism-css');
    case 'html':
      return import('prismjs/components/prism-markup');
    case 'javascript':
      return import('prismjs/components/prism-javascript');
    case 'markup':
      return import('prismjs/components/prism-markup');
    case 'plaintext':
      return import('prismjs/components/prism-markup');
    case 'ruby':
      return import('prismjs/components/prism-ruby');
    case 'jsx':
      return import('prismjs/components/prism-jsx');
    case 'csharp':
      return import('prismjs/components/prism-csharp');
    case 'cpp':
      return import('prismjs/components/prism-cpp');
    case 'git':
      return import('prismjs/components/prism-git');
    case 'go':
      return import('prismjs/components/prism-go');
    case 'java':
      return import('prismjs/components/prism-java');
    case 'json':
      return import('prismjs/components/prism-json');
    case 'md':
      return import('prismjs/components/prism-markdown');
    case 'php':
      return import('prismjs/components/prism-php');
    default:
      const _exhaustiveCheck: never = language;
      return _exhaustiveCheck;
  }
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
