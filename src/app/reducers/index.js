import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import tfa from "./tfa";
import theme from './changeTheme';
import alert from "./alert";
import nodeStatus from "./nodeStatus";

const rootReducer = combineReducers({
  form,
  auth: auth,
  tfa: tfa,
  theme: theme,
  alert: alert,

  nodeStatus: nodeStatus,

});

export default rootReducer;
