import React, {
  useEffect,
  // useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  // Button,
  Divider,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import ActivityView from './Activity';
import { withRouter } from '../hooks/withRouter';
import {
  fetchNodeStatusAction,
} from '../actions/nodeStatus';

import {
  fetchLiabilityAction,
} from '../actions/liability';
import {
  patchDepositsAction,
} from '../actions/patchDeposits';

import {
  fetchBalanceAction,
} from '../actions/balance';
// import Logo from '../assets/images/logo.svg';

const styles = {
  card: {
    minWidth: 275,
    margin: '50px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const Home = function (props) {
  const {
    nodeStatus,
    liability,
    balance,
    patchDeposits,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNodeStatusAction());
    dispatch(fetchLiabilityAction());
    dispatch(fetchBalanceAction());
  }, []);

  useEffect(
    () => { },
    [
      nodeStatus,
      liability,
      balance,
    ],
  );

  const patchDepositsFunction = () => {
    dispatch(patchDepositsAction())
  }

  const routeChangeExample = () => {
    const path = 'bridge';
    navigate(path);
  }

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Status
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {nodeStatus.data
              && nodeStatus.data.peers
              ? `${nodeStatus.data.peers.length} peers`
              : 'offline'}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Liability
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {liability.data
              && liability.data
              ? `${liability.data / 1e8} RUNES`
              : '0 RUNES'}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Balance
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {balance.data
              && balance.data
              ? `${balance.data} RUNES`
              : '0 RUNES'}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Difference
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {balance.data
              && liability.data
              ? `${((balance.data - liability.data) / 1e8)} RUNES`
              : '0 RUNES'}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
      >
        <Divider variant="middle" />

        <Grid
          align="center"
          justifyContent="center"
          item
          xs={12}
        >
          {
            patchDeposits.isFetching ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={() => patchDepositsFunction()}
              >
                Patch Deposits
              </Button>
            )
          }

        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
      >
        <Divider variant="middle" />

        <Grid item xs={12}>
          <ActivityView />
        </Grid>
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  nodeStatus: state.nodeStatus,
  liability: state.liability,
  balance: state.balance,
  patchDeposits: state.patchDeposits,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Home)));
