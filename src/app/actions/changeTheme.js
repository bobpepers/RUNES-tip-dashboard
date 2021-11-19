import {
  THEME_TOGGLE,
} from './types/index';

export function changeTheme(payload) {
  return function (dispatch) {
    dispatch({
      type: THEME_TOGGLE,
      payload,
    });
  }
}
