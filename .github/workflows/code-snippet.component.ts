import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import SyntaxHighlightComponent from 'syntax-highlight-component';
@Component({
  selector: 'gg-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetComponent implements OnInit {
  colors = input<string[]>([]);
  angle = input<number>(0);
  code = computed<string>(
    () =>
      `background: linear-gradient(${this.angle()}deg, ${this.colors().join(
        ', ',
      )});\n background-clip: text;\n -webkit-text-fill-color: transparent; `,
  );

  protected syntaxHighlightElement =
    viewChild<ElementRef<SyntaxHighlightComponent>>('syntaxHighlight');

  constructor() {
    effect(() => {
      this.code();
      // Trigger update on the syntax highlight element,
      // queueing to run after the current text render
      queueMicrotask(() => {
        this.syntaxHighlightElement()?.nativeElement.paintTokenHighlights?.();
      });
    });
  }

  protected isBrowser = false;

  private readonly platformId = inject(PLATFORM_ID);

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // load syntax-highlight-element dynamically only on browser because it is not SSR compatible
      // await import('syntax-highlight-element');
      await import('syntax-highlight-component');
    }
  }
}
