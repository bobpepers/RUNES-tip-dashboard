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
import DepositsTable from '../../components/functions/DepositsTable';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => dispatch(fetchDepositsAction(
    id,
    txId,
    userId,
    username,
    from,
    page * rowsPerPage,
    rowsPerPage,
  )), [
    id,
    txId,
    userId,
    username,
    from,
    auth,
    page,
    rowsPerPage,
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
  }, [
    deposits,
  ]);

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
                value={txId}
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
                  defaultPageSize={50}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={deposits && deposits.count && deposits.count}
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
