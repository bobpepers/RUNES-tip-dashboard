import React, { useState } from 'react';
import {
  Form,
  Field,
} from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Button,
  Grid,
  Box,
} from '@mui/material';
import Captcha from '../../components/Captcha';
import { signupUser } from '../../actions/auth';
import PasswordField from '../../components/form/PasswordField';
import TextField from '../../components/form/TextField';

function Register(props) {
  const {
    errorMessage,
    initialize,
    auth,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="form-container index600 shadow-w signinContainer content">
      <Grid
        container
        alignItems="center"
        justify="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={4}
          xl={4}
        >
          <h2 className="text-center">Sign up</h2>
          <Form
            onSubmit={async (values) => {
              await dispatch(signupUser(
                values,
                navigate,
              ));
            }}
            validate={(values) => {
              const errors = {};
              const fields = ['email', 'password', 'repassword', 'username'];

              fields.forEach((f) => {
                if (!(f in values)) {
                  errors[f] = `${f} is required`;
                }
              });

              if (values.username && values.username.length < 3) {
                errors.username = 'minimum of 4 characters';
              }

              if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(values.email)) {
                errors.email = 'please provide valid email';
              }

              if (values.password && values.password.length < 6) {
                errors.password = 'minimum 6 characters';
              }

              if (values.password !== values.repassword) {
                errors.repassword = "passwords doesn't match";
              }

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
                <Box
                  component={Grid}
                  container
                  item
                  justify="center"
                  direction="column"
                  py={3}
                  xs={12}
                >
                  <Box
                    component={Grid}
                    p={1}
                    item
                  >
                    <Field
                      name="username"
                      component={TextField}
                      type="text"
                      placeholder="Username"
                      label="Username"
                    />
                  </Box>
                  <Box
                    component={Grid}
                    p={1}
                    item
                  >
                    <Field
                      name="email"
                      component={TextField}
                      type="text"
                      placeholder="Email"
                      label="E-mail"
                    />
                  </Box>
                  <Box
                    component={Grid}
                    p={1}
                    item
                  >
                    <Field
                      name="password"
                      handleClickShowPassword={handleClickShowPassword}
                      mvalues={stateValues}
                      handleChange={handleChange}
                      handleMouseDownPassword={handleMouseDownPassword}
                      component={PasswordField}
                      placeholder="Password"
                      label="Password"
                    />
                  </Box>
                  <Box
                    component={Grid}
                    p={1}
                    item
                  >
                    <Field
                      name="repassword"
                      handleClickShowPassword={handleClickShowRePassword}
                      mvalues={stateValues}
                      handleChange={handleChange}
                      handleMouseDownPassword={handleMouseDownPassword}
                      component={PasswordField}
                      placeholder="Password"
                      label="Repeat Password"
                    />
                  </Box>
                  <Box
                    component={Grid}
                    p={1}
                    item
                  >
                    <Field
                      component={Captcha}
                      change={form.change}
                      name="captchaResponse"
                      submitting={submitting}
                    />
                    <div>
                      {errorMessage && errorMessage.signup
                    && (
                      <div className="error-container">
                        {errorMessage.signup}
                      </div>
                    )}
                    </div>
                  </Box>
                  <Box
                    component={Grid}
                    p={1}
                    item
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      disabled={pristine || submitting}
                    >
                      Sign up
                    </Button>
                  </Box>
                </Box>
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
    auth: state.auth,
    errorMessage: state.auth.error,
    initialValues: {
      referredby: '',
    },
  };
}

export default connect(mapStateToProps, null)(Register);
