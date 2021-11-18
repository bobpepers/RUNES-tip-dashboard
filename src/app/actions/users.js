import axios from 'axios';
import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    ENQUEUE_SNACKBAR,
} from './types/index';


export function fetchUsersAction(id, userId, username, platform, banned) {
    return function (dispatch) {
        dispatch({
            type: FETCH_USERS_BEGIN,
        });
        axios.post(`${process.env.API_URL}/users`, { id, userId, username, platform, banned })
            .then((response) => {
                dispatch({
                    type: FETCH_USERS_SUCCESS,
                    payload: response.data.users,
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
                    type: FETCH_USERS_FAIL,
                    payload: error,
                });
            });
    }
}