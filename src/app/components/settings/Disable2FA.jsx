import React, {
  useState,
  useEffect,
} from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  Form,
  Field,
} from 'react-final-form';
import {
  connect,
  useDispatch,
} from 'react-redux';
import NumberField from '../form/NumberField';

import {
  disabletfa,
  idleDisabletfa,
} from '../../actions/tfa';

const PREFIX = 'Disable2FA';

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

function DisableTfa(props) {
  const {
    errorMessage,
    tfa,
  } = props;
  const dispatch = useDispatch();

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
    dispatch(idleDisabletfa());
  };

  return (
    <StyledGrid
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
        <Form
          onSubmit={async (values, form) => {
            await dispatch(disabletfa(values));
            form.reset();
          }}
          validate={(values) => {
            const errors = {};
            if (!values.tfa) {
              errors.tfa = 'Please enter 2fa code'
            }
            // console.log(errors);
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
                  <Field
                    name="tfa"
                    component={NumberField}
                    label="2FA"
                  />
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

                  {tfa.isLoading
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
          )}
        </Form>
      </Grid>
    </StyledGrid>
  );
}

const mapStateToProps = (state) => ({
  tfa: state.tfa,
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps, null)(DisableTfa);
