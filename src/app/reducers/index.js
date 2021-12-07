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
import dashboardUsers from "./dashboardUsers";
import liability from "./liability";
import balance from "./balance";
import channels from "./channels";
import features from "./features";

import acceptWithdrawal from "./acceptWithdrawal";
import declineWithdrawal from "./declineWithdrawal";

const rootReducer = combineReducers({
  form,
  auth: auth,
  tfa: tfa,
  theme: theme,
  alert: alert,

  nodeStatus: nodeStatus,
  servers: servers,
  channels: channels,
  activity: activity,
  users: users,
  deposits: deposits,
  withdrawals: withdrawals,
  dashboardUsers: dashboardUsers,
  liability: liability,
  balance: balance,
  features: features,
  acceptWithdrawal: acceptWithdrawal,
  declineWithdrawal: declineWithdrawal,

});

export default rootReducer;
