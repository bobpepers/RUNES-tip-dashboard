import {
  ENQUEUE_SNACKBAR,
} from '../types/index';

export const notistackErrorAdd = (
  dispatch,
  error,
) => {
  const errorMessage = (error && error.response && error.response.data && error.response.data.error && error.response.data.error)
  || (error && error.message)
  || (error && error.response && error.response.data);
  if (error.response) {
    // client received an error response (5xx, 4xx)
    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: `${error.response.status}: ${errorMessage}`,
        key: new Date().getTime() + Math.random(),
        options: {
          variant: error.response.status === 404 ? 'warning' : 'error',
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
}
