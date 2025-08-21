import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  type Config,
  type Language,
  type Theme,
} from './syntax-highlight-component.types';
import { setupTokenHighlights } from './cssHighlight';
import { configDefaults } from './config';

/**
 * A web component for syntax highlighting code blocks using the CSS Custom Highlight API.
 *
 * @remarks
 * This component leverages the Lit library and the CSS Custom Highlight API to provide
 * customizable syntax highlighting for code snippets. It supports dynamic configuration,
 * custom token types, and language-specific tokenization.
 *
 * @example
 * ```html
 * <syntax-highlight-component language="javascript">
 *   const x = 42;
 * </syntax-highlight-component>
 * ```
 *
 * @slot - Default slot for code content to be highlighted.
 * @property {string} language - The programming language to use for syntax highlighting.
 * @property {string} contentSelector - Optional selector for the element containing the code to highlight.
 */
@customElement('syntax-highlight-component')
export default class SyntaxHighlightComponent extends LitElement {
  /**
   * The programming language used for syntax highlighting.
   * Defaults to 'plaintext' if not set.
   */
  @property({ type: String })
  set language(value: Language) {
    this._language = value;

    if (SyntaxHighlightComponent.config.languages.includes(value)) return;
    SyntaxHighlightComponent.config = {
      ...SyntaxHighlightComponent.config,
      languages: [...SyntaxHighlightComponent.config.languages, value],
    };
  }

  private _language: Language = 'plaintext';

  get language(): Language {
    return this._language;
  }

  @property({ type: String, attribute: 'content-selector' })
  contentSelector = 'syntax-highlight-component';

  @property({ type: String, attribute: 'theme' })
  theme: Theme = 'light';

  private static _config: Config = configDefaults;

  static get config() {
    return SyntaxHighlightComponent._config;
  }

  static set config(properties: Config) {
    SyntaxHighlightComponent._config = Object.assign(
      SyntaxHighlightComponent._config,
      properties,
    );
  }

  private _highlights = new Set<{ tokenType: string; range: Range }>();
  private _internals: ElementInternals;

  get highlights() {
    return this._highlights;
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'code';
    setupTokenHighlights(configDefaults.tokenTypes, {
      languageTokens: configDefaults.languageTokens,
    });
  }

  get contentElement(): HTMLElement {
    if (!this.contentSelector) return this;
    return this.querySelector(this.contentSelector) || this;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.contentElement.hasAttribute('tabindex')) {
      this.contentElement.setAttribute('tabindex', '0');
    }
  }

  static styles = css`
    :host {
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      overflow: auto;
      tab-size: 2;
      hyphens: none;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        'Liberation Mono', 'Courier New', monospace;
      line-height: 1.6;
    }

    :host([theme='light']) {
      --comment-color: #586069;
      --punctuation-color: #24292e;
      --string-color: #e31a2c;
      --keyword-color: #e31a2c;
      --operator-color: #e31a2c;
      --number-color: #0052cc;
      --function-color: #8e44ad;
      --tag-color: #1e7e34;
      --attr-name-color: #8e44ad;
      --attr-value-color: #032f62;
      --boolean-color: #0052cc;
      --property-color: #0052cc;
      --selector-color: #1e7e34;
      --atrule-color: #8e44ad;
      --url-color: #032f62;
      color: #24292e;
    }

    :host([theme='dark']) {
      --comment-color: #9e9e9e;
      --punctuation-color: #e0e0e0;
      --string-color: #66bb6a;
      --keyword-color: #64b5f6;
      --operator-color: #e0e0e0;
      --number-color: #a5d6a7;
      --function-color: #42a5f5;
      --tag-color: #64b5f6;
      --attr-name-color: #4db6ac;
      --attr-value-color: #66bb6a;
      --boolean-color: #64b5f6;
      --property-color: #4db6ac;
      --selector-color: #f06292;
      --atrule-color: #f06292;
      --url-color: #9e9e9e;
      color: #e0e0e0;
    }

    :host([theme='pink']) {
      --comment-color: #e0e0e0;
      --punctuation-color: #f8f8f2;
      --string-color: #ff80c4;
      --keyword-color: #ff79c6;
      --operator-color: #f8f8f2;
      --number-color: #bd93f9;
      --function-color: #ff79c6;
      --tag-color: #ff79c6;
      --attr-name-color: #d1aaff;
      --attr-value-color: #ff80c4;
      --boolean-color: #bd93f9;
      --property-color: #d1aaff;
      --selector-color: #ff79c6;
      --atrule-color: #ff79c6;
      --url-color: #e0e0e0;
      color: #f8f8f2;
    }

    ::highlight(comment) {
      color: var(--comment-color);
    }
    ::highlight(punctuation) {
      color: var(--punctuation-color);
    }
    ::highlight(string) {
      color: var(--string-color);
    }
    ::highlight(keyword) {
      color: var(--keyword-color);
    }
    ::highlight(operator) {
      color: var(--operator-color);
    }
    ::highlight(number) {
      color: var(--number-color);
    }
    ::highlight(function) {
      color: var(--function-color);
    }
    ::highlight(tag) {
      color: var(--tag-color);
    }
    ::highlight(attr-name) {
      color: var(--attr-name-color);
    }
    ::highlight(attr-value) {
      color: var(--attr-value-color);
    }
    ::highlight(boolean) {
      color: var(--boolean-color);
    }
    ::highlight(property) {
      color: var(--property-color);
    }
    ::highlight(selector) {
      color: var(--selector-color);
    }
    ::highlight(atrule) {
      color: var(--atrule-color);
    }
    ::highlight(url) {
      color: var(--url-color);
    }
  `;

  render() {
    return html` <slot @slotchange=${this.paintTokenHighlights}></slot> `;
  }

  async paintTokenHighlights() {
    this.clearTokenHighlights();
    if (!CSS.highlights) return;

    const text = this.contentElement.innerText;
    const tokens = await SyntaxHighlightComponent._config.tokenize(
      text,
      this.language,
    );
    const languageTokenTypes =
      SyntaxHighlightComponent._config.languageTokens?.[this.language] || [];

    let pos = 0;
    for (const token of tokens) {
      if (token.type) {
        const tokenType = languageTokenTypes.includes(token.type)
          ? `${this.language}-${token.type}`
          : token.type;

        const range = new Range();
        if (this.contentElement.firstChild) {
          range.setStart(this.contentElement.firstChild, pos);
          range.setEnd(this.contentElement.firstChild, pos + token.length);

          CSS.highlights.get(tokenType)?.add(range);
          this._highlights.add({ tokenType, range });
        }
      }
      pos += token.length;
    }
  }

  protected clearTokenHighlights() {
    if (!CSS.highlights) return;
    for (const highlight of this.highlights) {
      CSS.highlights.get(highlight.tokenType)?.delete(highlight.range);
      this._highlights.delete(highlight);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syntax-highlight-component': SyntaxHighlightComponent;
  }
}
