import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    console.log('location');
    console.log('location');
    console.log('location');
    console.log(location);
    const navigate = useNavigate();
    return <Child {...props} navigate={navigate} location={location} />;
  }
}
