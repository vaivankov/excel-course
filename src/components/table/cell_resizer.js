import {$} from "@core/dom";

export function resizeCell($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $cellHeader = $resizer.closest('[data-type="resizable"]');
    const $row = $cellHeader.$element.parentElement;
    const $rowHeader = Array.from($row.children);
    const resizeCellIndex = $rowHeader.indexOf($cellHeader.$element);
    const coords = $cellHeader.getCoords();
    const type = $resizer.data.resize;
    const propertySide = type === 'col' ? 'right' : 'bottom';
    const propertyDirection = type === 'col' ? 'X' : 'Y';
    const propertySize = type === 'col' ? 'width' : 'height';
    const mousePosition = `client${propertyDirection}`;

    document.onmousemove = (e) => {
      const delta = e[mousePosition] - coords[propertySide];
      const resizerStyles = {};
      resizerStyles[propertySide] = -delta + 'px';
      $resizer.css(resizerStyles);
    };

    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;

      const delta = e[mousePosition] - coords[propertySide];
      const value = coords[propertySize] + delta;
      const resizerStyles = {};
      resizerStyles[propertySide] = 0 + 'px';
      $resizer.css(resizerStyles);

      const cellStyles = {};
      cellStyles[propertySize] = value + 'px';

      if (type === 'col') {
        $root.findAll('.table__row-data')
            .forEach((row) => {
              row.children.length > 0 ?
                row.children[resizeCellIndex].style.width = value + 'px' :
                '';
            });
      } else {
        $cellHeader.css(cellStyles);
      }
      resolve({
        type,
        id: resizeCellIndex,
        value,
      });
    };
  });
}
