import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super(
        $root,
        {
          name: 'Formula',
          listeners: ['input', 'keydown'],
          ...options,
        }
    );
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>`;
  }

  onInput(evt) {
    const text = evt.target.textContent.trim();
    this.$emit(
        'formula:input',
        text
    );
  }

  onKeydown(evt) {
    this.$emit(
        'formula:editDone',
        evt
    );
  }
}
