import { configureStore } from '@reduxjs/toolkit'
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
import channels from './channels';
import features from './features';
import botSettings from './botSettings';

import acceptWithdrawal from './acceptWithdrawal';
import declineWithdrawal from './declineWithdrawal';
import patchDeposits from './patchDeposits';
import blockNumber from './blockNumber';
import startSync from './startSync';
import triviaQuestions from './triviaQuestions';
import insertTrivia from './insertTrivia';
import removeTrivia from './removeTrivia';
import switchTrivia from './switchTrivia';
import errors from './errors';
import user from './user';
import priceCurrencies from './priceCurrencies';
import userInfo from './userInfo';
import withdrawalAddresses from './withdrawalAddresses';
import withdrawalAddress from './withdrawalAddress';
import leaveServer from './leaveServer';
import adminWallet from './adminWallet';

import botFunctions from './botFunctions';
import botFunction from './botFunction';
import dp from './dp';

const store = configureStore({
  reducer: {
    auth,
    resetPass: resetPassword,
    tfa,
    theme,
    alert,

    nodeStatus,
    adminWallet,
    user,
    servers,
    channels,
    activity,
    users,
    deposits,
    withdrawals,
    dashboardUsers,
    features,
    acceptWithdrawal,
    declineWithdrawal,
    botSettings,
    patchDeposits,
    blockNumber,
    startSync,
    triviaQuestions,
    insertTrivia,
    removeTrivia,
    switchTrivia,
    priceCurrencies,
    errors,
    userInfo,
    leaveServer,
    dp,

    withdrawalAddresses,
    withdrawalAddress,

    botFunctions,
    botFunction,
  },
})

export default store;
