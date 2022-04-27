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
import UsersTable from '../../components/management/UsersTable';
import WithdrawalsTable from '../../components/functions/WithdrawalsTable';

import { withRouter } from '../../hooks/withRouter';
import {
  fetchWithdrawalAddressAction,
} from '../../actions/withdrawalAddresses';
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

const WithdrawalAddressView = function (props) {
  const {
    auth,
    withdrawalAddress,
    acceptWithdrawal,
    declineWithdrawal,
  } = props;
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addressId } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [withdrawalPage, setWithdrawalPage] = useState(0);
  const [rowsPerWithdrawalPage, setRowsPerWithdrawalPage] = useState(10);

  useEffect(() => {
    if (
      auth.authenticated
      && addressId
    ) {
      dispatch(fetchWithdrawalAddressAction(addressId));
    }
  }, [
    auth,
    addressId,
  ]);

  useEffect(() => { }, [
    withdrawalAddress,
  ]);

  const banUser = (
    banId,
    banMessage,
  ) => {
    dispatch(banUserAction(banId, banMessage))
  };

  const acceptWithdrawalFunction = (idWithdrawal) => {
    dispatch(acceptWithdrawalAction(idWithdrawal))
  };
  const declineWithdrawalFunction = (idWithdrawal) => {
    dispatch(declineWithdrawalAction(idWithdrawal))
  };

  useEffect(() => { }, [
    withdrawalAddress,
    acceptWithdrawal,
    declineWithdrawal,
    page,
    rowsPerPage,
    withdrawalPage,
    rowsPerWithdrawalPage,
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
            id:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              withdrawalAddress
              && withdrawalAddress.data
              && withdrawalAddress.data.id
              && withdrawalAddress.data.id
            }
          </Typography>
        </Grid>
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
            address:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              withdrawalAddress
              && withdrawalAddress.data
              && withdrawalAddress.data.address
              && withdrawalAddress.data.address
            }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <h2>Associated Users</h2>
        </Grid>
        <Grid item xs={12}>
          {
            withdrawalAddress && withdrawalAddress.isFetching
              ? (<CircularProgress />)
              : (
                <UsersTable
                  sliced
                  defaultPageSize={page}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={withdrawalAddress && withdrawalAddress.data && withdrawalAddress.data.users && withdrawalAddress.data.users.length}
                  banUser={banUser}
                  users={withdrawalAddress
                    && withdrawalAddress.data
                    && withdrawalAddress.data.users
                    ? withdrawalAddress.data.users
                    : []}
                />
              )
          }

        </Grid>
        <Grid item xs={12}>
          <h2>Associated Withdrawals</h2>
        </Grid>
        <Grid item xs={12}>
          {
            withdrawalAddress
            && withdrawalAddress.isFetching
              ? (<CircularProgress />)
              : (
                <WithdrawalsTable
                  sliced
                  defaultPageSize={10}
                  page={withdrawalPage}
                  setPage={setWithdrawalPage}
                  rowsPerPage={rowsPerWithdrawalPage}
                  setRowsPerPage={setRowsPerWithdrawalPage}
                  totalCount={withdrawalAddress && withdrawalAddress.data && withdrawalAddress.data.transactions && withdrawalAddress.data.transactions.length}
                  acceptWithdrawalFunction={acceptWithdrawalFunction}
                  declineWithdrawalFunction={declineWithdrawalFunction}
                  acceptWithdrawal={acceptWithdrawal}
                  declineWithdrawal={declineWithdrawal}
                  withdrawals={withdrawalAddress
                    && withdrawalAddress.data
                    && withdrawalAddress.data.transactions
                    ? withdrawalAddress.data.transactions
                    : []}
                />
              )
          }
        </Grid>
      </Grid>
    </div>
  );
}

WithdrawalAddressView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  withdrawalAddress: state.withdrawalAddress,
  acceptWithdrawal: state.acceptWithdrawal,
  declineWithdrawal: state.declineWithdrawal,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(WithdrawalAddressView)));
