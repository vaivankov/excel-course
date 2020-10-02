import * as types from "./type";

export function cellResize(data) {
  return {
    type: types.RESIZE_CELL,
    data,
  };
}

export function changeText(data) {
  return {
    type: types.CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: types.CHANGE_STYLES,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: types.APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: types.CHANGE_TITLE,
    data,
  };
}
