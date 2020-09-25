const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function toCell(row, state) {
  return function(_, col) {
    const width = getWidth(
        state.colState,
        col
    );
    return `
      <div 
        class="table__cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${width}"
      ></div>
    `;
  };
}

function toColumn({col, width}) {
  return `
      <div class="table__column" data-type="resizable" style="width:${width}">
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

function withWidthFrom(state) {
  return function(col, index) {
    return {col,
      index,
      width: getWidth(
          state.colState,
          index
      )};
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(
            row,
            state
        ))
        .join('');

    rows.push(createRow(
        cells,
        row + 1
    ));
  }

  return rows.join('');
}
