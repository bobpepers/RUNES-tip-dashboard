import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import tfa from "./tfa";
import theme from './changeTheme';
import alert from "./alert";
import nodeStatus from "./nodeStatus";
import servers from "./servers";
import activity from "./activity";
import users from "./users";
import deposits from "./deposits";
import withdrawals from "./withdrawals";

const rootReducer = combineReducers({
  form,
  auth: auth,
  tfa: tfa,
  theme: theme,
  alert: alert,

  nodeStatus: nodeStatus,
  servers: servers,
  activity: activity,
  users: users,
  deposits: deposits,
  withdrawals: withdrawals,

});

export default rootReducer;
