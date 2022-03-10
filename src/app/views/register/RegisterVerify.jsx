import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import { Button } from '@mui/material';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  resendVerification,
} from '../../actions/auth';

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const RegisterVerify = (props) => {
  const {
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const [resend, setResend] = useState(false);
  const email = query.get('email');
  console.log(email);

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, []);

  const resendEmail = (myProps) => {
    setResend(true);
    dispatch(resendVerification(myProps));
  }

  return (
    <div className="content index600 shadow-w textCenter content">
      <h2 className="textCenter">Activate account</h2>
      <h3 className="textCenter">
        Please confirm the verification code we've just emailed you at
        <br />
        <u>{email && email}</u>
      </h3>
      {
        !resend
          ? <Button variant="contained" color="primary" type="submit" className="btn" size="large" className="resend" onClick={() => resendEmail({ email })}>Resend email verification code</Button>
          : <p className="resended textCenter">Email verification code has been resent</p>
      }
      {
        errorMessage && errorMessage.signupResend
        && <div className="error-container">{errorMessage.signupResend}</div>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    signup: state.auth.signup,
  };
}

export default connect(mapStateToProps, null)(RegisterVerify);
