import {CELL_RESIZE} from "./type";

export function cellResize(data) {
  return {
    type: CELL_RESIZE,
    data,
  };
}
