import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '../../core/dom';

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
      <div
        class="formula__input"
        id="formula__input"
        contenteditable
        spellcheck="false">
      </div>`;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula__input');

    this.$on(
        'table:selectCell',
        ($cell) => {
          this.$formula.text($cell.text());
        }
    );

    this.$subscribe((state) => {
      console.log(
          'Formula update',
          state.currentText
      );
      this.$formula.text(state.currentText);
    });
  }

  onInput(evt) {
    this.$emit(
        'formula:input',
        $(evt.target).text()
    );
  }

  onKeydown(evt) {
    this.$emit(
        'formula:editDone',
        evt
    );
  }
}
