import axios from '../axios';
import {
  FETCH_BOTSETTINGS_BEGIN,
  FETCH_BOTSETTINGS_SUCCESS,
  FETCH_BOTSETTINGS_FAIL,
  UPDATE_BOTSETTINGS,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchBotSettings() {
  return function (dispatch) {
    dispatch({
      type: FETCH_BOTSETTINGS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/bot/settings`)
      .then((response) => {
        dispatch({
          type: FETCH_BOTSETTINGS_SUCCESS,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_BOTSETTINGS_FAIL,
          payload: error,
        });
      });
  }
}

export function updateBotSettings(id, maintenance, enabled) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/bot/settings/update`, {
      id,
      maintenance,
      enabled,
    }).then((response) => {
      dispatch({
        type: UPDATE_BOTSETTINGS,
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
