import '../src/syntax-highlight-component';
import type SyntaxHighlightComponent from '../src/syntax-highlight-component';

const code = `background: linear-gradient(200deg, #9d39e5, #dc454b, #ff1493);
background-clip: text;`;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="syntax-highlight-example">
  <h3>Light Theme</h3>
    <div class="card card--light">
    <syntax-highlight-component language="css" theme="light">${code}</syntax-highlight-component>
    </div>
  </div>
  <div class="syntax-highlight-example">
  <h3>Dark Theme</h3>
    <div class="card">
    <syntax-highlight-component language="css" theme="dark">${code}</syntax-highlight-component>
    </div>
  </div>
  <div class="syntax-highlight-example">
    <h3>Pink Theme</h3>
    <div class="card">
    <syntax-highlight-component language="css" theme="pink">${code}</syntax-highlight-component>
    </div>
</div>
`;

const syntaxHighlightComponents =
  document.querySelectorAll<SyntaxHighlightComponent>(
    'syntax-highlight-component',
  );

if (syntaxHighlightComponents) {
  // Make components content editable
  syntaxHighlightComponents.forEach((component) => {
    component.contentEditable = 'true';
  });

  // Update token highlights on input
  syntaxHighlightComponents.forEach((component) => {
    component.addEventListener('input', () => {
      component.paintTokenHighlights();
    });
  });
}
