import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../history';
// import * as actions from '../../actions'
import { authenticated } from '../../actions/auth';
import { fetchUserData } from '../../actions/user';

export default function (ComposedComponent) {
  function Authentication(props) {
    const dispatch = useDispatch();
    useEffect(() => dispatch(authenticated()), [dispatch]);
    useEffect(() => {
      if (props.Isauthenticated && props.tfaLocked && props.doneLoading) {
        history.push('/login/2fa');
      }
      dispatch(fetchUserData());
    }, [
      props.Isauthenticated,
      props.doneLoading,
      props.tfaLocked,
    ]);

    return <ComposedComponent {...props} />
  }

  Authentication.propTypes = {
    Isauthenticated: PropTypes.bool,
    tfaLocked: PropTypes.bool,
  };

  function mapStateToProps(state) {
    return {
      Isauthenticated: state.auth.authenticated,
      tfaLocked: state.auth.tfaLocked,
      doneLoading: state.auth.doneLoading,
    };
  }

  return connect(mapStateToProps, authenticated)(Authentication);
}
