import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import tfa from './tfa';
import resetPassword from './resetPassword';
import theme from './changeTheme';
import alert from './alert';
import nodeStatus from './nodeStatus';
import groups from './groups';
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
import blockNumber from './blockNumber';
import triviaCategories from './triviaCategories';
import triviaQuestions from './triviaQuestions';
import insertTrivia from './insertTrivia';
import removeTrivia from './removeTrivia';
import switchTrivia from './switchTrivia';
import errors from './errors';
import logs from './logs';
import user from './user';
import priceCurrencies from './priceCurrencies';
import userInfo from './userInfo';
import withdrawalAddresses from './withdrawalAddresses';
import withdrawalAddress from './withdrawalAddress';
import leaveGroup from './leaveGroup';
import editServer from './editGroup';
import adminWallet from './adminWallet';

import coins from './coins';
import editCoinInfo from './editCoinInfo';
import deleteCoinInfoExchange from './deleteCoinInfoExchange';
import deleteCoinInfoHint from './deleteCoinInfoHint';

import botFunctions from './botFunctions';
import botFunction from './botFunction';
import transactionHistory from './transactionHistory';
import collectEarnings from './collectEarnings';
import selectedProject from './selectedProject';

const store = configureStore({
  reducer: {
    auth,
    resetPass: resetPassword,
    tfa,
    theme,
    alert,

    coins,
    editCoinInfo,
    deleteCoinInfoExchange,
    deleteCoinInfoHint,

    nodeStatus,
    adminWallet,
    user,
    groups,
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
    blockNumber,
    triviaCategories,
    triviaQuestions,
    insertTrivia,
    removeTrivia,
    switchTrivia,
    priceCurrencies,
    errors,
    logs,
    userInfo,
    leaveGroup,
    editServer,

    withdrawalAddresses,
    withdrawalAddress,

    botFunctions,
    botFunction,

    transactionHistory,
    collectEarnings,
    selectedProject,
  },
})

export default store;
