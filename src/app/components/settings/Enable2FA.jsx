import React, {
  useState,
  useEffect,
} from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  Form,
  Field,
} from 'react-final-form';
import {
  connect,
  useDispatch,
} from 'react-redux';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import {
  enabletfa,
  idleEnabletfa,
} from '../../actions/tfa';
import NumberField from '../form/NumberField';

const PREFIX = 'Enable2FA';

const classes = {
  modal: `${PREFIX}-modal`,
  paper: `${PREFIX}-paper`,
};

const StyledGrid = styled(Grid)((
  {
    theme,
  },
) => ({
  [`& .${classes.modal}`]: {
    position: 'fixed !important',
    height: 'calc(100vh - 80px) !important',
    top: '60px !important',
    bottom: '30px !important',
    overflowY: 'auto',
  },

  [`& .${classes.paper}`]: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const options = {
  issuer: window.myConfig.name,
  name: window.myConfig.wsEndPoint,
  length: 64,
}
const {
  base32,
  otpauth_url,
} = speakeasy.generateSecret(options);

let imagePath = '';

QRCode.toDataURL(otpauth_url, (err, imageUrl) => {
  if (err) {
    console.log('Could not generate QR code', err);
    return;
  }
  imagePath = imageUrl;
});

function Set2FA(props) {
  const {
    errorMessage,
    tfa,
    user,
  } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  console.log(imagePath);
  console.log(base32);
  console.log(otpauth_url);

  useEffect(() => {
    if (tfa.phase === 1) {
      setTimeout(() => { setOpen(false); }, 2000);
    }
    if (tfa.phase === 2) {
      setTimeout(() => { setOpen(false); }, 2000);
    }
  }, [tfa.phase]);

  // const handleOpen = () => {
  //   setOpen(true);
  //   idleEnabletfa();
  // };

  // const handleClose = () => {
  //   idleEnabletfa();
  //   setOpen(false);
  // };

  return (
    <StyledGrid container>
      <Grid container item xs={12}>
        <h2 className="text-center w-100">Enable 2FA</h2>
      </Grid>
      <Form
        initialValues={{
          secret: base32,
        }}
        onSubmit={async (values, form) => {
          await dispatch(enabletfa(values));
          form.reset();
        }}
        validate={(values) => {
          const errors = {};
          if (!values.tfa) {
            errors.tfa = 'Please enter 2fa code'
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
          <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3} className="signinContainer">
              <Grid
                container
                item
                justify="center"
                justifyContent="center"
              >
                <img src={imagePath} alt="2FA QR Code" />
              </Grid>
              <Grid item xs={12}>
                <p className="text-center">Secret:</p>
                <p className="wordbreak text-center">
                  {base32}
                </p>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="tfa"
                  component={NumberField}
                  label="2FA"
                />
              </Grid>
              <Grid item xs={12}>
                { errorMessage && errorMessage.tfa
                    && (
                      <div className="error-container signin-error">
                        Oops!
                        { errorMessage.tfa }
                      </div>
                    )}

                {tfa.isLoading
                  ? <CircularProgress disableShrink />
                  : (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={pristine || submitting}
                      type="submit"
                      fullWidth
                    >
                      Enable
                    </Button>
                  )}
              </Grid>
            </Grid>
          </form>
        )}
      </Form>

    </StyledGrid>
  );
}

function mapStateToProps(state) {
  return {
    tfa: state.tfa,
    errorMessage: state.auth.error,
    user: state.user.data,
  }
}

export default connect(mapStateToProps, null)(Set2FA);
