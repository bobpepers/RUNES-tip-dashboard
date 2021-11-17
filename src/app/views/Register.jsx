import React, { useState, useEffect } from 'react';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import { Link } from 'react-router-dom';
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
import { makeStyles } from '@mui/styles';

import * as actions from '../actions/auth';
import Captcha from '../components/Captcha';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    overflow: 'hidden',
    height: '100%',
    maxHeight: 500,
    display: 'block',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  content: {
    padding: 12,
    overflow: 'scroll',
    height: '100%',
    maxHeight: 500,
  },
}));

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
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

const Checkbox = ({ input, meta: { touched, error } }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ border: touched && error ? '1px solid red' : 'none' }}>
      <input type="checkbox" {...input} />
      <label>
        I agree to
        {' '}
        <a href="/terms" target="_blank">
          Terms and conditions
        </a>
      </label>
    </div>
  )
}

const Signup = (props) => {
  const {
    handleSubmit,
    signupUser,
    location: {
      search,
    },
    initialize,
  } = props;

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
      { touched && error && <div className="form-error">{error}</div> }
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
      { touched && error && <div className="form-error">{error}</div> }
    </div>
  );

  const handleFormSubmit = async (formProps) => {
    await signupUser(formProps);
  }

  return (
    <div className="form-container index600 shadow-w signinContainer content">
      <Grid container alignItems="center" justify="center">
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={4}
          xl={4}
        >
          <h2 className="textCenter">Sign up</h2>
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
                  name="firstname"
                  component={renderField}
                  type="text"
                  placeholder="First name"
                />
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Field
                  name="lastname"
                  component={renderField}
                  type="text"
                  placeholder="Last name"
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
                  name="referredby"
                  component={renderField}
                  type="text"
                  placeholder="Referred By"
                  disabled
                  InputProps={{
                    className: 'Mui-disabled',
                  }}
                />
              </Box>
              <Box
                component={Grid}
                p={1}
                item
              >
                <Field
                  name="termsAndConditions"
                  component={Checkbox}
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
                  { props.errorMessage && props.errorMessage.signup
                && (
                <div className="error-container">
                  { props.errorMessage.signup }
                </div>
                ) }
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
              <Box
                component={Grid}
                p={1}
                item
              >
                <div className="form-bottom">
                  <p>Already signed up?</p>
                  <Link className="shadow-w" to="/signin">Click here to sign in</Link>
                </div>
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
  const fields = ['firstname', 'lastname', 'email', 'password', 'repassword', 'username'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.username && props.username.length < 3) {
    errors.username = 'minimum of 4 characters';
  }

  if (props.firstname && props.firstname.length < 2) {
    errors.firstname = 'minimum of 3 characters';
  }

  if (props.firstname && props.firstname.length > 20) {
    errors.firstname = 'maximum of 20 characters';
  }

  if (props.lastname && props.lastname.length < 2) {
    errors.lastname = 'minimum of 3 characters';
  }

  if (props.lastname && props.lastname.length > 20) {
    errors.lastname = 'maximum of 20 characters';
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

  if (!props.termsAndConditions) {
    errors.termsAndConditions = 'You must agree to Terms and conditions';
  }

  return errors;
};
const selector = formValueSelector('signin');

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    recaptchaValue: selector(state, 'captchaResponse'),
    initialValues: {
      referredby: '',
    },
  };
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'signup', validate })(Signup));