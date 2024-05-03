import axios from '../axios';
import {
  FETCH_LOGS_BEGIN,
  FETCH_LOGS_SUCCESS,
  FETCH_LOGS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchLogsAction(
  offset,
  limit,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_LOGS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/functions/logs`, {
      offset,
      limit,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_LOGS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_LOGS_FAIL,
        payload: error,
      });
    });
  }
}
