import axios from 'axios';
import {
    FETCH_LIABILITY_BEGIN,
    FETCH_LIABILITY_SUCCESS,
    FETCH_LIABILITY_FAIL,
    ENQUEUE_SNACKBAR,
} from './types/index';


export function fetchLiabilityAction(obj) {
    return function (dispatch) {
        dispatch({
            type: FETCH_LIABILITY_BEGIN,
        });
        axios.get(`${process.env.API_URL}/liability`)
            .then((response) => {
                console.log('SUCESSSSS');

                console.log(response);
                dispatch({
                    type: FETCH_LIABILITY_SUCCESS,
                    payload: response.data.liability,
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
                    type: FETCH_LIABILITY_FAIL,
                    payload: error,
                });
            });
    }
}