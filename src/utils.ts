export function setupTokenHighlights(
  tokenTypes: string[],
  { languageTokens }: { languageTokens?: { [language: string]: string[] } },
) {
  for (const tokenType of tokenTypes) {
    CSS.highlights.set(tokenType, new Highlight());
  }

  if (languageTokens) {
    for (const language in languageTokens) {
      for (const tokenType of languageTokens[language]) {
        CSS.highlights.set(`${language}-${tokenType}`, new Highlight());
      }
    }
  }
}
