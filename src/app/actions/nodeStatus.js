import axios from '../axios';
import {
  FETCH_NODESTATUS_BEGIN,
  FETCH_NODESTATUS_SUCCESS,
  FETCH_NODESTATUS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchNodeStatusAction() {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_NODESTATUS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/status?project=${currentProject}`)
      .then((response) => {
        dispatch({
          type: FETCH_NODESTATUS_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_NODESTATUS_FAIL,
          payload: error,
        });
      });
  }
}
