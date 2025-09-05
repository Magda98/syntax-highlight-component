# Syntax Highlighting Component

[![NPM Version](https://img.shields.io/npm/v/syntax-highlight-component?style=for-the-badge&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fsyntax-highlight-component)](https://www.npmjs.com/package/syntax-highlight-component)

✨ **Syntax Highlighting Component** is a customizable web component that makes your code snippets look beautiful and readable! 🚀

- Built with [Lit](https://lit.dev/) for fast and lightweight performance ⚡
- Uses [Prism.js](https://prismjs.com/) for accurate and colorful syntax highlighting 🎨
- Easy to use: just drop the component into your HTML and specify the language 📝
- Perfect for documentation, blogs, and developer portfolios 📚

Give your code blocks a professional touch with minimal effort! 💡

**Note:** This component uses the native [HighlightRegistry](https://developer.mozilla.org/en-US/docs/Web/API/HighlightRegistry) and [::highlight](https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight) selector. Check documentation for browser support.

## Example

[![Open in repo](https://img.shields.io/badge/github-pages?style=for-the-badge&logo=github&logoColor=white&color=black)](https://github.com/Magda98/syntax-highlight-component/tree/master/examples/syntax-highlight-example)
[![Open in StackBlitz](https://img.shields.io/badge/Stackblitz-fff?style=for-the-badge&logo=stackblitz&logoColor=white&labelColor=%231374EF&color=%231374EF)](https://stackblitz.com/github/Magda98/syntax-highlight-component/tree/master/examples/syntax-highlight-example)

## Usage

To use the component, import it in your HTML file and use the `<syntax-highlight-component>` tag:

```html
<syntax-highlight-component language="css" theme="pink">
  background: linear-gradient(135deg, #9d39e5, #dc454b, #ff1493);
  background-clip: text;
</syntax-highlight-component>
```

The default theme is `light` to set other themes use `theme` attribute and simply pass one one following values: `light` | `dark` | `pink`.

## Supported Languages

The `language` attribute supports the following values:

- `markup`
- `css`
- `html`
- `javascript`
- `typescript`
- `python`
- `ruby`
- `plaintext`
- `tsx`
- `jsx`
- `csharp`
- `cpp`
- `git`
- `go`
- `java`
- `json`
- `md`
- `php`

![code highlight example](https://github.com/Magda98/syntax-highlight-component/blob/master/docs/image.png)
