import axios from '../axios';
import {
  FETCH_CHANNELS_BEGIN,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAIL,
  UPDATE_CHANNEL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchChannelsAction(
  id,
  channelId,
  channelName,
  serverId,
  offset,
  limit,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_CHANNELS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/channels`, {
      id,
      channelId,
      channelName,
      serverId,
      offset,
      limit,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_CHANNELS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_CHANNELS_FAIL,
        payload: error,
      });
    });
  }
}

export function banChannelAction(id, banMessage = '') {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/channel/ban`, {
      id,
      banMessage,
      project: currentProject,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_CHANNEL,
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
