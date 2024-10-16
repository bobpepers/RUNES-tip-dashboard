import axios from '../axios';
import {
  FETCH_BOTFUNCTIONS_BEGIN,
  FETCH_BOTFUNCTIONS_SUCCESS,
  FETCH_BOTFUNCTIONS_FAIL,
  FETCH_BOTFUNCTION_BEGIN,
  FETCH_BOTFUNCTION_SUCCESS,
  FETCH_BOTFUNCTION_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchBotFunctionsAction(
  name,
  offset,
  limit,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_BOTFUNCTIONS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/functions/tips`, {
      offset,
      limit,
      project: currentProject,
      tipType: name,
    }).then((response) => {
      dispatch({
        type: FETCH_BOTFUNCTIONS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_BOTFUNCTIONS_FAIL,
        payload: error,
      });
    });
  }
}

export function fetchBotFunctionAction(
  name,
  id,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_BOTFUNCTION_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/functions/tip`, {
      id,
      project: currentProject,
      tipType: name,
    }).then((response) => {
      dispatch({
        type: FETCH_BOTFUNCTION_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_BOTFUNCTION_FAIL,
        payload: error,
      });
    });
  }
}
