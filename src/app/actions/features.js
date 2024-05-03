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
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_FEATURES_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/features`, {
      // id,
      // channelId,
      // channelName
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_FEATURES_SUCCESS,
        payload: response.data.result,
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
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/feature/remove`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: REMOVE_FEATURE,
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

export function addFeature(obj) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    const addFeatureObject = {
      ...obj,
      project: currentProject,
    }
    axios.post(`${window.myConfig.apiUrl}/management/feature/add`, addFeatureObject)
      .then((response) => {
        dispatch({
          type: ADD_FEATURE,
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

export function updateFeature(
  id,
  min,
  fee,
  maxSampleSize,
  enabled,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/feature/update`, {
      id,
      min,
      fee,
      maxSampleSize,
      enabled,
      project: currentProject,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_FEATURE,
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
