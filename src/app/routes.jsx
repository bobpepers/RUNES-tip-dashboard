import React, {
  useEffect,
} from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import toggleTheme from './helpers/toggleTheme';
import Home from './views/Home';
import Settings from './views/Settings';
import Register from './views/register/Register';
import RegisterVerify from './views/register/RegisterVerify';
import VerifyEmail from './views/register/VerifyEmail';
import RegisterVerified from './views/register/RegisterVerified';
import ResetPassword from './views/resetPassword/ResetPassword';
import ResetPasswordVerify from './views/resetPassword/ResetPasswordVerify';
import ResetPasswordNew from './views/resetPassword/ResetPasswordNew';
import Servers from './views/management/Servers';
import UserView from './views/management/User';
import Channels from './views/management/Channels';
import TriviaManagement from './views/management/TriviaManagement';
import TriviaCategoryManagement from './views/management/TriviaCategoryManagement';
import Users from './views/management/Users';
import BotSettings from './views/management/BotSettings';
import Features from './views/management/Features';
import DashboardUsers from './views/management/DashboardUsers';
import PriceCurrenciesManagement from './views/management/PriceCurrencies';
import WithdrawalAddressesView from './views/management/WithdrawalAddresses';
import WithdrawalAddressView from './views/management/WithdrawalAddress';
import FunctionsView from './views/functions/Functions';
import FunctionView from './views/functions/Function';
import Deposits from './views/functions/Deposits';
import Withdrawals from './views/functions/Withdrawals';
import Errors from './views/functions/Errors';
import Logs from './views/functions/Logs';
import Login from './views/login/Login';
import LoginTFA from './views/login/Login2FA';
import LogoutView from './views/Logout';
import CoinsView from './views/management/Coins';
import { authenticatedAction } from './actions/auth';
import TransactionHistoryManagement from './views/management/TransactionHistory'

const RequireAuth = function (props) {
  const {
    Isauthenticated,
    tfaLocked,
    doneLoading,
  } = props;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticatedAction());
  }, []);

  useEffect(() => {
    console.log('require auth');
    console.log(tfaLocked);
    console.log(doneLoading);
    console.log(Isauthenticated);
  }, [
    Isauthenticated,
    doneLoading,
    tfaLocked,
  ]);

  if (!Isauthenticated && doneLoading) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
      />
    );
  }
  if (tfaLocked && doneLoading) {
    return (
      <Navigate
        to="/login/2fa"
        state={{
          from: location,
        }}
      />
    );
  }
  return <Outlet />;
}

const functionNames = [
  'rain',
  'flood',
  'sleet',
  'soak',
  'tip',
  'channelwave',
  'thunder',
  'trivia',
  'reactdrop',
];

const RoutesX = function (props) {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [
    theme,
  ]);

  return (
    <Routes>
      <Route
        element={<RequireAuth {...props} />}
      >
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/management/users"
          element={<Users />}
        />
        <Route
          path="/management/user/:userId"
          element={<UserView />}
        />
        <Route
          path="/management/bot/settings"
          element={<BotSettings />}
        />
        <Route
          path="/management/features"
          element={<Features />}
        />
        <Route
          path="/management/servers"
          element={<Servers />}
        />
        <Route
          path="/management/channels"
          element={<Channels />}
        />
        <Route
          path="/management/withdrawaladdresses"
          element={<WithdrawalAddressesView />}
        />
        <Route
          path="/management/withdrawaladdress/:addressId"
          element={<WithdrawalAddressView />}
        />

        {functionNames.map((functionName) => (
          <React.Fragment key={functionName}>
            <Route
              path={`/functions/${functionName}s`}
              element={<FunctionsView functionName={functionName} />}
            />
            <Route
              path={`/functions/${functionName}/:functionId`}
              element={<FunctionView functionName={functionName} />}
            />
          </React.Fragment>
        ))}

        <Route
          path="/functions/deposits"
          element={<Deposits />}
        />
        <Route
          path="/functions/withdrawals"
          element={<Withdrawals />}
        />
        <Route
          path="/functions/errors"
          element={<Errors />}
        />
        <Route
          path="/functions/logs"
          element={<Logs />}
        />
        <Route
          path="/management/dashboardusers"
          element={<DashboardUsers />}
        />
        <Route
          path="/management/coins"
          element={<CoinsView />}
        />
        <Route
          path="/management/trivia"
          element={<TriviaManagement />}
        />
        <Route
          path="/management/transaction/history"
          element={<TransactionHistoryManagement />}
        />
        <Route
          path="/management/trivia/categories"
          element={<TriviaCategoryManagement />}
        />
        <Route
          path="/management/pricecurrencies"
          element={<PriceCurrenciesManagement />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<LogoutView />}
      />

      <Route
        path="/login/2fa"
        element={<LoginTFA />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route
        path="/reset-password/verify"
        element={<ResetPasswordVerify />}
      />
      <Route
        path="/reset-password/new"
        element={<ResetPasswordNew />}
      />

      <Route
        path="/register/verify-register"
        element={<RegisterVerify />}
      />
      <Route
        path="/register/verify-email"
        element={<VerifyEmail />}
      />
      <Route
        path="/register/verified"
        element={<RegisterVerified />}
      />
    </Routes>
  )
}

RoutesX.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
  Isauthenticated: state.auth.authenticated,
  tfaLocked: state.auth.tfaLocked,
  doneLoading: state.auth.doneLoading,
})

export default connect(mapStateToProps, null)(RoutesX);
