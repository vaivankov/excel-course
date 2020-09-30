import {CHANGE_TEXT, CHANGE_STYLES, RESIZE_CELL, APPLY_STYLE} from "./type";

export function cellResize(data) {
  return {
    type: RESIZE_CELL,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}
