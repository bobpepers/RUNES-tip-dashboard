import React from 'react';
import {
  reduxForm,
  Field,
  formValueSelector,
} from 'redux-form';
import { connect } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Button,
  Grid,
} from '@mui/material';
import * as actions from '../../actions/tfa';

const renderNumberField = (
  {
    input, label, meta: { touched, error }, ...custom
  },
) => (
  <FormControl variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-tfa">{label}</InputLabel>
    <OutlinedInput
      inputProps={{ className: 'outlined-adornment-tfa' }}
      label={label}
      fullWidth
      // id="outlined-adornment-tfa"
      type="number"
      labelWidth={70}
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </FormControl>
);

const LoginTFA = (props) => {
  const {
    errorMessage,
    createOrder,
    handleSubmit,
    pristine,
    submitting,
    createOrderPost,
    unlocktfa,
    idleOrder,
  } = props;

  const myHandleSubmit = (e) => {
    unlocktfa(e);
  }

  return (
    <div className="form-container index600 shadow-w signinContainer content minHeight300">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        item
        xs={12}
        className="height100"
        style={{ position: 'absolute' }}
      >
        <Grid
          container
          item
          xs={12}
          sm={10}
          md={6}
          lg={4}
          xl={4}
          className="borderAddress"
          style={{ display: 'table' }}
        >
          <form onSubmit={handleSubmit(myHandleSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2 className="text-center">Enter 2FA Code</h2>
              </Grid>
              <Grid item xs={12}>
                <Field name="tfa" component={renderNumberField} label="2FA Code" />
              </Grid>
              <Grid item xs={12}>
                { errorMessage && errorMessage.tfa
              && (
              <div className="error-container signin-error">
                Oops!
                { errorMessage.tfa }
              </div>
              ) }
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={pristine || submitting}
                  type="submit"
                >
                  Sign in
                </Button>
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

const onSubmitSuccess = (result, dispatch) => {
  console.log('success');
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.tfa) {
    errors.tfa = '2FA Code is required'
  }

  return errors;
}
const selector = formValueSelector('tfalogin');
const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps, actions)(reduxForm({ form: 'tfalogin', validate, onSubmitSuccess })(LoginTFA));
