import * as actionsName from './type';

export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case actionsName.COL_RESIZE:
      prevState = state.colState || {};
      prevState[action.data.id] = action.data.value;
      return {
        ...state,
        colState: prevState,
      };
    case actionsName.ROW_RESIZE:
      prevState = state.rowState || {};
      prevState[action.data.id] = action.data.value;
      return {
        ...state,
        rowState: prevState,
      };
    default:
      return state;
  }
}
