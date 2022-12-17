import React, {
  useEffect,
  useState,
} from 'react';
import {
  Form,
  Field,
} from 'react-final-form';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
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
  verifyResetPassword,
  resetPasswordNew,
} from '../../actions/resetPassword';
import PasswordField from '../../components/form/PasswordField';

function ResetPasswordNew(props) {
  const {
    errorMessage,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const { email } = parsed;
    const { token } = parsed;
    dispatch(verifyResetPassword({ email, token }));
  }, []);

  const [stateValues, setStateValues] = useState({
    password: '',
    rePassword: '',
    showPassword: false,
    showRePassword: false,
  });

  const handleChange = (prop) => (event) => {
    setStateValues({
      ...stateValues,
      [prop]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setStateValues({
      ...stateValues,
      showPassword: !stateValues.showPassword,
    });
  };

  const handleClickShowRePassword = () => {
    setStateValues({
      ...stateValues,
      showRePassword: !stateValues.showRePassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form-container height100 content">
      <h2 className="text-center">New Password</h2>
      {
        /* Landing error message */
        errorMessage && errorMessage.verifyResetPassword
          ? (
            <div className="content">
              <h3>{errorMessage.verifyResetPassword.message}</h3>
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
                <Form
                  onSubmit={async (values) => {
                    const parsed = queryString.parse(location.search);
                    values.email = parsed.email;
                    values.token = parsed.token;
                    await dispatch(resetPasswordNew(values, navigate));
                  }}
                  validate={(values) => {
                    const errors = {};
                    const fields = ['newpassword', 'renewpassword'];

                    fields.forEach((f) => {
                      if (!(f in values)) {
                        errors[f] = `${f} is required`;
                      }
                    });

                    if (values.newpassword && values.newpassword.length < 6) {
                      errors.newpassword = 'minimum 6 characters';
                    }

                    if (values.newpassword !== values.renewpassword) {
                      errors.renewpassword = "passwords doesn't match";
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
                          <Field
                            name="newpassword"
                            handleClickShowPassword={handleClickShowPassword}
                            mvalues={stateValues}
                            handleChange={handleChange}
                            handleMouseDownPassword={handleMouseDownPassword}
                            component={PasswordField}
                            placeholder="New password"
                            label="New password"
                          />
                        </Grid>
                        <Grid item>
                          <Field
                            name="renewpassword"
                            handleClickShowPassword={handleClickShowRePassword}
                            mvalues={stateValues}
                            handleChange={handleChange}
                            handleMouseDownPassword={handleMouseDownPassword}
                            component={PasswordField}
                            placeholder="Repeat New password"
                            label="Repeat New password"
                          />
                          {
                            errorMessage
                        && errorMessage.verifyResetPassword
                        && (
                          <div className="error-container">
                            {errorMessage.verifyResetPassword.message}
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
                  )}
                </Form>
              </Grid>
            </Grid>
          )
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    errorMessage: state.resetPass.error,
  };
}

export default connect(mapStateToProps, null)(ResetPasswordNew);
