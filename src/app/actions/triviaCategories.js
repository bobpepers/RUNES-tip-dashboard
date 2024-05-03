import axios from '../axios';
import {
  FETCH_TRIVIACATEGORIES_BEGIN,
  FETCH_TRIVIACATEGORIES_SUCCESS,
  FETCH_TRIVIACATEGORIES_FAIL,

  DELETE_TRIVIACATEGORY,
  ADD_TRIVIACATEGORY,
  UPDATE_TRIVIACATEGORY,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function updateTriviaCategoryAction(
  id,
  name,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/trivia/category/edit`, {
      id,
      name,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: UPDATE_TRIVIACATEGORY,
        payload: response.data.result,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: Category Adjusted',
          key: new Date().getTime() + Math.random(),
          options: {
            variant: 'success',
          },
        },
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
    });
  }
}

export function removeTriviaCategoryAction(
  id,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/trivia/category/remove`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: DELETE_TRIVIACATEGORY,
        payload: response.data.result.id,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: Category Removed',
          key: new Date().getTime() + Math.random(),
          options: {
            variant: 'success',
          },
        },
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
    });
  }
}

export function insertTriviaCategoryAction(
  name,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    axios.post(`${window.myConfig.apiUrl}/management/trivia/category/insert`, {
      name,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: ADD_TRIVIACATEGORY,
        payload: response.data.result,
      });
      dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
          message: 'Success: Category Added',
          key: new Date().getTime() + Math.random(),
          options: {
            variant: 'success',
          },
        },
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
    });
  }
}

export function fetchTriviaCategories() {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_TRIVIACATEGORIES_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/management/trivia/categories?project=${currentProject}`)
      .then((response) => {
        dispatch({
          type: FETCH_TRIVIACATEGORIES_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_TRIVIACATEGORIES_FAIL,
          payload: error,
        });
      });
  }
}
