import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchSoakAction,
} from '../../actions/soak';

const SoakView = function (props) {
  const {
    auth,
    soak,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { soakId } = useParams();

  useEffect(() => {
    if (
      auth.authenticated
      && soakId
    ) {
      dispatch(fetchSoakAction(soakId));
    }
  }, [
    auth,
    soakId,
  ]);

  useEffect(() => { }, [
    soak,
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
            Soak Id:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              soak
              && soak.data
              && soak.data.id
              && soak.data.id
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
              soak
              && soak.data
              && soak.data.user
              && soak.data.user.username
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
              soak
              && soak.data
              && soak.data.user
              && soak.data.user.firstname
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
              soak
              && soak.data
              && soak.data.user
              && soak.data.user.lastname
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
              soak
              && soak.data
              && soak.data.user
              && soak.data.user.user_id
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
              soak
              && soak.data
              && soak.data.amount / 1e8
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
              soak
              && soak.data
              && soak.data.feeAmount / 1e8
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
              soak
              && soak.data
              && soak.data.userCount
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
            {soak.data && soak.data.group && soak.data.group.groupName}
            {' '}
            (
            {soak.data && soak.data.group && soak.data.group.groupId}
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
            {soak.data && soak.data.channel && soak.data.channel.channelId}
            {' '}
            (
            {soak.data && soak.data.channel ? soak.data.channel.channelId : 'n/a'}
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
        soak
        && soak.data
        && soak.data.soaktips
        && soak.data.soaktips.map((row, index) => (
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
              <Button
                onClick={() => navigate(`/user/${row.user && row.user.id}`)}
              >
                {row.user && row.user.username}
                {row.user && !row.user.username && row.user.firstname && `${row.user.firstname} `}
                {row.user && !row.user.username && row.user.lastname && row.user.lastname}
                {' '}
                (
                {row.user && row.user.user_id}
                )
              </Button>
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
        ))
      }

    </div>
  );
}

SoakView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  soak: state.soak,
})

export default withRouter(connect(mapStateToProps, null)(SoakView));
