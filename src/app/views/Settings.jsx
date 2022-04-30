import React, {
  useEffect,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
} from '@mui/material';
import { fetchUserData } from '../actions/user'
import EnableTFA from '../components/settings/Enable2FA';
import DisableTFA from '../components/settings/Disable2FA';

function Settings(props) {
  const {
    user: {
      data,
    },
  } = props;
  document.title = 'RunesTip - Settings';
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchUserData()), []);
  useEffect(() => {
    console.log('props.user');
    console.log(props.user);
  }, [props.user]);

  useEffect(() => {
    document.title = 'RunesTip - Settings';
  }, []);

  return (
    <div className="form-container index600 signinContainer content">
      <Grid
        container
        alignItems="center"
        justify="center"
        justifyContent="center"
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={8}
          lg={4}
          xl={4}
        >
          <Grid item xs={12}>
            <h3 className="text-center">
              Two Factor Authentication
            </h3>
          </Grid>
          <Grid container justify="center">
            { data && data.tfa === false
              ? <EnableTFA />
              : <DisableTFA />}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
    errorMessage: state.auth.error,
  };
}
export default connect(mapStateToProps)(Settings);
