import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table_template';
import {resizeCell} from "./cell_resizer";
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super(
        $root,
        {
          listeners: ['mousedown'],
        }
    );
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(evt) {
    if (evt.target.dataset.resize) {
      resizeCell(
          this.$root,
          evt
      );
    }
  }
}
