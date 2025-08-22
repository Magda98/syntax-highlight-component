/**
 * Initializes CSS Custom Highlights for a given set of token types.
 *
 * @param tokenTypes An array of strings representing common token types (e.g., 'keyword', 'string').
 * These are registered with a name in the format `${language}-${tokenType}`.
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API
 */
export function setupTokenHighlights(tokenTypes: string[]) {
  for (const tokenType of tokenTypes) {
    CSS.highlights.set(tokenType, new Highlight());
  }
}
