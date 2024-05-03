import axios from '../axios';
import {
  FETCH_WITHDRAWALADDRESSES_BEGIN,
  FETCH_WITHDRAWALADDRESSES_SUCCESS,
  FETCH_WITHDRAWALADDRESSES_FAIL,
  FETCH_WITHDRAWALADDRESS_BEGIN,
  FETCH_WITHDRAWALADDRESS_SUCCESS,
  FETCH_WITHDRAWALADDRESS_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchWithdrawalAddressesAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_WITHDRAWALADDRESSES_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/withdrawaladdresses`, {
      id,
      address,
      offset,
      limit,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_WITHDRAWALADDRESSES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_WITHDRAWALADDRESSES_FAIL,
        payload: error,
      });
    });
  }
}

export function fetchWithdrawalAddressAction(
  id,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_WITHDRAWALADDRESS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/withdrawaladdress`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_WITHDRAWALADDRESS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_WITHDRAWALADDRESS_FAIL,
        payload: error,
      });
    });
  }
}
