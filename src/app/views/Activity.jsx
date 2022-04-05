import React, {
  useEffect,
  useState,
} from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  Grid,
  FormControl,
  CircularProgress,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { io } from 'socket.io-client';
import {
  fetchActivityAction,
} from '../actions/activity';
import ActivityContainer from '../containers/Activity';
import { withRouter } from '../hooks/withRouter';

import {
  INSERT_ACTIVITY,
} from '../actions/types/index';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ActivityView = function (props) {
  const {
    auth,
    activity,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [id, setId] = useState('');
  const [spender, setSpender] = useState('');
  const [earner, setEarner] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');

  // useEffect(() => {
  //  if (auth.authenticated) {
  //    dispatch(fetchActivityAction(id, spender, earner, type, amount));
  //  }
  // }, []);

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchActivityAction(
        id,
        spender,
        earner,
        type,
        amount,
      ));
    }
  }, [
    auth,
    id,
    spender,
    earner,
    type,
    amount,
  ]);

  useEffect(() => {
    const socket = io(window.myConfig.wsEndPoint, {
      path: '/socket.io',
    });

    socket.on('updateActivity', (data) => {
      console.log('updateActivity');
      console.log(data);
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
    });
    return () => socket.disconnect();
  }, []);

  const handleChangeId = (event) => {
    console.log(event);
    setId(event.target.value);
  };

  const handleChangeSpender = (event) => {
    setSpender(event.target.value);
  };

  const handleChangeEarner = (event) => {
    setEarner(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    console.log(activity);
  }, [activity]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Activity</h3>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="id"
                value={id}
                label="id"
                variant="filled"
                onChange={handleChangeId}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="spender"
                value={spender}
                label="spender"
                variant="filled"
                onChange={handleChangeSpender}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="earner"
                value={earner}
                label="earner"
                variant="filled"
                onChange={handleChangeEarner}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="type"
                value={type}
                label="type"
                variant="filled"
                onChange={handleChangeType}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="amount"
                value={amount}
                label="amount"
                variant="filled"
                onChange={handleChangeAmount}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {
            activity && activity.isFetching
              ? (<CircularProgress />)
              : (
                <ActivityContainer
                  activity={activity
                    && activity.data
                    ? activity.data
                    : []}
                />
              )
          }

        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  activity: state.activity,
})

export default withRouter(connect(mapStateToProps, null)(ActivityView));
