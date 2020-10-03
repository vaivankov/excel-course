import {defaultTableState, defaultToolbarStyles} from "../constants";
import {checkStorage} from "../core/utils";

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentCellText: '',
  currentTableState: defaultTableState,
  currentToolbarStyles: defaultToolbarStyles,
};

function normalize(state) {
  return {
    ...state,
    currentCellText: '',
    currentToolbarStyles: defaultToolbarStyles,
  };
}

export const initialState = checkStorage('excel-state') ?
  normalize(checkStorage('excel-state')) :
  defaultState;
