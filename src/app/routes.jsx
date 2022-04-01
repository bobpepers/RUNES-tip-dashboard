import React, { useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
// import requireAuth from './components/hoc/RequireAuth';

import withTracker from './hooks/withTracker';

// import requireAuth from './components/hoc/RequireAuth';
// import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

import Home from './views/Home';

import Activity from './views/Activity';
import Settings from './views/Settings';

import Register from './views/register/Register';
import RegisterVerify from './views/register/RegisterVerify';
import VerifyEmail from './views/register/VerifyEmail';
import RegisterVerified from './views/register/RegisterVerified';

import ResetPassword from './views/resetPassword/ResetPassword';
import ResetPasswordVerify from './views/resetPassword/ResetPasswordVerify';
import ResetPasswordNew from './views/resetPassword/ResetPasswordNew';

import Servers from './views/management/Servers';
import Channels from './views/management/Channels';
import TriviaManagement from './views/management/TriviaManagement';
import Users from './views/management/Users';
import BotSettings from './views/management/BotSettings';
import Features from './views/management/Features';
import DashboardUsers from './views/management/DashboardUsers';
import PriceCurrenciesManagement from './views/management/PriceCurrencies';

import Deposits from './views/functions/Deposits';
import Withdrawals from './views/functions/Withdrawals';
import Errors from './views/functions/Errors';

import Login from './views/login/Login';
import LoginTFA from './views/login/Login2FA';

import { authenticated } from './actions/auth';

const RequireAuth = function (props) {
  const {
    Isauthenticated,
    tfaLocked,
    doneLoading,
  } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => dispatch(authenticated()), [dispatch]);
  useEffect(() => {
    console.log(Isauthenticated);
    if (!Isauthenticated && doneLoading) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    if (tfaLocked && doneLoading) {
      return <Navigate to="/login/2fa" state={{ from: location }} />;
    }
    return <Outlet />;
  }, [
    Isauthenticated,
    doneLoading,
    tfaLocked,
  ]);
  if (!Isauthenticated && doneLoading) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (tfaLocked && doneLoading) {
    return <Navigate to="/login/2fa" state={{ from: location }} />;
  }
  return <Outlet />;
}

const RoutesX = function (props) {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

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
          path="/users"
          element={<Users />}
        />
        <Route
          path="/bot/settings"
          element={<BotSettings />}
        />
        <Route
          path="/features"
          element={<Features />}
        />
        <Route
          path="/servers"
          element={<Servers />}
        />
        <Route
          path="/channels"
          element={<Channels />}
        />
        <Route
          path="/activity"
          element={<Activity />}
        />
        <Route
          path="/deposits"
          element={<Deposits />}
        />
        <Route
          path="/withdrawals"
          element={<Withdrawals />}
        />
        <Route
          path="/errors"
          element={<Errors />}
        />
        <Route
          path="/dashboardusers"
          element={<DashboardUsers />}
        />
        <Route
          path="/triviamanagement"
          element={<TriviaManagement />}
        />
        <Route
          path="/pricecurrenciesmanagement"
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
