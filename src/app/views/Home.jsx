import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  connect,
  useDispatch,
} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import BigNumber from 'bignumber.js';
import ActivityContainer from '../containers/Activity';
import ActivityFilter from '../containers/filters/ActivityFilter';
import { withRouter } from '../hooks/withRouter';
import { fetchNodeStatusAction } from '../actions/nodeStatus';
import { fetchBlockNumberAction } from '../actions/blockNumber';
import { fetchAdminWalletAction } from '../actions/adminWallet';

const renderWallet = (
  wallet,
) => (
  <Grid
    container
    spacing={1}
    justifyContent="center"
    className="zindexOne"
  >
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
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
        Liability
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        align="center"
      >
        {`${new BigNumber(wallet.liability).dividedBy(`1e${wallet.dp}`).toString()} ${wallet.ticker}`}
      </Typography>
    </Grid>

    <Grid
      item
      xs={6}
      sm={6}
      md={4}
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
        Balance
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        align="center"
      >
        {`${new BigNumber(wallet.balance).dividedBy(`1e${wallet.dp}`).toString()} ${wallet.ticker}`}
      </Typography>
    </Grid>
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
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
        Difference
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        align="center"
      >
        {`${new BigNumber(wallet.balance).minus(wallet.liability).dividedBy(`1e${wallet.dp}`).toString()} ${wallet.ticker}`}
      </Typography>
    </Grid>
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
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
        Faucet Balance
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        align="center"
      >
        {`${new BigNumber(wallet.faucetBalance).dividedBy(`1e${wallet.dp}`).toString()} ${wallet.ticker}`}
      </Typography>
    </Grid>
  </Grid>
)

const Home = function (props) {
  const {
    auth,
    nodeStatus,
    adminWallet,
    blockNumber,
  } = props;
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [spender, setSpender] = useState('');
  const [earner, setEarner] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const refreshStats = () => {
    if (auth.authenticated) {
      dispatch(fetchNodeStatusAction());
      dispatch(fetchBlockNumberAction());
      dispatch(fetchAdminWalletAction());
    }
  }

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchNodeStatusAction());
      dispatch(fetchBlockNumberAction());
      dispatch(fetchAdminWalletAction());
    }
  }, [
    auth,
  ]);

  useEffect(
    () => {
      console.log(auth);
      console.log(adminWallet);
    },
    [
      auth,
      nodeStatus,
      adminWallet,
      blockNumber,
    ],
  );

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
            Status
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {nodeStatus.data
              && nodeStatus.data.peers
              ? `${nodeStatus.data.peers}`
              : 'offline'}
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
            Node blockNumber
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {blockNumber.data
              && blockNumber.data
              ? `${blockNumber.data.node}`
              : '0'}
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
            DB blockNumber
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {blockNumber.data
              && blockNumber.data
              ? `${blockNumber.data.db}`
              : '0'}
          </Typography>
        </Grid>
      </Grid>
      {
        adminWallet
      && adminWallet.data
      && adminWallet.data.map((wallet) => renderWallet(wallet))
      }

      <Grid
        container
        spacing={0}
        style={{
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        <Divider
          style={{ width: '100%' }}
        />
        <Grid
          align="center"
          justifyContent="center"
          item
          xs={12}
        >
          {
            blockNumber.isFetching ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={() => refreshStats()}
              >
                Refresh Stats
              </Button>
            )
          }

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
          <h3>Activity</h3>
        </Grid>
        <Grid item xs={12}>
          <ActivityFilter
            id={id}
            setId={setId}
            spender={spender}
            setSpender={setSpender}
            earner={earner}
            setEarner={setEarner}
            type={type}
            setType={setType}
            amount={amount}
            setAmount={setAmount}
          />
        </Grid>

        <Grid item xs={12}>
          <ActivityContainer
            id={id}
            spender={spender}
            earner={earner}
            type={type}
            amount={amount}
            rowsPerPage={rowsPerPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  nodeStatus: state.nodeStatus,
  adminWallet: state.adminWallet,
  blockNumber: state.blockNumber,
  dp: state.dp,
})

export default withRouter(connect(mapStateToProps, null)(Home));
