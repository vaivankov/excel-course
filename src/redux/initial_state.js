import {defaultToolbarStyles} from "../constants";
import {checkStorage} from "../core/utils";

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultToolbarStyles,
};

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultToolbarStyles,
    currentText: '',
  };
}

export const initialState = checkStorage('excel-state') ?
  normalize(checkStorage('excel-state')) :
  defaultState;
