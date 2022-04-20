import axios from '../axios';
import {
  FETCH_BOTSETTINGS_BEGIN,
  FETCH_BOTSETTINGS_SUCCESS,
  FETCH_BOTSETTINGS_FAIL,
  UPDATE_BOTSETTINGS,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function fetchBotSettings() {
  return function (dispatch) {
    dispatch({
      type: FETCH_BOTSETTINGS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/bot/settings`, {
      // id,
      // channelId,
      // channelName
    })
      .then((response) => {
        dispatch({
          type: FETCH_BOTSETTINGS_SUCCESS,
          payload: response.data.settings,
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
        dispatch({
          type: FETCH_BOTSETTINGS_FAIL,
          payload: error,
        });
      });
  }
}

export function updateBotSettings(id, maintenance, enabled) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/bot/settings/update`, {
      id,
      maintenance,
      enabled,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_BOTSETTINGS,
          payload: response.data.settings,
        });
      }).catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
      });
  }
}
