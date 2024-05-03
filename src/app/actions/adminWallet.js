import axios from '../axios';
import {
  FETCH_ADMINWALLET_BEGIN,
  FETCH_ADMINWALLET_SUCCESS,
  FETCH_ADMINWALLET_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchAdminWalletAction() {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_ADMINWALLET_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/admin/wallet?project=${currentProject}`)
      .then((response) => {
        dispatch({
          type: FETCH_ADMINWALLET_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ADMINWALLET_FAIL,
          payload: error,
        });
      });
  }
}
