import axios from 'axios';
import {
  FETCH_DASHBOARDUSERS_BEGIN,
  FETCH_DASHBOARDUSERS_SUCCESS,
  FETCH_DASHBOARDUSERS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';

export function fetchDashboardUsersAction(id, email, username, role, banned) {
  return function (dispatch) {
    dispatch({
      type: FETCH_DASHBOARDUSERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/dashboardusers`, {
      id, email, username, role, banned,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: FETCH_DASHBOARDUSERS_SUCCESS,
          payload: response.data.dashboardusers,
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
          type: FETCH_DASHBOARDUSERS_FAIL,
          payload: error,
        });
      });
  }
}
