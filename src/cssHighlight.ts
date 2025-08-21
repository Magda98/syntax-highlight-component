import type { Token } from 'prismjs';

/**
 * Initializes CSS Custom Highlights for a given set of token types.
 *
 * This function iterates through a list of common token types and optional
 * language-specific token types, creating and registering a new `Highlight`
 * object for each one in the `CSS.highlights` registry. This pre-registration
 * is a necessary step for applying styles to code tokens using the
 * CSS Custom Highlight API.
 *
 * @param tokenTypes An array of strings representing common token types (e.g., 'keyword', 'string').
 * @param options An object containing additional configuration.
 * @param options.languageTokens An optional object mapping language identifiers to their specific token types.
 * These are registered with a name in the format `${language}-${tokenType}`.
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API
 */
export function setupTokenHighlights(
  tokenTypes: string[],
  { languageTokens }: { languageTokens?: { [language: string]: Token[] } },
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
