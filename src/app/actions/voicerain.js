import axios from '../axios';
import {
  FETCH_VOICERAINS_BEGIN,
  FETCH_VOICERAINS_SUCCESS,
  FETCH_VOICERAINS_FAIL,
  FETCH_VOICERAIN_BEGIN,
  FETCH_VOICERAIN_SUCCESS,
  FETCH_VOICERAIN_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchVoicerainsAction(
  id,
  address,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_VOICERAINS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/voicerains`, {
      id,
      address,
      offset,
      limit,
    })
      .then((response) => {
        dispatch({
          type: FETCH_VOICERAINS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_VOICERAINS_FAIL,
          payload: error,
        });
      });
  }
}

export function fetchVoicerainAction(
  id,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_VOICERAIN_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/voicerain`, {
      id,
    }).then((response) => {
      dispatch({
        type: FETCH_VOICERAIN_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_VOICERAIN_FAIL,
        payload: error,
      });
    });
  }
}
