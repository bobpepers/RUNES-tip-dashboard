import axios from '../axios';
import {
  FETCH_USERINFO_BEGIN,
  FETCH_USERINFO_FAIL,
  FETCH_USERINFO_SUCCESS,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

/**
 * Fetch UserInfo Data
 */
export function fetchUserInfoDataAction(
  id,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_USERINFO_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/userinfo`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_USERINFO_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_USERINFO_FAIL,
        payload: error,
      });
    });
  }
}
