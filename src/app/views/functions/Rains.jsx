import React, {
  useEffect,
  useState,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  CircularProgress,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchRainsAction,
} from '../../actions/rain';
import RainsTable from '../../components/functions/RainsTable';

const RainsView = function (props) {
  const {
    rains,
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => dispatch(fetchRainsAction(
    page * rowsPerPage,
    rowsPerPage,
  )), [
    page,
    rowsPerPage,
  ]);

  useEffect(() => {
    console.log(rains);
  }, [
    rains,
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
            rains
            && rains.data
            && rains.count
            && !rains.isFetching
              ? (
                <RainsTable
                  defaultPageSize={50}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={rains && rains.count && rains.count}
                  rains={rains
                    && rains.data
                    ? rains.data
                    : []}
                />
              )
              : (
                <CircularProgress />
              )
          }

        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  rains: state.rains,
})

export default withRouter(connect(mapStateToProps, null)(RainsView));
