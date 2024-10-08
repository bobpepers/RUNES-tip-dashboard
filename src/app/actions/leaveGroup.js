import axios from '../axios';
import {
  POST_LEAVE_GROUP_BEGIN,
  POST_LEAVE_GROUP_SUCCESS,
  POST_LEAVE_GROUP_FAIL,
  POST_LEAVE_GROUP,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function leaveGroupAction(id) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: POST_LEAVE_GROUP_BEGIN,
    });
    axios.post(
      `${window.myConfig.apiUrl}/management/group/leave`,
      {
        id,
        project: currentProject,
      },
    ).then((response) => {
      dispatch({
        type: POST_LEAVE_GROUP_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: POST_LEAVE_GROUP,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: POST_LEAVE_GROUP_FAIL,
        payload: error,
      });
    });
  }
}
