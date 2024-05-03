import axios from '../axios';
import {
  FETCH_TRIVIAQUESTIONS_BEGIN,
  FETCH_TRIVIAQUESTIONS_SUCCESS,
  FETCH_TRIVIAQUESTIONS_FAIL,

  INSERT_TRIVIA_BEGIN,
  INSERT_TRIVIA_SUCCESS,
  INSERT_TRIVIA_FAIL,

  SWITCH_TRIVIA_BEGIN,
  SWITCH_TRIVIA_SUCCESS,
  SWITCH_TRIVIA_FAIL,

  REMOVE_TRIVIA_BEGIN,
  REMOVE_TRIVIA_SUCCESS,
  REMOVE_TRIVIA_FAIL,

  DELETE_TRIVIAQUESTION,
  ADD_TRIVIAQUESTION,

  UPDATE_TRIVIA_QUESTION,
  UPDATE_TRIVIA_ANSWER,

} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function switchTriviaAction(id) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: SWITCH_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/trivia/switch`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: SWITCH_TRIVIA_SUCCESS,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: SWITCH_TRIVIA_FAIL,
        payload: error,
      });
    });
  }
}

export function updateTriviaQuestionAction(
  id,
  question,
  category,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: REMOVE_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/trivia/question/edit`, {
      id,
      question,
      category,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION,
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

export function updateTriviaAnswerAction(
  id,
  answer,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: REMOVE_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/trivia/answer/edit`, {
      id,
      answer,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: UPDATE_TRIVIA_ANSWER,
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
export function removeTriviaAction(
  id,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: REMOVE_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/trivia/remove`, {
      id,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: REMOVE_TRIVIA_SUCCESS,
        payload: response.data.result.id,
      });
      dispatch({
        type: DELETE_TRIVIAQUESTION,
        payload: response.data.result.id,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: REMOVE_TRIVIA_FAIL,
        payload: error,
      });
    });
  }
}

export function insertTriviaAction(
  question,
  answers,
) {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: INSERT_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/trivia/insert`, {
      question,
      answers,
      project: currentProject,
    }).then((response) => {
      dispatch({
        type: INSERT_TRIVIA_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: ADD_TRIVIAQUESTION,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: INSERT_TRIVIA_FAIL,
        payload: error,
      });
    });
  }
}

export function fetchTriviaQuestions() {
  return function (dispatch, getState) {
    const { currentProject } = getState().selectedProject;
    dispatch({
      type: FETCH_TRIVIAQUESTIONS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/management/triviaquestions?project=${currentProject}`)
      .then((response) => {
        dispatch({
          type: FETCH_TRIVIAQUESTIONS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_TRIVIAQUESTIONS_FAIL,
          payload: error,
        });
      });
  }
}
