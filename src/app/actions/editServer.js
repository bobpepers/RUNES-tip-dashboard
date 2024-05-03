import axios from '../axios';
import {
  POST_EDITSERVER_BEGIN,
  POST_EDITSERVER_SUCCESS,
  POST_EDITSERVER_FAIL,
  UPDATE_SERVER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function editServerAction(
  id,
  discordTipMessageChannelId,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: POST_EDITSERVER_BEGIN,
    });
    axios.post(
      `${window.myConfig.apiUrl}/management/server/edit`,
      {
        id,
        discordTipMessageChannelId,
        project: currentProject,
      },
    ).then((response) => {
      dispatch({
        type: POST_EDITSERVER_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: UPDATE_SERVER,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: POST_EDITSERVER_FAIL,
        payload: error,
      });
    });
  }
}
