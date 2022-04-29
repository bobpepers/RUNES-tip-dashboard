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
  Divider,
  Typography,
  Button,
} from '@mui/material';

import ActivityContainer from '../../containers/Activity';
import DepositsTable from '../../components/functions/DepositsTable';

import { withRouter } from '../../hooks/withRouter';
import {
  fetchUserInfoDataAction,
} from '../../actions/userInfo';
import {
  fetchWithdrawalsAction,
  acceptWithdrawalAction,
  declineWithdrawalAction,
} from '../../actions/withdrawals';
import {
  fetchDepositsAction,
} from '../../actions/deposits';
import WithdrawalsTable from '../../components/functions/WithdrawalsTable';

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

const UserView = function (props) {
  const {
    auth,
    userInfo,
    deposits,
    withdrawals,
    acceptWithdrawal,
    declineWithdrawal,
  } = props;
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [withdrawalPage, setWithdrawalPage] = useState(0);
  const [depositPage, setDepositPage] = useState(0);
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    console.log(auth.authenticated);
    console.log('auth.authenticated');
    if (
      auth.authenticated
      && userId
    ) {
      dispatch(fetchUserInfoDataAction(userId));
    }
  }, [
    auth,
    userId,
  ]);

  useEffect(() => {
    console.log(userInfo.data);
    if (
      auth.authenticated
      && userInfo
      && userInfo.data
      && userInfo.data.user_id
      && userInfo.data !== null
    ) {
      dispatch(fetchWithdrawalsAction(
        '',
        '',
        userInfo && userInfo.data && userInfo.data.user_id,
        '',
        '',
        withdrawalPage * rowsPerPage,
        rowsPerPage,
      ));
      dispatch(fetchDepositsAction(
        '',
        '',
        userInfo && userInfo.data && userInfo.data.user_id,
        '',
        '',
        depositPage * rowsPerPage,
        rowsPerPage,
      ));
    }
  }, [
    userInfo,
  ]);

  const acceptWithdrawalFunction = (idWithdrawal) => {
    dispatch(acceptWithdrawalAction(idWithdrawal))
  };
  const declineWithdrawalFunction = (idWithdrawal) => {
    dispatch(declineWithdrawalAction(idWithdrawal))
  };

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
              userInfo
              && userInfo.data
              && userInfo.data.id
              && userInfo.data.id
            }
          </Typography>
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
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            username:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
              && userInfo.data
              && userInfo.data.username
              && userInfo.data.username
            }
          </Typography>
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
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            UserId:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
              && userInfo.data
              && userInfo.data.user_id
              && userInfo.data.user_id
            }
          </Typography>
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
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            firstname:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
              && userInfo.data
              && userInfo.data.firstname
              && userInfo.data.firstname
            }
          </Typography>
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
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            lastname:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
              && userInfo.data
              && userInfo.data.lastname
              && userInfo.data.lastname
            }
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
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
            available balance:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
              && userInfo.data
              && userInfo.data.wallet
              && (userInfo.data.wallet.available / 1e8)
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sm={6}
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
            locked balance:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
              && userInfo.data
              && userInfo.data.wallet
              && (userInfo.data.wallet.locked / 1e8)
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sm={6}
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
            total balance:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
              && userInfo.data
              && userInfo.data.wallet
              && ((userInfo.data.wallet.available + userInfo.data.wallet.locked) / 1e8)
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
          className="zindexOne text-center"
          justifyContent="center"
        >
          <h2>reactdrops stats</h2>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className="zindexOne text-center"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            failed
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {userInfo && userInfo.data && userInfo.data.reactdrop_failed_count && userInfo.data.reactdrop_failed_count}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className="zindexOne text-center"
          justifyContent="center "
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            success
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {userInfo && userInfo.data && userInfo.data.reactdrop_success_count && userInfo.data.reactdrop_success_count}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className="zindexOne text-center"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            success rate
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              userInfo
            && userInfo.data
            && userInfo.data.reactdrop_failed_count
            && userInfo.data.reactdrop_failed_count
            && userInfo.data.reactdrop_success_count
            && ((Number(userInfo.data.reactdrop_success_count) / (Number(userInfo.data.reactdrop_success_count) + Number(userInfo.data.reactdrop_failed_count))) * 100).toFixed(2)
            }
            &#37;
          </Typography>
        </Grid>

      </Grid>

      <Grid
        container
        spacing={0}
        style={{ marginTop: '5px' }}
      >
        <Divider
          style={{ width: '100%' }}
        />
        <Grid item xs={12}>
          <h3>User Activity</h3>
        </Grid>
        <Grid item xs={12}>
          {
            userInfo
            && userInfo.data
            && userInfo.data.user_id
              ? (
                <ActivityContainer
                  id={id}
                  spender={userInfo.data.user_id}
                  earner={userInfo.data.user_id}
                  type={type}
                  amount={amount}
                  rowsPerPage={rowsPerPage}
                />
              ) : (<span />)
          }

        </Grid>
        <Grid item xs={12}>
          <h3>User Deposits</h3>
        </Grid>
        <Grid item xs={12}>
          {
            deposits
              && deposits.isFetching
              ? (<CircularProgress />)
              : (
                <DepositsTable
                  defaultPageSize={10}
                  page={depositPage}
                  setPage={setDepositPage}
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
        <Grid item xs={12}>
          <h3>User Withdrawal</h3>
        </Grid>
        <Grid item xs={12}>
          {
            withdrawals
            && withdrawals.isFetching
              ? (<CircularProgress />)
              : (
                <WithdrawalsTable
                  defaultPageSize={10}
                  page={withdrawalPage}
                  setPage={setWithdrawalPage}
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
  );
}

UserView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userInfo: state.userInfo,
  deposits: state.deposits,
  withdrawals: state.withdrawals,
  acceptWithdrawal: state.acceptWithdrawal,
  declineWithdrawal: state.declineWithdrawal,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(UserView)));
