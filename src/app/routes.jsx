import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withTracker from './hooks/withTracker';

// import requireAuth from './components/hoc/RequireAuth';
// import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

import Register from './views/Register';
import Home from './views/Home';
import Login from './views/Login';

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
        // exact
        path="/"
        element={<Home />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
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
})

export default connect(mapStateToProps, null)(RoutesX);
