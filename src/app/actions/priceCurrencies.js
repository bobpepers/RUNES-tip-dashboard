import axios from '../axios';
import {
  FETCH_PRICECURRENCIES_BEGIN,
  FETCH_PRICECURRENCIES_SUCCESS,
  FETCH_PRICECURRENCIES_FAIL,
  UPDATE_PRICECURRENCIES,
  REMOVE_PRICECURRENCIES,
  ADD_PRICECURRENCIES,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchPriceCurrenciesAction() {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_PRICECURRENCIES_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/pricecurrencies`, {
      // id,
      // channelId,
      // channelName
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: FETCH_PRICECURRENCIES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_PRICECURRENCIES_FAIL,
        payload: error,
      });
    });
  }
}

export function removePriceCurrenciesAction(id) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/pricecurrencies/remove`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: REMOVE_PRICECURRENCIES,
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

export function updatePricesAndConversionsAction() {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/pricecurrencies/updateprice`, {
      project: currentProject,
    })
      .then(() => {
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: Update price success',
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
        // dispatch({
        //   type: ADD_PRICECURRENCIES,
        //   payload: response.data.currency,
        // });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function addPriceCurrenciesAction(obj) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    const newObj = {
      ...obj,
      project: currentProject,
    }
    axios.post(`${window.myConfig.apiUrl}/management/pricecurrencies/add`, newObj)
      .then((response) => {
        dispatch({
          type: ADD_PRICECURRENCIES,
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

export function updatePriceCurrenciesAction(
  id,
  name,
  iso,
  type,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/pricecurrencies/update`, {
      id,
      name,
      iso,
      type,
      project: currentProject,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_PRICECURRENCIES,
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
