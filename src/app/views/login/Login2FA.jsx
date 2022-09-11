import React, {
  useEffect,
} from 'react';
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
import { unlocktfa } from '../../actions/tfa';
import NumberField from '../../components/form/NumberField';

function LoginTFA(props) {
  const {
    authenticated,
    errorMessage,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated.authenticated) {
      navigate('/')
    }
  }, [
    authenticated,
  ]);

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
          <Form
            onSubmit={async (values) => {
              await dispatch(unlocktfa(values, navigate));
            }}
            validate={(values) => {
              const errors = {};
              if (!values.tfa) {
                errors.tfa = '2FA Code is required'
              }

              return errors;
            }}
          >
            {({
              handleSubmit,
              submitting,
              pristine,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <h2 className="text-center">Enter 2FA Code</h2>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="tfa"
                      component={NumberField}
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
                      {errorMessage.tfa}
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
            )}
          </Form>
        </Grid>
      </Grid>
    </div>

  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  authenticated: state.auth,
})

export default connect(mapStateToProps)(LoginTFA);
