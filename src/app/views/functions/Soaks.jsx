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
  fetchSoaksAction,
} from '../../actions/soak';
import FunctionsTable from '../../components/functions/FunctionsTable';

const SoaksView = function (props) {
  const {
    soaks,
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => dispatch(fetchSoaksAction(
    page * rowsPerPage,
    rowsPerPage,
  )), [
    page,
    rowsPerPage,
  ]);

  useEffect(() => {
    console.log(soaks);
  }, [
    soaks,
    page,
    rowsPerPage,
  ]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Soaks</h3>
        </Grid>
        <Grid item xs={12}>
          {
            soaks
            && soaks.data
            && soaks.count
            && !soaks.isFetching
              ? (
                <FunctionsTable
                  defaultPageSize={50}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={soaks && soaks.count && soaks.count}
                  linkParam="soak"
                  functions={soaks
                    && soaks.data
                    ? soaks.data
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
  soaks: state.soaks,
})

export default withRouter(connect(mapStateToProps, null)(SoaksView));
