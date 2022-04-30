import React from 'react';
import {
  reduxForm,
  formValueSelector,
  Field,
  change,
} from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  FormControl,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../actions/resetPassword';
import Captcha from '../../components/Captcha';

const renderField = ({
  input,
  type,
  placeholder,
  meta: {
    touched,
    error,
  },
}) => (
  <div
    className={`input-group ${touched && error ? 'has-error' : ''}`}
  >
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
      {
        touched
        && error
        && (
          <div className="form-error">
            {error}
          </div>
        )
      }
    </FormControl>
  </div>
);

function ResetPassword(props) {
  const {
    handleSubmit,
    pristine,
    submitting,
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (formProps) => {
    await dispatch(resetPassword(formProps, navigate));
  }

  return (
    <div className="form-container content">
      <h2 className="text-center">Reset Password</h2>
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
                <div className="input-group">
                  <Field
                    name="email"
                    type="email"
                    placeholder="type your email"
                    component={renderField}
                  />
                </div>
              </Grid>
              <Grid item>
                <Field
                  component={Captcha}
                  change={change}
                  name="captchaResponse"
                />
              </Grid>
              <Grid item>
                <div>
                  {
                    errorMessage
                    && errorMessage.resetPassword
                    && (
                      <div className="error-container">
                        {
                          errorMessage.resetPassword
                        }
                      </div>
                    )
                  }
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={pristine || submitting}
                  type="submit"
                  fullWidth
                  size="large"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
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

  if (!formProps.captchaResponse) {
    errors.captchaResponse = 'Please validate the captcha.';
  }

  return errors;
}

const selector = formValueSelector('resetpassword');

const mapStateToProps = (state) => ({
  errorMessage: state.resetPass.error,
  recaptchaValue: selector(state, 'captchaResponse'),
})

export default connect(mapStateToProps, null)(reduxForm({ form: 'resetpassword', validate })(ResetPassword));
