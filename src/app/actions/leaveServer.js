import axios from '../axios';
import {
  POST_LEAVESERVER_BEGIN,
  POST_LEAVESERVER_SUCCESS,
  POST_LEAVESERVER_FAIL,
  POST_LEAVESERVER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function leaveServerAction(id) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: POST_LEAVESERVER_BEGIN,
    });
    axios.post(
      `${window.myConfig.apiUrl}/management/server/leave`,
      {
        id,
        project: currentProject,
      },
    ).then((response) => {
      dispatch({
        type: POST_LEAVESERVER_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: POST_LEAVESERVER,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: POST_LEAVESERVER_FAIL,
        payload: error,
      });
    });
  }
}
