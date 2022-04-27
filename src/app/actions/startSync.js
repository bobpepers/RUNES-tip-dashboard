import axios from '../axios';
import {
  START_SYNCBLOCKS_BEGIN,
  START_SYNCBLOCKS_SUCCESS,
  START_SYNCBLOCKS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function startSyncAction() {
  return function (dispatch) {
    dispatch({
      type: START_SYNCBLOCKS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/sync/blocks`)
      .then((response) => {
        dispatch({
          type: START_SYNCBLOCKS_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: START_SYNCBLOCKS_FAIL,
          payload: error,
        });
      });
  }
}
