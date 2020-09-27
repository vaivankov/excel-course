import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table_template';
import {resizeCell} from "./cell_resizer";
import {TableSelection} from './TableSelection';
import {isCell, getMatrix, shouldResize, nextSelector} from "./table_functions";
import {cellResize} from '../../redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super(
        $root,
        {
          name: 'Table',
          listeners: ['mousedown', 'keydown', 'input'],
          ...options,
        }
    );
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(
        15,
        this.store.getState()
    );
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on(
        'formula:input',
        (text) => {
          this.selection.current.text(text);
        }
    );

    this.$on(
        'formula:editDone',
        (evt) => {
          const keys = [
            'Enter', 'Tab',
          ];
          if (keys.includes(evt.key)) {
            evt.preventDefault();
            this.selection.current.focusCell();
          }
        }
    );
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit(
        'table:selectCell',
        $cell
    );
  }

  async resizeTable(event) {
    try {
      const data = await resizeCell(
          this.$root,
          event
      );
      this.$dispatch(cellResize(data));
    } catch (err) {
      console.warn(
          'Resize error:',
          err.message
      );
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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
        this.selectCell($target);
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
      this.selectCell($nextCell);
    }
  }

  onInput(evt) {
    this.$emit(
        'table:inputCell',
        $(evt.target)
    );
  }
}
