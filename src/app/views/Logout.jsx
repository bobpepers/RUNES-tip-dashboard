import React, {
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  useNavigate,
} from 'react-router-dom';
import {
  signoutUser,
} from '../actions/auth';

function LogoutView(props) {
  const {
    errorMessage,
    auth,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signoutUser(navigate));
  }, []);

  useEffect(() => {

  }, [
    errorMessage,
    auth,
  ]);

  return (
    <div className="content index600 shadow-w">
      <p>Logging out</p>
      <p>See you soon...</p>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps, null)(LogoutView);
