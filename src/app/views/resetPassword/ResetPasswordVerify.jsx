import React, {
  useState,
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import queryString from 'query-string';
import {
  Button,
  Grid,
} from '@mui/material';
import {
  Form,
  Field,
} from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import Captcha from '../../components/Captcha';
import { resetPassword } from '../../actions/resetPassword';

function ResetPasswordVerify(props) {
  const {
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const [resend, setResend] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    setEmail(parsed.email);
    if (!props.resetPasswordProgress || email === '') {
      // navigate('/signup');
    }
  }, []);

  useEffect(() => { }, [email]);

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
          <Form
            onSubmit={async (values) => {
              console.log(values);
              setResend(true);
              dispatch(resetPassword(values, navigate));
            }}
            initialValues={{
              email,
            }}
            validate={(values) => {
              const errors = {};

              if (!values.captchaResponse) {
                errors.captchaResponse = 'Please validate the captcha.';
              }

              return errors;
            }}
          >
            {({
              form,
              handleSubmit,
              submitting,
              pristine,
            }) => (
              <form onSubmit={handleSubmit}>
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
                      <u>{email && email}</u>
                    </h3>
                  </Grid>
                  {
                    !resend
                        && (
                          <Grid item>
                            <Field
                              component={Captcha}
                              change={form.change}
                              name="captchaResponse"
                              submitting={submitting}
                            />
                          </Grid>
                        )
                  }
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
                      errorMessage
                  && errorMessage.resetPassword
                  && (
                    <div className="error-container">
                      {errorMessage.resetPassword}
                    </div>
                  )
                    }
                  </Grid>
                </Grid>
              </form>
            )}
          </Form>
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

export default connect(mapStateToProps, null)(ResetPasswordVerify);
