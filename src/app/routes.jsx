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
import RegisterVerify from './views/RegisterVerify';
import VerifyEmail from './views/VerifyEmail';
import RegisterVerified from './views/RegisterVerified';

// import requireAuth from './components/hoc/RequireAuth';

import withTracker from './hooks/withTracker';

// import requireAuth from './components/hoc/RequireAuth';
// import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

import Register from './views/Register';
import Home from './views/Home';
import Login from './views/Login';
import Servers from './views/Servers';
import Users from './views/Users';
import Activity from './views/Activity';
import Deposits from './views/Deposits';
import Channels from './views/Channels';
import Withdrawals from './views/Withdrawals';
import DashboardUsers from './views/DashboardUsers';
import { authenticated } from './actions/auth';

import Features from './views/Features';

function RequireAuth(props) {
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

const RoutesX = (props) => {
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
          path="/dashboardusers"
          element={<DashboardUsers />}
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
