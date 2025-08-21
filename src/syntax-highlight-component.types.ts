export type Config = {
  languages: Language[];
  tokenTypes: string[];
  languageTokens: Record<string, string[]>;
  tokenize: (text: string, language: Language) => Promise<FlatToken[]>;
};

export type Theme = 'light' | 'dark' | 'pink';

export type Language =
  | 'markup'
  | 'css'
  | 'html'
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'ruby'
  | 'plaintext'
  | 'tsx'
  | 'jsx'
  | 'csharp'
  | 'cpp'
  | 'git'
  | 'go'
  | 'java'
  | 'json'
  | 'md'
  | 'php';

export type FlatToken = { type: string; content: string; length: number };
