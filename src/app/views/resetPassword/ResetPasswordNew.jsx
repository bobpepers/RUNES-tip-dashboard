import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import {
  Button,
  Grid,
  FormControl,
  TextField,
} from '@mui/material';
import * as actions from '../../actions/resetPassword';

const renderField = ({
  input, type, placeholder, meta: { touched, error },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField id="outlined-username-field" label={placeholder} type={type} variant="outlined" {...input} />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

class ResetPasswordNew extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    const parsed = qs.parse(this.props.location.search);
    const { email } = parsed;
    const { token } = parsed;

    this.props.verifyResetPassword({ email, token });
  }

  handleFormSubmit(props) {
    const parsed = qs.parse(this.props.location.search);
    props.email = parsed.email;
    props.token = parsed.token;

    this.props.resetPasswordNew(props);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="form-container index600 shadow-w signinContainer content">
        <h2 className="textCenter">New Password</h2>
        {
          /* Landing error message */
          this.props.errorMessage && this.props.errorMessage.verifyResetPassword
            ? (
              <div className="content">
                <h3>{ this.props.errorMessage.verifyResetPassword.message }</h3>
                {
                  this.props.errorMessage.verifyResetPassword.resend
                  && <Link className="resend" to="/reset-password">Reset Password Again</Link>
                }
              </div>
            )
            : (
              <Grid container alignItems="center" justify="center">
                <Grid item xs={4}>
                  <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Grid container direction="column" spacing={3}>
                      <Grid item>
                        <Field name="newpassword" component={renderField} type="password" placeholder="New password" />
                      </Grid>
                      <Grid item>
                        <Field name="renewpassword" component={renderField} type="password" placeholder="Repeat New password" />
                        {
                          this.props.errorMessage
                          && this.props.errorMessage.verifyResetPassword
                            && (
                              <div className="error-container">
                                { this.props.errorMessage.verifyResetPassword.message }
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
  return { errorMessage: state.resetPass.error };
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'resetnewpassword', validate })(ResetPasswordNew));
