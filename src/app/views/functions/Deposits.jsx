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
import { withRouter } from '../../hooks/withRouter';

import {
  fetchDepositsAction,
} from '../../actions/deposits';
import DepositsTable from '../../components/DepositsTable';

const headCells = [
  {
    id: 'dbId', numeric: false, disablePadding: true, label: 'id',
  },
  {
    id: 'userId', numeric: true, disablePadding: false, label: 'userId',
  },
  {
    id: 'username', numeric: true, disablePadding: false, label: 'username',
  },
  {
    id: 'from', numeric: true, disablePadding: false, label: 'from',
  },
  {
    id: 'txId', numeric: true, disablePadding: false, label: 'tx id',
  },
  {
    id: 'amount', numeric: true, disablePadding: false, label: 'amount',
  },
  {
    id: 'confirmations', numeric: true, disablePadding: false, label: 'confirmations',
  },
  {
    id: 'phase', numeric: true, disablePadding: false, label: 'phase',
  },

];

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

const DepositsView = function (props) {
  const {
    auth,
    deposits,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [id, setId] = useState('');
  const [txId, setTxId] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [from, setFrom] = useState('');

  // useEffect(() => dispatch(fetchDepositsAction(
  //  id,
  //  txId,
  //  userId,
  //  username,
  //  from,
  // )), [dispatch]);

  useEffect(() => dispatch(fetchDepositsAction(
    id,
    txId,
    userId,
    username,
    from,
  )), [
    id,
    txId,
    userId,
    username,
    from,
    auth,
  ]);

  const handleChangeId = (event) => {
    console.log(event);
    setId(event.target.value);
  };

  const handleChangeTxId = (event) => {
    setTxId(event.target.value);
  };

  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };

  useEffect(() => {
    console.log(deposits);
  }, [deposits]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Deposits</h3>
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
                name="txId"
                value={username}
                label="tx id"
                variant="filled"
                onChange={handleChangeTxId}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="userId"
                value={userId}
                label="user id"
                variant="filled"
                onChange={handleChangeUserId}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="username"
                value={username}
                label="username"
                variant="filled"
                onChange={handleChangeUsername}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="from"
                value={from}
                label="from"
                variant="filled"
                onChange={handleChangeFrom}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {
            deposits
              && deposits.isFetching
              ? (<CircularProgress />)
              : (
                <DepositsTable
                  defaultPageSize={25}
                  headCells={headCells || []}
                  deposits={deposits
                    && deposits.data
                    ? deposits.data
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
  deposits: state.deposits,
})

export default withRouter(connect(mapStateToProps, null)(DepositsView));
