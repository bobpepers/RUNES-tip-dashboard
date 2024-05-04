import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  CircularProgress,
} from '@mui/material';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import {
  fetchActivityAction,
} from '../actions/activity';
import ActivityComponent from '../components/Activity';
import { withRouter } from '../hooks/withRouter';
import {
  INSERT_ACTIVITY,
} from '../actions/types/index';

const ActivityContainer = function (props) {
  const {
    auth,
    activity,
    id,
    spender,
    earner,
    type,
    amount,
    rowsPerPage,
    currentProject,
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchActivityAction(
        id,
        spender,
        earner,
        type,
        amount,
        (page - 1) * rowsPerPage,
        rowsPerPage,
      ));
    }
  }, [
    auth,
    id,
    spender,
    earner,
    type,
    amount,
    page,
    rowsPerPage,
  ]);

  useEffect(() => {
    const socket = io(window.myConfig.wsEndPoint, {
      path: '/socket.io',
      query: {
        project: currentProject,
      },
    });

    socket.on('updateActivity', (data) => {
      if (page === 1) {
        if (
          id === ''
          && spender === ''
          && earner === ''
          && type === ''
          && amount === ''
        ) {
          dispatch({
            type: INSERT_ACTIVITY,
            payload: data.activity,
          });
        }
        if (id !== '') {
          if (data.activity.id.includes(id)) {
            dispatch({
              type: INSERT_ACTIVITY,
              payload: data.activity,
            });
          }
        }
        if (spender !== '') {
          if (data.activity.spender.username.includes(spender)) {
            dispatch({
              type: INSERT_ACTIVITY,
              payload: data.activity,
            });
          }
        }
        if (earner !== '') {
          if (data.activity.earner.username.includes(earner)) {
            dispatch({
              type: INSERT_ACTIVITY,
              payload: data.activity,
            });
          }
        }
        if (type !== '') {
          if (data.activity.type.includes(type)) {
            dispatch({
              type: INSERT_ACTIVITY,
              payload: data.activity,
            });
          }
        }
        if (amount !== '') {
          if (data.activity.amount.includes(amount)) {
            dispatch({
              type: INSERT_ACTIVITY,
              payload: data.activity,
            });
          }
        }
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => { }, [activity]);

  return (
    <Grid container>

      <Grid item xs={12}>
        {
          activity && activity.isFetching
            ? (<CircularProgress />)
            : (
              <ActivityComponent
                activity={
                  activity
                    && activity.data
                    ? activity.data
                    : []
                }
                totalCount={
                  activity
                    && activity.count
                    ? activity.count
                    : 0
                }
                activitiesPerPage={rowsPerPage}
                page={page}
                setPage={setPage}
              />
            )
        }

      </Grid>
    </Grid>
  )
}

ActivityContainer.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  spender: PropTypes.string.isRequired,
  earner: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
  activity: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    count: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
    })),
  }),
};

ActivityContainer.defaultProps = {
  activity: {
    count: undefined,
    data: undefined,
  },
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  activity: state.activity,
  currentProject: state.selectedProject.currentProject,
})

export default withRouter(connect(mapStateToProps, null)(ActivityContainer));
