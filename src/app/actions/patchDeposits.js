import axios from '../axios';
import {
  PATCH_DEPOSITS_BEGIN,
  PATCH_DEPOSITS_SUCCESS,
  PATCH_DEPOSITS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function patchDepositsAction() {
  return function (dispatch) {
    dispatch({
      type: PATCH_DEPOSITS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/deposits/patch`)
      .then((response) => {
        dispatch({
          type: PATCH_DEPOSITS_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: patch deposits success',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: PATCH_DEPOSITS_FAIL,
          payload: error,
        });
      });
  }
}
