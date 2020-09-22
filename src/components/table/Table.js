import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table_template';
import {resizeCell} from "./cell_resizer";
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

  toHTML() {
    return createTable();
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
