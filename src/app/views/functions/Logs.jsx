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
  Pagination,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Moment from 'react-moment';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchLogsAction,
} from '../../actions/logs';

const renderItems = (data) => {
  const parent = [];
  data.map((error) => {
    parent.push(
      <Grid container key={error.id}>
        <Grid item xs={1} align="center">
          {error.id}
        </Grid>
        <Grid item xs={2}>
          <Moment interval={1000} fromNow>{error.createdAt}</Moment>
        </Grid>
        <Grid item xs={2} align="center">
          {error.type}
        </Grid>
        <Grid item xs={7} align="center">
          {error.message}
        </Grid>
      </Grid>,
    );
    return true;
  });
  return parent;
}

const Logs = function (props) {
  const {
    auth,
    logs,
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const totalPages = logs && logs.count
    ? Math.ceil(logs.count / rowsPerPage)
    : 0;

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchLogsAction(
        (page - 1) * rowsPerPage,
        rowsPerPage,
      ));
    }
  }, [
    auth,
    page,
  ]);

  useEffect(
    () => {
      console.log(page);
      console.log(totalPages);
    },
    [
      auth,
      logs,
      page,
    ],
  );

  const handleChangePage = (
    event,
    value,
  ) => {
    setPage(value);
  }

  const handleNextPage = () => {
    if (totalPages > page) {
      setPage(page + 1)
    }
    console.log(page);
    console.log(totalPages);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
    console.log(page);
    console.log(totalPages);
  };

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        style={{ marginTop: '5px' }}
      >
        <Grid item xs={12}>
          <Grid
            container
            item
            xs={12}
            className="shadow-w index600 glassHeaderActivity"
            style={{ marginTop: '40px' }}
          >
            <Grid item xs={2} mx="auto">
              <ArrowBackIcon
                onClick={handlePreviousPage}
                className={page > 1 ? 'previousArrowActive' : 'previousArrowDisabled'}
                style={{
                  fontSize: '40px',
                  float: 'left',
                }}
              />
            </Grid>
            <Grid
              item
              container
              xs={8}
              justifyContent="center"
            >
              <Pagination
                page={page}
                size="large"
                color="primary"
                count={totalPages}
                onChange={handleChangePage}
                hidePrevButton
                hideNextButton
              />
            </Grid>
            <Grid item xs={2}>
              <ArrowForwardIcon
                onClick={handleNextPage}
                className={totalPages > page ? 'nextArrowActive' : 'nextArrowDisabled'}
                style={{
                  fontSize: '40px',
                  float: 'right',
                }}
              />
              <Grid />
            </Grid>
            <Grid container item xs={12} className="shadow-w pl-20 glassHeader">
              {
                logs
                && logs.data
                  ? renderItems(logs.data)
                  : <CircularProgress />
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Logs.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    doneLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({}),
  }).isRequired,
  logs: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    count: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  logs: state.logs,
})

export default withRouter(connect(mapStateToProps, null)(Logs));
