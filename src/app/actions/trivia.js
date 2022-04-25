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
  UPDATE_TRIVIAQUESTION,

  REMOVE_TRIVIA_BEGIN,
  REMOVE_TRIVIA_SUCCESS,
  REMOVE_TRIVIA_FAIL,

  DELETE_TRIVIAQUESTION,
  ADD_TRIVIAQUESTION,

} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function switchTriviaAction(id) {
  return function (dispatch) {
    dispatch({
      type: SWITCH_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/trivia/switch`, { id })
      .then((response) => {
        console.log('SUCESSSSS');

        console.log(response);
        dispatch({
          type: SWITCH_TRIVIA_SUCCESS,
          payload: response.data.trivia,
        });
        dispatch({
          type: UPDATE_TRIVIAQUESTION,
          payload: response.data.trivia,
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

export function removeTriviaAction(id) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/trivia/remove`, { id })
      .then((response) => {
        console.log('SUCESSSSS');

        console.log(response);
        dispatch({
          type: REMOVE_TRIVIA_SUCCESS,
          payload: response.data.trivia,
        });
        dispatch({
          type: DELETE_TRIVIAQUESTION,
          payload: response.data.trivia,
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

export function insertTriviaAction(question, answers) {
  return function (dispatch) {
    dispatch({
      type: INSERT_TRIVIA_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/trivia/insert`, { question, answers })
      .then((response) => {
        console.log('SUCESSSSS');

        console.log(response);
        dispatch({
          type: INSERT_TRIVIA_SUCCESS,
          payload: response.data.trivia,
        });
        dispatch({
          type: ADD_TRIVIAQUESTION,
          payload: response.data.trivia,
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
  return function (dispatch) {
    dispatch({
      type: FETCH_TRIVIAQUESTIONS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/triviaquestions`)
      .then((response) => {
        console.log('SUCESSSSS triviaquestions');

        console.log(response);
        dispatch({
          type: FETCH_TRIVIAQUESTIONS_SUCCESS,
          payload: response.data.trivia,
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
