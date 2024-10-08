import axios from '../axios';
import {
  POST_EDIT_GROUP_BEGIN,
  POST_EDIT_GROUP_SUCCESS,
  POST_EDIT_GROUP_FAIL,
  UPDATE_GROUP,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function editGroupAction(
  id,
  discordTipMessageChannelId,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: POST_EDIT_GROUP_BEGIN,
    });
    axios.post(
      `${window.myConfig.apiUrl}/management/group/edit`,
      {
        id,
        discordTipMessageChannelId,
        project: currentProject,
      },
    ).then((response) => {
      dispatch({
        type: POST_EDIT_GROUP_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: UPDATE_GROUP,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: POST_EDIT_GROUP_FAIL,
        payload: error,
      });
    });
  }
}
