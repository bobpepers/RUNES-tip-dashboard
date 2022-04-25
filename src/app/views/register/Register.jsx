import React, { useState } from 'react';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  TextField,
  Box,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import * as actions from '../../actions/auth';
import Captcha from '../../components/Captcha';

const renderField = ({
  InputProps,
  disabled,
  value,
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
        label={placeholder}
        type={type}
        value={value}
        disabled={!!disabled}
        variant="outlined"
        InputProps={InputProps}
        {...input}
      />
      {touched && error && <div className="form-error">{error}</div>}
    </FormControl>
  </div>
);

function Register(props) {
  const {
    handleSubmit,
    signupUser,
    initialize,
    auth,
  } = props;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: '',
    rePassword: '',
    showPassword: false,
    showRePassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowRePassword = () => {
    setValues({ ...values, showRePassword: !values.showRePassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const renderPasswordField = (
    {
      input,
      type,
      placeholder,
      meta: {
        touched,
        error,
      },
    },
  ) => (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
      <FormControl
        // className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        fullWidth
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
          labelWidth={70}
          {...input}
        />
      </FormControl>
      {touched && error && <div className="form-error">{error}</div>}
    </div>
  );

  const renderRePasswordField = (
    {
      input,
      type,
      placeholder,
      meta: {
        touched,
        error,
      },
    },
  ) => (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
      <FormControl
        // className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        fullWidth
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showRePassword ? 'text' : 'password'}
          value={values.rePassword}
          onChange={handleChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRePassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showRePassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
          labelWidth={70}
          {...input}
        />
      </FormControl>
      {touched && error && <div className="form-error">{error}</div>}
    </div>
  );

  const handleFormSubmit = async (formProps) => {
    await signupUser(formProps, navigate);
  }

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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  component={renderField}
                  type="text"
                  placeholder="Username"
                />
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Field
                  name="email"
                  component={renderField}
                  type="text"
                  placeholder="Email"
                />
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Field
                  name="password"
                  component={renderPasswordField}
                  type="password"
                  placeholder="Password"
                />
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Field
                  name="repassword"
                  component={renderRePasswordField}
                  type="password"
                  placeholder="Repeat Password"
                />
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Field
                  component={Captcha}
                  change={change}
                  name="captchaResponse"
                />
                <div>
                  {props.errorMessage && props.errorMessage.signup
                    && (
                      <div className="error-container">
                        {props.errorMessage.signup}
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
                >
                  Sign up
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

const validate = (props) => {
  const errors = {};
  const fields = ['email', 'password', 'repassword', 'username'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.username && props.username.length < 3) {
    errors.username = 'minimum of 4 characters';
  }

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(props.email)) {
    errors.email = 'please provide valid email';
  }

  if (props.password && props.password.length < 6) {
    errors.password = 'minimum 6 characters';
  }

  if (props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match";
  }

  if (!props.captchaResponse) {
    errors.captchaResponse = 'Please validate the captcha.';
  }

  return errors;
};
const selector = formValueSelector('signin');

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errorMessage: state.auth.error,
    recaptchaValue: selector(state, 'captchaResponse'),
    initialValues: {
      referredby: '',
    },
  };
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'signup', validate })(Register));
