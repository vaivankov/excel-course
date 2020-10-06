import {defaultTableState, defaultToolbarStyles} from "../constants";
import {clone} from "../core/utils";

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

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
