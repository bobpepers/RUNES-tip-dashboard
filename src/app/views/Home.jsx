import React, {
  useEffect,
  //useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  //Button,
  Divider,
} from '@mui/material';
import { withRouter } from '../hooks/withRouter';
import {
  fetchNodeStatusAction,
} from '../actions/nodeStatus';

import {
  fetchLiabilityAction,
} from '../actions/liability';
//import Logo from '../assets/images/logo.svg';

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

const Home = (props) => {
  const {
    nodeStatus,
    liability,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNodeStatusAction());
    dispatch(fetchLiabilityAction());
  }, []);

  useEffect(() => { },
    [
      nodeStatus,
      liability,
    ]);

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
          <h3>Status</h3>
          <p>
            {nodeStatus.data
              && nodeStatus.data.status
              ? 'Online'
              : 'Offline'}
          </p>
          <p>
            {nodeStatus.data
              && nodeStatus.data.peers
              ? `${nodeStatus.data.peers.length} peers`
              : '0 peers'}
          </p>
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
          <h3>Liability</h3>
          <p>
            {liability.data
              && liability.data
              ? `${liability.data} RUNES`
              : '0 RUNES'}
          </p>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
      >
        <Divider variant="middle" />

        <Grid item xs={12}>

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
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Home)));
