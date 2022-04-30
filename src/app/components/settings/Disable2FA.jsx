import React, {
  useState,
  useEffect,
} from 'react';
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  reduxForm,
  Field,
  formValueSelector,
  reset,
} from 'redux-form';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
// import CloseIcon from '@mui/icons-material/Close';

import {
  disabletfa,
  idleDisabletfa,
} from '../../actions/tfa';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'fixed !important',
    height: 'calc(100vh - 80px) !important',
    top: '60px !important',
    bottom: '30px !important',
    overflowY: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const renderNumberField = (
  {
    input,
    label,
    meta: { touched, error },
    ...custom
  },
) => (
  <FormControl variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-tfa">{label}</InputLabel>
    <OutlinedInput
      label={label}
      fullWidth
      id="outlined-adornment-tfa"
      inputProps={{ className: 'outlined-adornment-tfa' }}
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

function DisableTfa(props) {
  const {
    errorMessage,
    disabletfa,
    handleSubmit,
    pristine,
    submitting,
    tfa,
    idleDisabletfa,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (tfa.phase === 1) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
    if (tfa.phase === 2) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [tfa.phase]);

  const handleOpen = () => {
    setOpen(true);
    idleDisabletfa();
  };

  const myHandleSubmit = (e) => {
    disabletfa(e);
  }

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
    >
      <Grid
        item
        xs={12}
      >
        <h2
          className="text-center"
        >
          Disable 2FA
        </h2>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
      >
        <form
          style={{ width: '100%' }}
          onSubmit={handleSubmit(myHandleSubmit)}
        >
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
              <Field name="tfa" component={renderNumberField} label="2FA" />
            </Box>
            <Box
              component={Grid}
              p={1}
              item
            >
              { errorMessage && errorMessage.tfa
                    && (
                      <div className="error-container signin-error">
                        Oops!
                        { errorMessage.tfa }
                      </div>
                    )}

              {tfa.isFetching
                ? <CircularProgress disableShrink />
                : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={pristine || submitting}
                    type="submit"
                  >
                    Disable
                  </Button>
                )}
            </Box>
          </Box>
        </form>

      </Grid>
    </Grid>
  );
}

const onSubmitSuccess = (result, dispatch) => {
  dispatch(reset('order'));
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.tfa) {
    errors.tfa = 'Please enter 2fa code'
  }
  // console.log(errors);
  return errors;
}

const selector = formValueSelector('enable2fa');

const mapStateToProps = (state) => {
  console.log('Set2FA mapStateToProps');
  console.log(state);
  // console.log(state.createOrder);
  return {
    tfa: state.tfa,
    errorMessage: state.auth.error,
  }
}
const mapDispatchToProps = {
  disabletfa, // will be wrapped into a dispatch call
  idleDisabletfa, // will be wrapped into a dispatch call
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'enable2fa', validate, onSubmitSuccess })(DisableTfa));
