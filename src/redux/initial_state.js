import {checkStorage} from "../core/utils";

const defaultState = {
  colState: {},
  rowState: {},
};

export const initialState = checkStorage('excel-state') ?
  checkStorage('excel-state') :
  defaultState;
