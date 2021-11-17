import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  Divider,
} from '@mui/material';
import { withRouter } from '../hooks/withRouter';

import Logo from '../assets/images/logo.svg';

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
  const { classes } = props;
  const navigate = useNavigate();
  console.log('RunesX Home View');
  const dispatch = useDispatch();

  const routeChangeSwap = () => {
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
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
        >
          <Logo />

        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
      >
        <Divider variant="middle" />

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => routeChangeSwap()}
          >
            Swap
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ })

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Home)));
