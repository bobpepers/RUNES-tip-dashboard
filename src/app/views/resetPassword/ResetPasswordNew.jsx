import React, {
  useEffect,
} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import * as qs from 'query-string';
import {
  Button,
  Grid,
  FormControl,
  TextField,
} from '@mui/material';
import {
  verifyResetPassword,
  resetPasswordNew,
} from '../../actions/resetPassword';

const renderField = ({
  input,
  type,
  placeholder,
  meta: {
    touched,
    error,
  },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField
        id="outlined-username-field"
        label={placeholder}
        type={type}
        variant="outlined"
        {...input}
      />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

function ResetPasswordNew(props) {
  const {
    handleSubmit,
    pristine,
    submitting,
    errorMessage,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const parsed = qs.parse(location.search);
    const { email } = parsed;
    const { token } = parsed;
    dispatch(verifyResetPassword({ email, token }));
  }, []);

  const handleFormSubmit = (myProps) => {
    const parsed = qs.parse(location.search);
    myProps.email = parsed.email;
    myProps.token = parsed.token;
    dispatch(resetPasswordNew(myProps, navigate));
  }

  return (
    <div className="form-container height100 content">
      <h2 className="text-center">New Password</h2>
      {
        /* Landing error message */
        errorMessage && errorMessage.verifyResetPassword
          ? (
            <div className="content">
              <h3>{ errorMessage.verifyResetPassword.message }</h3>
              {
                errorMessage.verifyResetPassword.resend
                  && <Link className="resend" to="/reset-password">Reset Password Again</Link>
              }
            </div>
          )
          : (
            <Grid
              container
              alignItems="center"
              justify="center"
              justifyContent="center"
            >
              <Grid
                item
                xs={10}
                sm={10}
                md={8}
                lg={4}
                xl={4}
              >
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <Field
                        name="newpassword"
                        component={renderField}
                        type="password"
                        placeholder="New password"
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="renewpassword"
                        component={renderField}
                        type="password"
                        placeholder="Repeat New password"
                      />
                      {
                        errorMessage
                          && errorMessage.verifyResetPassword
                            && (
                              <div className="error-container">
                                { errorMessage.verifyResetPassword.message }
                              </div>
                            )
                      }
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={pristine || submitting}
                        type="submit"
                        fullWidth
                        size="large"
                      >
                        Change password
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          )
      }
    </div>
  )
}

function validate(props) {
  const errors = {};
  const fields = ['newpassword', 'renewpassword'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.newpassword && props.newpassword.length < 6) {
    errors.newpassword = 'minimum 6 characters';
  }

  if (props.newpassword !== props.renewpassword) {
    errors.renewpassword = "passwords doesn't match";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.resetPass.error,
  };
}

export default connect(mapStateToProps, null)(reduxForm({ form: 'resetnewpassword', validate })(ResetPasswordNew));
