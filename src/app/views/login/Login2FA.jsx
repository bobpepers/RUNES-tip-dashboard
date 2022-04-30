import React from 'react';
import {
  reduxForm,
  Field,
  // formValueSelector,
} from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { unlocktfa } from '../../actions/tfa';

const renderNumberField = (
  {
    input,
    label,
    meta: {
      touched,
      error,
    },
    ...custom
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

function LoginTFA(props) {
  const {
    errorMessage,
    handleSubmit,
    pristine,
    submitting,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myHandleSubmit = (e) => {
    dispatch(unlocktfa(e, navigate));
  }

  return (
    <div className="form-container content">
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
          <form onSubmit={handleSubmit(myHandleSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2 className="text-center">Enter 2FA Code</h2>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="tfa"
                  component={renderNumberField}
                  label="2FA Code"
                />
              </Grid>
              <Grid item xs={12}>
                {
                  errorMessage
                  && errorMessage.tfa
                  && (
                    <div className="error-container signin-error">
                      Oops!
                      { errorMessage.tfa }
                    </div>
                  )
                }
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

  )
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

// const selector = formValueSelector('tfalogin');

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps, null)(reduxForm({ form: 'tfalogin', validate, onSubmitSuccess })(LoginTFA));
