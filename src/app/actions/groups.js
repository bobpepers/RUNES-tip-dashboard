import axios from '../axios';
import {
  FETCH_GROUPS_BEGIN,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAIL,
  UPDATE_GROUP,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchGroupsAction(
  id,
  groupId,
  serverName,
  platform,
  offset,
  limit,
  isBotInGroup,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_GROUPS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/groups`, {
      id,
      groupId,
      serverName,
      platform,
      offset,
      limit,
      project: currentProject,
      isBotInGroup,
    }).then((response) => {
      dispatch({
        type: FETCH_GROUPS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_GROUPS_FAIL,
        payload: error,
      });
    });
  }
}

export function banGroupAction(id, banMessage = '') {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/group/ban`, {
      id,
      banMessage,
      project: currentProject,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_GROUP,
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
