import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table_template';
import {resizeCell} from "./cell_resizer";
import {TableSelection} from './TableSelection';
import {isCell, getMatrix, shouldResize, nextSelector} from "./table_functions";
import * as actions from '../../redux/actions';
import {defaultToolbarStyles} from '../../constants';

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

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit(
        'table:selectCell',
        $cell
    );
    const styles = $cell.getStyles(Object.keys(defaultToolbarStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeCell(
          this.$root,
          event
      );
      this.$dispatch(actions.cellResize(data));
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.getId(),
      value,
    }));
  }

  onInput(evt) {
    this.updateTextInStore($(evt.target).text());
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on(
        'formula:input',
        (text) => {
          this.selection.current.text(text);
          this.updateTextInStore(text);
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

    this.$on(
        'toolbar:applyStyle',
        (value) => {
          this.selection.applyStyle(value);
          this.$dispatch(actions.applyStyle({
            value,
            ids: this.selection.selectedIds,
          }));
        }
    );
  }
}
