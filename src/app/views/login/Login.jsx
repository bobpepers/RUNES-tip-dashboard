import React, {
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
import {
  Button,
  Grid,
  Box,
} from '@mui/material';
import Captcha from '../../components/Captcha';
import { signinUser } from '../../actions/auth';
import PasswordField from '../../components/form/PasswordField';
import TextField from '../../components/form/TextField';

function Signin(props) {
  const {
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stateValues, setStateValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setStateValues({ ...stateValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setStateValues({ ...stateValues, showPassword: !stateValues.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          <Form
            onSubmit={async (values) => {
              await dispatch(signinUser(values, navigate));
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required'
              }

              if (!values.password) {
                errors.password = 'Password is required'
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
                    item
                    component={Grid}
                    p={1}
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
                    item
                    component={Grid}
                    p={1}
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
                    item
                    component={Grid}
                    p={1}
                  >
                    <div className="password-forgot">
                      <Link className="shadow-w" to="/reset-password">I forgot my password</Link>
                    </div>
                    {errorMessage && errorMessage.signin && (
                      <div className="error-container signin-error">
                        {errorMessage.signin}
                      </div>
                    )}
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
                      Sign in
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

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
});

export default connect(mapStateToProps, null)(Signin);
