import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { configDefaults, type Config } from './config';
import { NAMESPACE } from './constants';
import { setupTokenHighlights } from './utils';

if (!CSS.highlights) {
  console.info(
    'The CSS Custom Highlight API is not supported in this browser.',
  );
} else {
  const globalConfig = Object.assign(
    configDefaults,
    window[NAMESPACE]?.config || {},
  );
  if (typeof globalConfig.setup === 'function') {
    (async () => await globalConfig.setup())();
  }
  setupTokenHighlights(globalConfig.tokenTypes, {
    languageTokens: globalConfig.languageTokens,
  });
}

@customElement('syntax-highlight-component')
export default class SyntaxHighlightComponent extends LitElement {
  private static _config: Config = Object.assign(
    configDefaults,
    window[NAMESPACE]?.config || {},
  );

  static get config() {
    return SyntaxHighlightComponent._config;
  }

  static set config(properties: Config) {
    SyntaxHighlightComponent._config = Object.assign(
      SyntaxHighlightComponent._config,
      properties,
    );
  }

  @property({ type: String })
  language = 'plaintext';

  @property({ type: String, attribute: 'content-selector' })
  contentSelector?: string;

  #highlights = new Set<{ tokenType: string; range: Range }>();
  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#internals.role = 'code';
  }

  get contentElement(): HTMLElement {
    if (!this.contentSelector) return this;
    return this.querySelector(this.contentSelector) || this;
  }

  get highlights() {
    return this.#highlights;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  protected updated(): void {
    this.paintTokenHighlights();
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
    .my-class {
      background: yellow;
      padding: 8px;
    }

    ::highlight(comment) {
      color: #d3d3d3; /* Light Gray */
    }
    ::highlight(punctuation) {
      color: #ffffff; /* White */
    }
    ::highlight(string) {
      color: #ffb6c1; /* Light Pink */
    }
    ::highlight(keyword) {
      color: #ff69b4; /* Hot Pink */
    }
    ::highlight(operator) {
      color: #9370db; /* Medium Purple */
    }
    ::highlight(number) {
      color: #ee82ee; /* Violet */
    }
    ::highlight(function) {
      color: #9370db; /* Medium Purple */
    }
    ::highlight(tag) {
      color: #c71585; /* Medium Violet Red */
    }
    ::highlight(attr-name) {
      color: #da70d6; /* Orchid */
    }
    ::highlight(attr-value) {
      color: #ffb6c1; /* Light Pink */
    }
    ::highlight(boolean) {
      color: #ee82ee; /* Violet */
    }
    ::highlight(property) {
      color: #da70d6; /* Orchid */
    }
    ::highlight(selector) {
      color: #800080; /* Purple */
    }
    ::highlight(atrule) {
      color: #ff69b4; /* Hot Pink */
    }
    ::highlight(url) {
      color: #d3d3d3; /* Light Gray */
    }
  `;

  render() {
    return html`<slot @slotchange=${this.paintTokenHighlights}></slot>`;
  }

  /**
   * Tokenize code and paint the token highlights.
   */
  paintTokenHighlights() {
    this.clearTokenHighlights();
    if (!CSS.highlights) return;

    const text = this.contentElement.innerText;
    const tokens =
      SyntaxHighlightComponent._config.tokenize(text, this.language) || [];
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
          this.#highlights.add({ tokenType, range });
        }
      }
      pos += token.length;
    }
  }

  clearTokenHighlights() {
    if (!CSS.highlights) return;
    for (const highlight of this.highlights) {
      CSS.highlights.get(highlight.tokenType)?.delete(highlight.range);
      this.#highlights.delete(highlight);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syntax-highlight-component': SyntaxHighlightComponent;
  }
}
