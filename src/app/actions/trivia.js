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

  ENQUEUE_SNACKBAR,
} from './types/index';

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
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
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
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
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
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
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
        console.log(error);
        if (error.response) {
          // client received an error response (5xx, 4xx)
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: `${error.response.status}: ${error.response.data.error}`,
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else if (error.request) {
          // client never received a response, or request never left
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Connection Timeout',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        } else {
          dispatch({
            type: ENQUEUE_SNACKBAR,
            notification: {
              message: 'Unknown Error',
              key: new Date().getTime() + Math.random(),
              options: {
                variant: 'error',
              },
            },
          });
        }
        dispatch({
          type: FETCH_TRIVIAQUESTIONS_FAIL,
          payload: error,
        });
      });
  }
}
