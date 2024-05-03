import { UPDATE_SELECTED_PROJECT } from '../actions/types/index';

const initialState = {
  currentProject: 'Runebase',
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_SELECTED_PROJECT:
    return {
      ...state,
      currentProject: action.payload,
    };
  default:
    return state;
  }
};
