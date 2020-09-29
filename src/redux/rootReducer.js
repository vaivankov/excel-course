import {CHANGE_TEXT, RESIZE_CELL} from './type';

export function rootReducer(state, action) {
  let prevState;
  let field;
  console.log(
      'Action',
      action
  );
  switch (action.type) {
    case RESIZE_CELL:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return {
        ...state,
        [field]: prevState,
      };
    case CHANGE_TEXT:
      prevState = state['dataState'] || {};
      prevState[action.data.id] = action.data.value;
      return {
        ...state,
        currentText: action.data.value,
        dataState: prevState,
      };
    default:
      return state;
  }
}
