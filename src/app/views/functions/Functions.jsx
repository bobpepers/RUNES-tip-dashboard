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
import FunctionsTable from '../../components/functions/FunctionsTable';

import {
  fetchBotFunctionsAction,
} from '../../actions/botFunction';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const FunctionsView = function (props) {
  const {
    botFunctions,
    functionName,
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => dispatch(fetchBotFunctionsAction(
    `${functionName}s`,
    page * rowsPerPage,
    rowsPerPage,
  )), [
    functionName,
    page,
    rowsPerPage,
  ]);

  useEffect(() => {
    console.log(botFunctions);
  }, [
    botFunctions,
    page,
    rowsPerPage,
  ]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>
            {capitalizeFirstLetter(functionName)}
            s
          </h3>
        </Grid>
        <Grid item xs={12}>
          {
            botFunctions
            && botFunctions.data
            && botFunctions.count
            && !botFunctions.isFetching
              ? (
                <FunctionsTable
                  defaultPageSize={50}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={botFunctions && botFunctions.count && botFunctions.count}
                  linkParam={functionName}
                  functions={botFunctions
                    && botFunctions.data
                    ? botFunctions.data
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
  botFunctions: state.botFunctions,
})

export default withRouter(connect(mapStateToProps, null)(FunctionsView));
