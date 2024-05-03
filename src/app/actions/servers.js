import axios from '../axios';
import {
  FETCH_SERVERS_BEGIN,
  FETCH_SERVERS_SUCCESS,
  FETCH_SERVERS_FAIL,
  UPDATE_SERVER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchServerAction(
  id,
  groupId,
  serverName,
  platform,
  offset,
  limit,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_SERVERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/servers`, {
      id,
      groupId,
      serverName,
      platform,
      offset,
      limit,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_SERVERS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_SERVERS_FAIL,
        payload: error,
      });
    });
  }
}

export function banServerAction(id, banMessage = '') {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/server/ban`, {
      id,
      banMessage,
      project: currentProject,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_SERVER,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}
