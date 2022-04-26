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
  fetchWithdrawalsAction,
  acceptWithdrawalAction,
  declineWithdrawalAction,
} from '../../actions/withdrawals';
import WithdrawalsTable from '../../components/WithdrawalsTable';

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

const RainsView = function (props) {
  const {
    withdrawals,
    acceptWithdrawal,
    declineWithdrawal,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [id, setId] = useState('');
  const [txId, setTxId] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [to, setTo] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => dispatch(fetchWithdrawalsAction(
    id,
    txId,
    userId,
    username,
    to,
    page * rowsPerPage,
    rowsPerPage,
  )), [
    id,
    txId,
    userId,
    username,
    to,
    page,
    rowsPerPage,
  ]);

  const handleChangeId = (event) => {
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
  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };

  const acceptWithdrawalFunction = (idWithdrawal) => {
    console.log('acceptWithdrawal');
    dispatch(acceptWithdrawalAction(idWithdrawal))
  };
  const declineWithdrawalFunction = (idWithdrawal) => {
    dispatch(declineWithdrawalAction(idWithdrawal))
  };

  useEffect(() => {
    console.log(withdrawals);
  }, [
    withdrawals,
    acceptWithdrawal,
    declineWithdrawal,
    page,
    rowsPerPage,
  ]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Rains</h3>
        </Grid>
        <Grid item xs={12}>
          {
            withdrawals
            && withdrawals.isFetching
              ? (<CircularProgress />)
              : (
                <WithdrawalsTable
                  defaultPageSize={50}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={withdrawals && withdrawals.count && withdrawals.count}
                  acceptWithdrawalFunction={acceptWithdrawalFunction}
                  declineWithdrawalFunction={declineWithdrawalFunction}
                  acceptWithdrawal={acceptWithdrawal}
                  declineWithdrawal={declineWithdrawal}
                  withdrawals={withdrawals
                    && withdrawals.data
                    ? withdrawals.data
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
  withdrawals: state.withdrawals,
  acceptWithdrawal: state.acceptWithdrawal,
  declineWithdrawal: state.declineWithdrawal,
})

export default withRouter(connect(mapStateToProps, null)(RainsView));
