const CODES = {
  A: 65,
  Z: 90,
};

function createCell(colsCount) {
  return `<div class="table__cell" contenteditable></div>`.repeat(colsCount);
}

function toColumn(col) {
  return `
      <div class="table__column">
        ${col}
        <div class="table__column-resize"></div>
      </div>`;
}

function createRow(content, index = "") {
  const resize = index ? `<div class="table__row-resize"></div>` : '';
  return `
    <div class="table__row">
      <div class="table__row-info">
        ${index}
        ${resize}
      </div>
      <div class="table__row-data">${content}</div>
    </div>  
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(
        createCell(colsCount),
        i + 1
    ));
  }

  return rows.join('');
}
