import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table_template';
import {$} from '../../core/dom';

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
      const $resizer = $(evt.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();

      if (evt.target.dataset.resize === 'col') {
        document.onmousemove = (e) => {
          const delta = e.clientX - coords.right;
          const value = coords.width + delta;
          $parent.$element.style.width = value + 'px';
        };

        document.onmouseup = (e) => {
          document.onmousemove = null;
          const delta = e.clientX - coords.right;
          const value = coords.width + delta;
          this.resizeColumn(
              value,
              $resizer.$element
          );
          document.onmouseup = null;
        };
      } else {
        document.onmousemove = (e) => {
          const delta = e.clientY - coords.bottom;
          const value = coords.height + delta;
          $parent.$element.style.height = value + 'px';
        };

        document.onmouseup = (e) => {
          document.onmousemove = null;
          const delta = e.clientY - coords.bottom;
          const value = coords.height + delta;
          $parent.$element.style.height = value + 'px';
        };
      }
    }
  }

  resizeColumn(value, $resizer) {
    const columns = document.querySelectorAll(`.${$resizer.className}`);
    const columnsArray = Array.from(columns);
    const resizeCellIndex = columnsArray.indexOf($resizer);
    const rows = document.querySelectorAll('.table__row-data');
    const rowsArray = Array.from(rows);
    rowsArray.forEach((row) => {
      this.setColumnWidth.call(
          $resizer,
          row,
          resizeCellIndex,
          value
      );
    });
  }

  setColumnWidth(tableRowData, resizeCellIndex, value) {
    const cells = tableRowData.querySelectorAll('.table__cell');
    const cellsArray = Array.from(cells);
    if (cellsArray.length > 0) {
      cellsArray[resizeCellIndex].style.width = value + 'px';
    }
  }
}
