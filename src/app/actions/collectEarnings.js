import axios from '../axios';
import {
  COLLECT_EARNINGS_BEGIN,
  COLLECT_EARNINGS_SUCCESS,
  COLLECT_EARNINGS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function collectEarningsAction(
  id,
  ticker,
) {
  return function (dispatch) {
    dispatch({
      type: COLLECT_EARNINGS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/collect/earnings`, {
      id,
    }).then((response) => {
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: `Success: ${ticker} earnings collected`,
          key: new Date().getTime() + Math.random(),
          options: {
            variant: 'success',
          },
        },
      });
      dispatch({
        type: COLLECT_EARNINGS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: COLLECT_EARNINGS_FAIL,
        payload: error,
      });
    });
  }
}
