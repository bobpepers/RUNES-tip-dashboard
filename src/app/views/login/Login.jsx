import React, { useState } from 'react';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
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
import Captcha from '../../components/Captcha';
import * as actions from '../../actions/auth';

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
        // className="outlined-email-field"
        label="E-mail"
        type={type}
        variant="outlined"
        inputProps={{ className: 'outlined-email-field' }}
        {...input}
      />
      {touched && error && <div className="form-error">{error}</div>}
    </FormControl>
  </div>
);

const renderPasswordField = (
  {
    input,
    type,
    placeholder,
    meta: {
      touched,
      error,
    },
    handleClickShowPassword,
    mvalues,
    handleChange,
    handleMouseDownPassword,
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
        // id="outlined-adornment-password"
        inputProps={{ className: 'outlined-adornment-password' }}
        type={mvalues.showPassword ? 'text' : 'password'}
        value={mvalues.password}
        onChange={handleChange('password')}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {mvalues.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )}
        // labelWidth={70}
        {...input}
      />
    </FormControl>
    {touched && error && <div className="form-error">{error}</div>}
  </div>

);

function Signin(props) {
  const {
    handleSubmit,
    signinUser,
  } = props;
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (props) => {
    await signinUser(props);
  }

  return (
    <div
      className="form-container index600 signinContainer content"
    >
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
          <h2 className="text-center">Sign in</h2>
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
                item
                component={Grid}
                p={1}
              >
                <Field
                  name="email"
                  component={renderField}
                  type="text"
                  placeholder="Email"
                />
              </Box>
              <Box
                item
                component={Grid}
                p={1}
              >
                <Field
                  name="password"
                  handleClickShowPassword={handleClickShowPassword}
                  mvalues={values}
                  handleChange={handleChange}
                  handleMouseDownPassword={handleMouseDownPassword}
                  component={renderPasswordField}
                  type="password"
                  placeholder="Password"
                />
              </Box>
              <Box
                item
                component={Grid}
                p={1}
              >
                <div className="password-forgot">
                  <Link className="shadow-w" to="/reset-password">I forgot my password</Link>
                </div>
                {props.errorMessage && props.errorMessage.signin && (
                  <div className="error-container signin-error">
                    {props.errorMessage.signin}
                  </div>
                )}
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Field component={Captcha} change={change} name="captchaResponse" />
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Button variant="contained" color="primary" type="submit" className="btn" fullWidth size="large">
                  Sign in
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Email is required'
  }

  if (!formProps.password) {
    errors.password = 'Password is required'
  }

  if (!formProps.captchaResponse) {
    errors.captchaResponse = 'Please validate the captcha.';
  }

  return errors;
}
const selector = formValueSelector('signin');
const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  recaptchaValue: selector(state, 'captchaResponse'),
})

export default connect(mapStateToProps, actions)(reduxForm({ form: 'signin', validate })(Signin));
