import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import tfa from './tfa';
import resetPassword from './resetPassword';
import theme from './changeTheme';
import alert from './alert';
import nodeStatus from './nodeStatus';
import servers from './servers';
import activity from './activity';
import users from './users';
import deposits from './deposits';
import withdrawals from './withdrawals';
import dashboardUsers from './dashboardUsers';
import liability from './liability';
import balance from './balance';
import channels from './channels';
import features from './features';
import botSettings from './botSettings';

import acceptWithdrawal from './acceptWithdrawal';
import declineWithdrawal from './declineWithdrawal';
import patchDeposits from './patchDeposits';
import faucetBalance from './faucetBalance';
import blockNumber from './blockNumber';
import startSync from './startSync';
import triviaQuestions from './triviaQuestions';
import insertTrivia from './insertTrivia';
import removeTrivia from './removeTrivia';
import switchTrivia from './switchTrivia';
import errors from './errors';
import user from './user';

const rootReducer = combineReducers({
  form,
  auth,
  resetPass: resetPassword,
  tfa,
  theme,
  alert,

  nodeStatus,
  user,
  servers,
  channels,
  activity,
  users,
  deposits,
  withdrawals,
  dashboardUsers,
  liability,
  balance,
  features,
  acceptWithdrawal,
  declineWithdrawal,
  botSettings,
  patchDeposits,
  faucetBalance,
  blockNumber,
  startSync,
  triviaQuestions,
  insertTrivia,
  removeTrivia,
  switchTrivia,
  errors,

});

export default rootReducer;
