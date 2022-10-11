import {
  FETCH_COINS_BEGIN,
  FETCH_COINS_SUCCESS,
  FETCH_COINS_FAIL,
  UPDATE_COIN,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_COINS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_COINS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_COINS_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case UPDATE_COIN:
    console.log('Update_Coin payload: ', action.payload);
    return {
      ...state,
      data: state.data.map((coin) => {
        console.log(coin.id);
        return (
          coin.id === action.payload.id
            ? action.payload : coin
        )
      }),
      count: action.payload.count,
      isFetching: false,
    };
  default:
    return state;
  }
};
