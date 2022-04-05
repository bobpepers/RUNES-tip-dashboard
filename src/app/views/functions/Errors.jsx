import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Moment from 'react-moment';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchErrorsAction,
} from '../../actions/errors';

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
          {error.error}
        </Grid>
      </Grid>,
    );
    return true;
  });
  return parent;
}

const Errors = function (props) {
  const {
    auth,
    errors,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchErrorsAction());
    }
  }, [
    auth,
  ]);

  useEffect(
    () => {
      console.log(auth);
      console.log(errors);
    },
    [
      auth,
      errors,
    ],
  );

  const activitiesPerPage = 20;
  const totalPages = errors
    ? Math.ceil(errors.length / activitiesPerPage)
    : 0;
  const [activePage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (totalPages > activePage) {
      setCurrentPage(activePage + 1)
    }
  };

  const handlePreviousPage = () => {
    if (activePage > 1) {
      setCurrentPage(activePage - 1)
    }
  };

  const indexOfLastActivity = activePage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        style={{ marginTop: '5px' }}
      >
        <Grid item xs={12}>
          <Grid container item xs={12} className="shadow-w index600 glassHeaderActivity" style={{ marginTop: '40px' }}>
            <Grid item xs={2} className="textcenter" mx="auto">
              <ArrowBackIcon
                onClick={handlePreviousPage}
                className={activePage > 1 ? 'previousArrowActive' : 'previousArrowDisabled'}
                style={{ fontSize: '40px', float: 'left' }}
              />
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={2} className="textcenter">
              <ArrowForwardIcon
                onClick={handleNextPage}
                className={totalPages > activePage ? 'nextArrowActive' : 'nextArrowDisabled'}
                style={{ fontSize: '40px', float: 'right' }}
              />
              <Grid />
            </Grid>
            <Grid container item xs={12} className="shadow-w pl-20 glassHeader">
              {
                errors
                && errors.data
                  ? renderItems(errors.data.slice(indexOfFirstActivity, indexOfLastActivity))
                  : <CircularProgress />
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Errors.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Errors)));
