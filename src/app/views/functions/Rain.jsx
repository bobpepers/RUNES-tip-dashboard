import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Typography,
  Button,
} from '@mui/material';
import UsersTable from '../../components/UsersTable';
import WithdrawalsTable from '../../components/WithdrawalsTable';

import { withRouter } from '../../hooks/withRouter';
import {
  fetchRainAction,
} from '../../actions/rain';
import {
  acceptWithdrawalAction,
  declineWithdrawalAction,
} from '../../actions/withdrawals';
import {
  banUserAction,
} from '../../actions/users';

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

const RainView = function (props) {
  const {
    auth,
    rain,
  } = props;
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rainId } = useParams();

  useEffect(() => {
    if (
      auth.authenticated
      && rainId
    ) {
      dispatch(fetchRainAction(rainId));
    }
  }, [
    auth,
    rainId,
  ]);

  useEffect(() => { }, [
    rain,
  ]);

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Rain Id:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.id
              && rain.data.id
            }
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            username
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.user
              && rain.data.user.username
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            firstname
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.user
              && rain.data.user.firstname
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            lastname
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.user
              && rain.data.user.lastname
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            userId
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.user
              && rain.data.user.user_id
            }
          </Typography>
        </Grid>

      </Grid>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Amount
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.amount / 1e8
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            feeAmount
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.feeAmount / 1e8
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            userCount
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              rain
              && rain.data
              && rain.data.userCount
            }
          </Typography>
        </Grid>

      </Grid>
      <Grid
        container
        justifyContent="center"
        className="zindexOne text-center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="zindexOne"
          justifyContent="center"
        >
          <h2>Group and/or Channel</h2>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="zindexOne"
          justifyContent="center"
        >
          <p>Group</p>
          <p>
            {rain.data && rain.data.group && rain.data.group.groupName}
            {' '}
            (
            {rain.data && rain.data.group && rain.data.group.groupId}
            )
          </p>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="zindexOne"
          justifyContent="center"
        >
          <p>Channel</p>
          <p>
            {rain.data && rain.data.channel && rain.data.channel.channelId}
            {' '}
            (
            {rain.data && rain.data.channel ? rain.data.channel.channelId : 'n/a'}
            )
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="zindexOne"
          justifyContent="center"
        >
          <h2 className="text-center">Users Received</h2>
        </Grid>
      </Grid>
      {
        rain
        && rain.data
        && rain.data.raintips
        && rain.data.raintips.map((row, index) => {
          console.log(row);
          return (
            <Grid
              container
              justifyContent="center"
              className="zindexOne text-center"
            >
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className="zindexOne"
                justifyContent="center"
              >
                <p>id</p>
                <p>{row.id}</p>
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className="zindexOne"
                justifyContent="center"
              >
                <p>user</p>
                <p>
                  {row.user && row.user.username}
                  {' '}
                  (
                  {row.user && row.user.user_id}
                  )
                </p>
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className="zindexOne"
                justifyContent="center"
              >
                <p>amount</p>
                <p>
                  {row.amount / 1e8}
                </p>
              </Grid>
            </Grid>
          )
        })
      }

    </div>
  );
}

RainView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  rain: state.rain,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(RainView)));
