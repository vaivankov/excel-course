import {defaultStyles} from "../constants";
import {checkStorage} from "../core/utils";

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

export const initialState = checkStorage('excel-state') ?
  normalize(checkStorage('excel-state')) :
  defaultState;
