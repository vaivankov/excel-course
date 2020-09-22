const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row) {
  return function(_, col) {
    return `
      <div 
        class="table__cell" 
        contenteditable 
        data-col="${col}"
        data-id="${row}:${col}"
      ></div>
    `;
  };
}

function toColumn(col) {
  return `
      <div class="table__column" data-type="resizable">
        ${col}
        <div class="table__column-resize" data-resize="col"></div>
      </div>`;
}

function createRow(content, index = "") {
  const resize = index ?
    `<div class="table__row-resize" data-resize="row"></div>` : '';
  return `
    <div class="table__row" data-type="resizable">
      <div class="table__row-info">${index}${resize}</div>
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

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');

    rows.push(createRow(
        cells,
        row + 1
    ));
  }

  return rows.join('');
}
