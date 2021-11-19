import React, { useEffect, useState } from 'react';
import {
  Grid,
  CircularProgress,
} from '@mui/material';
import Moment from 'react-moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const renderItems = (data) => {
  const parent = [];
  data.map((activity) => {
    console.log(activity);
    parent.push(
      <Grid container key={activity.id}>
        <Grid item xs={2}>
          <Moment interval={1000} fromNow>{activity.createdAt}</Moment>
        </Grid>
        <Grid item xs={2} align="center">
          {activity.type === 'info' && 'Info Request success'}
          {activity.type === 'balance' && 'Balance Request success'}
          {activity.type === 'depositAccepted' && 'Deposit Accepted'}
          {activity.type === 'depositComplete' && 'Deposit Complete'}
          {activity.type === 'withdrawRequested' && 'Withdrawal Requested'}
          {activity.type === 'withdrawAccepted' && 'Withdrawal Accepted'}
          {activity.type === 'withdrawRejected' && 'Withdrawal Rejected'}
          {activity.type === 'withdrawComplete' && 'Withdrawal Complete'}
        </Grid>
        <Grid item xs={4} align="center">
          {activity.type === 'balance' && `by ${activity.earner.username}`}
          {activity.type === 'info' && `by ${activity.earner.username}`}
          {activity.type === 'depositAccepted' && `accepted ${activity.earner.username}'s (${activity.earner.user_id}) deposit`}
          {activity.type === 'depositComplete' && `confirmed ${activity.earner.username}'s (${activity.earner.user_id}) deposit`}
          {activity.type === 'withdrawRequested' && `${activity.spender.username} (${activity.spender.user_id}) requested a withdrawal`}
          {activity.type === 'withdrawAccepted' && `${activity.spender.username} (${activity.spender.user_id})  withdrawal accepted`}
          {activity.type === 'withdrawRejected' && `${activity.spender.username} (${activity.spender.user_id})  withdrawal rejected`}
          {activity.type === 'withdrawComplete' && `${activity.spender.username} (${activity.spender.user_id})  withdrawal complete`}
        </Grid>
        <Grid item xs={2} align="center">
          {activity.type === 'balance' && `id: ${activity.earner.user_id}`}
          {activity.type === 'info' && `id: ${activity.earner.user_id}`}
          {activity.type === 'depositAccepted' && `Amount: ${activity.amount / 1e8}`}
          {activity.type === 'depositComplete' && `Amount: ${activity.amount / 1e8}`}
          {activity.type === 'withdrawRequested' && `Amount: ${activity.amount / 1e8}`}
          {activity.type === 'withdrawAccepted' && `Amount: ${activity.amount / 1e8}`}
          {activity.type === 'withdrawRejected' && `Amount: ${activity.amount / 1e8}`}
          {activity.type === 'withdrawComplete' && `Amount: ${activity.amount / 1e8}`}
        </Grid>
        <Grid item xs={2} align="center">
          {activity.type === 'depositAccepted' && ''}
          {activity.type === 'depositComplete' && `New Bal: ${activity.earner_balance / 1e8}`}
          {activity.type === 'withdrawRequested' && ''}
          {activity.type === 'withdrawAccepted' && ''}
          {activity.type === 'withdrawRejected' && ''}
          {activity.type === 'withdrawComplete' && `New Bal: ${activity.spender_balance / 1e8}`}
        </Grid>

      </Grid>,
    );
    return true;
  });
  return parent;
}

const ActivityContainer = (props) => {
  const { activity } = props;
  useEffect(() => { }, [activity]);
  const activitiesPerPage = 20;
  const totalPages = !activity
    && activity
    ? Math.ceil(activity.length / activitiesPerPage)
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

  // Logic for displaying current todos
  const indexOfLastActivity = activePage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;

  return (
    <Grid container item xs={12} className="shadow-w index600 glassHeaderActivity" style={{ marginTop: '40px' }}>
      <Grid item xs={2} className="textcenter" mx="auto">
        <ArrowBackIcon
          onClick={handlePreviousPage}
          className={activePage > 1 ? 'previousArrowActive' : 'previousArrowDisabled'}
          style={{ fontSize: '40px', float: 'left' }}
        />
      </Grid>
      <Grid item xs={8}>
        <h3 className="textCenter">Activity</h3>
      </Grid>
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
          activity
            ? renderItems(activity.slice(indexOfFirstActivity, indexOfLastActivity))
            : <CircularProgress />
        }
      </Grid>
    </Grid>
  )
}

export default ActivityContainer;
