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
// import requireAuth from './components/hoc/RequireAuth';

import withTracker from './hooks/withTracker';

// import requireAuth from './components/hoc/RequireAuth';
// import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

import Register from './views/Register';
import Home from './views/Home';
import Login from './views/Login';
import { authenticated } from './actions/auth';

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
          // exact
          path="/"
          element={<Home />}
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
