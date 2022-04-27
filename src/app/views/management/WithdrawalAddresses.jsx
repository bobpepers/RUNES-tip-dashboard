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
  fetchWithdrawalAddressesAction,
} from '../../actions/withdrawalAddresses';
import WithdrawalAddressesTable from '../../components/management/WithdrawalAddressesTable';

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

const WithdrawalAddressesView = function (props) {
  const {
    auth,
    withdrawalAddresses,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => dispatch(
    fetchWithdrawalAddressesAction(
      id,
      address,
      page * rowsPerPage,
      rowsPerPage,
    ),
  ), [
    id,
    address,
    auth,
    page,
    rowsPerPage,
  ]);

  const handleChangeId = (event) => {
    setId(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => { }, [withdrawalAddresses]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>withdrawalAddresses</h3>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12} md={6}>
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
          <Grid container item xs={12} md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="address"
                value={address}
                label="address"
                variant="filled"
                onChange={handleChangeAddress}
              />
            </FormControl>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          {
            withdrawalAddresses && withdrawalAddresses.isFetching
              ? (<CircularProgress />)
              : (
                <WithdrawalAddressesTable
                  defaultPageSize={page}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={withdrawalAddresses && withdrawalAddresses.count && withdrawalAddresses.count}
                  addresses={withdrawalAddresses
                    && withdrawalAddresses.data
                    ? withdrawalAddresses.data
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
  withdrawalAddresses: state.withdrawalAddresses,
})

export default withRouter(connect(mapStateToProps, null)(WithdrawalAddressesView));
