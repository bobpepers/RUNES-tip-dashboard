import axios from '../axios';
import {
  FETCH_COINS_BEGIN,
  FETCH_COINS_SUCCESS,
  FETCH_COINS_FAIL,
  EDIT_COININFO_BEGIN,
  EDIT_COININFO_SUCCESS,
  EDIT_COININFO_FAIL,
  DELETE_COININFOEXCHANGE_BEGIN,
  DELETE_COININFOEXCHANGE_SUCCESS,
  DELETE_COININFOEXCHANGE_FAIL,
  UPDATE_COIN,
  DELETE_COININFOHINT_BEGIN,
  DELETE_COININFOHINT_SUCCESS,
  DELETE_COININFOHINT_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchCoinsAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_COINS_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/management/coins`, {
    })
      .then((response) => {
        dispatch({
          type: FETCH_COINS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_COINS_FAIL,
          payload: error,
        });
      });
  }
}

export function editCoinInfoAction(
  id,
  name,
  logoUrl,
  website,
  explorer,
  explorerTransactionPath,
  github,
  telegram,
  discord,
  description,
  exchanges,
  hints,
) {
  return function (dispatch) {
    dispatch({
      type: EDIT_COININFO_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/coinInfo/edit`, {
      id,
      name,
      logoUrl,
      website,
      explorer,
      explorerTransactionPath,
      github,
      telegram,
      discord,
      description,
      exchanges,
      hints,
    }).then((response) => {
      dispatch({
        type: EDIT_COININFO_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: UPDATE_COIN,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: EDIT_COININFO_FAIL,
        payload: error,
      });
    });
  }
}

export function deleteCoinInfoExchangeAction(
  id,
  coinId,
) {
  return function (dispatch) {
    dispatch({
      type: DELETE_COININFOEXCHANGE_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/coinInfo/exchange/delete`, {
      id,
      coinId,
    }).then((response) => {
      dispatch({
        type: DELETE_COININFOEXCHANGE_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: UPDATE_COIN,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: DELETE_COININFOEXCHANGE_FAIL,
        payload: error,
      });
    });
  }
}

export function deleteCoinInfoHintAction(
  id,
  coinId,
) {
  return function (dispatch) {
    dispatch({
      type: DELETE_COININFOHINT_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/coinInfo/hint/delete`, {
      id,
      coinId,
    }).then((response) => {
      dispatch({
        type: DELETE_COININFOHINT_SUCCESS,
        payload: response.data.result,
      });
      dispatch({
        type: UPDATE_COIN,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: DELETE_COININFOHINT_FAIL,
        payload: error,
      });
    });
  }
}
