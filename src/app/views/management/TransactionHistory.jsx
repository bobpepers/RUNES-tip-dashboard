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
  MenuItem,
  Box,
  Select,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchTransactionHistoryAction,
} from '../../actions/transactionHistory';
import { fetchCoinsAction } from '../../actions/coin';
import TransactionHistoryTable from '../../components/management/TransactionHistoryTable';

const TransactionHistoryView = function (props) {
  const {
    auth,
    transactionHistory,
    coins,
  } = props;
  const dispatch = useDispatch();
  const [coinId, setCoinId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    dispatch(fetchCoinsAction());
  }, [
    auth,
  ]);

  useEffect(() => {
    if (!coinId && coins.data) {
      setCoinId(coins.data[0].id);
    }
  }, [
    coins.data,
  ]);

  useEffect(() => {
    if (coinId) {
      dispatch(
        fetchTransactionHistoryAction(
          coinId,
          page * rowsPerPage,
          rowsPerPage,
        ),
      )
    }
  }, [
    coinId,
    auth,
    page,
    rowsPerPage,
  ]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Transaction History</h3>
        </Grid>
        <Grid container item xs={12}>
          <Box
            component={Grid}
            item
            xs={4}
          >
            <Select
              name="coin"
              label="Coin"
              defaultValue={coinId}
              value={coinId}
              onChange={(e) => setCoinId(e.target.value)}
            >
              {coins && coins.data && coins.data.map((coin) => (
                <MenuItem key={coin.ticker} value={coin.id}>
                  {coin.ticker}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {
            transactionHistory && transactionHistory.isFetching
              ? (<CircularProgress />)
              : (
                <TransactionHistoryTable
                  defaultPageSize={page}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={transactionHistory && transactionHistory.count && transactionHistory.count}
                  currentCoin={coins.data && coins.data.find((x) => x.id === coinId)}
                  transactions={transactionHistory
                    && transactionHistory.data
                    ? transactionHistory.data
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
  transactionHistory: state.transactionHistory,
  coins: state.coins,
})

export default withRouter(connect(mapStateToProps, null)(TransactionHistoryView));
