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
