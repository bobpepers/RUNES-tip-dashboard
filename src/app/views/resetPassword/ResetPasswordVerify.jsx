import React, {
  useState,
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import * as qs from 'query-string';
import {
  Button,
  Grid,
} from '@mui/material';
import {
  initialize,
  reduxForm,
  Field,
  change,
} from 'redux-form';
import { useNavigate } from 'react-router-dom';
import Captcha from '../../components/Captcha';
import { resetPassword } from '../../actions/resetPassword';
// import history from '../../history';

function ResetPasswordVerify(props) {
  const {
    handleSubmit,
    pristine,
    submitting,
    initialize,
    // resetPassword,
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const [resend, setResend] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const parsed = qs.parse(location.search);
    setEmail(parsed.email);
    initialize({ email: parsed.email });
    if (!props.resetPasswordProgress || email === '') {
      // navigate('/signup');
    }
  }, []);

  const handleFormSubmit = async (formProps) => {
    console.log(formProps);
    setResend(true);
    dispatch(resetPassword(formProps, navigate));
  }

  return (
    <div className="form-container height100 content">
      <Grid
        container
        alignItems="center"
        justify="center"
        justifyContent="center"
        align="center"
      >
        <Grid item xs={4}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <h2 className="text-center">Reset Password</h2>
              </Grid>
              <Grid item>
                <h3 className="text-center">
                  We&apos;ve just emailed you password reset instructions at
                </h3>
              </Grid>
              <Grid item>
                <h3 className="text-center">
                  <u>{ email && email }</u>
                </h3>
              </Grid>
              <Grid item>
                <Field
                  component={Captcha}
                  change={change}
                  name="captchaResponse"
                />
              </Grid>
              <Grid item>
                {
                  !resend
                    ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={pristine || submitting}
                        type="submit"
                        fullWidth
                        size="large"
                      >
                        Resend instructions
                      </Button>
                    )
                    : (
                      <p className="resended text-center">
                        Reset password instructions has been resent
                      </p>
                    )
                }
              </Grid>
              <Grid item>
                {
                  props.errorMessage
                  && props.errorMessage.resetPassword
                  && (
                    <div className="error-container">
                      { props.errorMessage.resetPassword }
                    </div>
                  )
                }
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    resetPasswordProgress: state.resetPass.resetPassword,
    errorMessage: state.resetPass.error,
  };
}

const mapDispatchToProps = {
  initialize,
};

const validate = (formProps) => {
  const errors = {};

  if (!formProps.captchaResponse) {
    errors.captchaResponse = 'Please validate the captcha.';
  }

  return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'resetpasswordVerify', validate })(ResetPasswordVerify));
// export default connect(mapStateToProps, null)(ResetPasswordVerify);
