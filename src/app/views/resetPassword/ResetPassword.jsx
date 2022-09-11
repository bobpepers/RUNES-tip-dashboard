import React from 'react';
import {
  Form,
  Field,
} from 'react-final-form';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Button,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../actions/resetPassword';
import Captcha from '../../components/Captcha';
import TextField from '../../components/form/TextField';

function ResetPassword(props) {
  const {
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Form
            onSubmit={async (values) => {
              await dispatch(resetPassword(values, navigate));
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required'
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
                <Grid container direction="column" spacing={3}>
                  <Grid item>
                    <div className="input-group">
                      <Field
                        name="email"
                        type="email"
                        placeholder="type your email"
                        component={TextField}
                        label="E-mail"
                      />
                    </div>
                  </Grid>
                  <Grid item>
                    <Field
                      component={Captcha}
                      change={form.change}
                      name="captchaResponse"
                      submitting={submitting}
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
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      disabled={pristine || submitting}
                    >
                      Submit
                    </Button>
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

const mapStateToProps = (state) => ({
  errorMessage: state.resetPass.error,
})

export default connect(mapStateToProps, null)(ResetPassword);
