import {CHANGE_TEXT, RESIZE_CELL} from "./type";

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
