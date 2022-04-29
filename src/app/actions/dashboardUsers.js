import axios from '../axios';
import {
  FETCH_DASHBOARDUSERS_BEGIN,
  FETCH_DASHBOARDUSERS_SUCCESS,
  FETCH_DASHBOARDUSERS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchDashboardUsersAction(
  id,
  email,
  username,
  role,
  banned,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_DASHBOARDUSERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/dashboardusers`, {
      id,
      email,
      username,
      role,
      banned,
    }).then((response) => {
      dispatch({
        type: FETCH_DASHBOARDUSERS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_DASHBOARDUSERS_FAIL,
        payload: error,
      });
    });
  }
}
