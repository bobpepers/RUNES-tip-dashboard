import React from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

export function withRouter(Child) {
  return function (props) {
    const location = useLocation();
    const navigate = useNavigate();
    return <Child {...props} navigate={navigate} location={location} />;
  }
}
