import {getRange} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function getMatrix($target, $current) {
  const target = $target.getId(true);
  const current = $current.getId(true);
  const cols = getRange(
      current.col,
      target.col
  );
  const rows = getRange(
      current.row,
      target.row
  );

  return cols.reduce(
      (acc, col) => {
        rows.forEach((row) => acc.push(`${row}:${col}`));
        return acc;
      },
      []
  );
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0;
  const MAX_ROWS_VALUE = 14;
  const MAX_COLS_VALUE = 25;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 >= MAX_ROWS_VALUE ? MAX_ROWS_VALUE : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 >= MAX_COLS_VALUE ? MAX_COLS_VALUE : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
