import axios from 'axios';
import {
    FETCH_SERVERS_BEGIN,
    FETCH_SERVERS_SUCCESS,
    FETCH_SERVERS_FAIL,
    ENQUEUE_SNACKBAR,
} from './types/index';


export function fetchServerAction(id, groupId, serverName, platform) {
    return function (dispatch) {
        dispatch({
            type: FETCH_SERVERS_BEGIN,
        });
        axios.post(`${process.env.API_URL}/servers`, { id, groupId, serverName, platform })
            .then((response) => {
                console.log('SUCESSSSS');
                console.log(response);
                dispatch({
                    type: FETCH_SERVERS_SUCCESS,
                    payload: response.data.servers,
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
                    type: FETCH_SERVERS_FAIL,
                    payload: error,
                });
            });
    }
}