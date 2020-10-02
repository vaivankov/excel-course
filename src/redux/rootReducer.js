import * as types from './type';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case types.RESIZE_CELL:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: value(
            state,
            field,
            action
        ),
      };
    case types.CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentCellText: action.data.value,
        [field]: value(
            state,
            field,
            action
        ),
      };
    case types.CHANGE_STYLES:
      return {
        ...state,
        currentToolbarStyles: action.data,
      };
    case types.APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = {
          ...val[id],
          ...action.data.value,
        };
      });
      return {
        ...state,
        [field]: val,
        currentToolbarStyles: {
          ...action.data.value,
          ...state.currentToolbarStyles,
        },
      };
    case types.CHANGE_TITLE:
      return {
        ...state,
        currentTableState: action.data,
      };
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
