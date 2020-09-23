import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table_template';
import {resizeCell} from "./cell_resizer";
import {TableSelection} from './TableSelection';
import {isCell, getMatrix, shouldResize, nextSelector} from "./table_functions";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super(
        $root,
        {
          listeners: ['mousedown', 'keydown'],
        }
    );
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(15);
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeCell(
          this.$root,
          event
      );
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = getMatrix(
            $target,
            this.selection.current
        )
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const {key} = event;

    const keys = [
      'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp',
    ];

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.getId(true);
      const $nextCell = this.$root.find(nextSelector(
          key,
          id
      ));
      this.selection.select($nextCell);
    }
  }
}
