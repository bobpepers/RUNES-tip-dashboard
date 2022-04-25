import axios from '../axios';
import {
  FETCH_FEATURES_BEGIN,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATUERS_FAIL,
  UPDATE_FEATURE,
  REMOVE_FEATURE,
  ADD_FEATURE,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchFeatures() {
  return function (dispatch) {
    dispatch({
      type: FETCH_FEATURES_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/features`, {
      // id,
      // channelId,
      // channelName
    })
      .then((response) => {
        console.log('SUCESSSSS');
        console.log(response);
        dispatch({
          type: FETCH_FEATURES_SUCCESS,
          payload: response.data.features,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_FEATUERS_FAIL,
          payload: error,
        });
      });
  }
}

export function removeFeature(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/feature/remove`, { id })
      .then((response) => {
        console.log(response);
        dispatch({
          type: REMOVE_FEATURE,
          payload: response.data.feature,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function addFeature(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/feature/add`, obj)
      .then((response) => {
        console.log(response);
        dispatch({
          type: ADD_FEATURE,
          payload: response.data.feature,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function updateFeature(
  id,
  min,
  fee,
  maxSampleSize,
  enabled,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/feature/update`, {
      id,
      min,
      fee,
      maxSampleSize,
      enabled,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_FEATURE,
          payload: response.data.feature,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}
