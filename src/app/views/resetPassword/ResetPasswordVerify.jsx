import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import {
  Button,
  Grid,
} from '@mui/material';
import * as actions from '../../actions/resetPassword';
// import history from '../../history';

class ResetPasswordVerify extends Component {
  constructor(props) {
    super(props);

    this.state = { resend: false };
  }

  componentWillMount() {
    const parsed = qs.parse(this.props.location.search);
    this.email = parsed.email;

    if (!this.props.resetPasswordProgress || !this.email) {
      // history.push('/signup');
    }
  }

  resendEmail(props) {
    this.setState({ resend: true });
    this.props.resetPassword(props);
  }

  render() {
    return (
      <div className="form-container index600 shadow-w signinContainer content">
        <h2 className="textCenter">Reset Password</h2>
        <h3 className="textCenter">
          We've just emailed you password reset instructions at
        </h3>
        <h3 className="textCenter">
          <u>{ this.email && this.email }</u>
        </h3>
        {
          !this.state.resend
            ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={this.resendEmail.bind(this, { email: this.email })}
              >
                Resend instructions
              </Button>
            )
            : (
              <p className="resended textCenter">
                Reset password instructions has been resent
              </p>
            )
        }
        {
          this.props.errorMessage && this.props.errorMessage.resetPassword
            && <div className="error-container">{ this.props.errorMessage.resetPassword }</div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    resetPasswordProgress: state.resetPass.resetPassword,
    errorMessage: state.resetPass.error,
  };
}

export default connect(mapStateToProps, actions)(ResetPasswordVerify);
