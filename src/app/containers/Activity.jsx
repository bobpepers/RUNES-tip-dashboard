import React, { useEffect, useState } from 'react';
import {
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';
import Moment from 'react-moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const renderEarnedSpendBalance = (activity) => (
  <>
    <Typography variant="subtitle1" gutterBottom component="div">
      spender balance:
      {' '}
      {activity.spender_balance / 1e8}
    </Typography>
    <Typography variant="subtitle1" gutterBottom component="div">
      earner balance:
      {' '}
      {activity.earner_balance / 1e8}
    </Typography>
  </>
)

const renderEarnerBalance = (activity) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    earner balance:
    {' '}
    {activity.earner_balance / 1e8}
  </Typography>
)

const renderSpenderBalance = (activity) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    spender balance:
    {' '}
    {activity.spender_balance / 1e8}
  </Typography>
)

const renderAmount = (activity) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    amount:
    {' '}
    {activity.amount && activity.amount / 1e8}
  </Typography>
)

const renderBy = (activity) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    by:
    {' '}
    {activity.spender && activity.spender.username && activity.spender.username}
    {' '}
    (
    {activity.spender && activity.spender.user_id && activity.spender.user_id}
    )
  </Typography>
)

const renderTo = (activity) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    to:
    {' '}
    {activity.earner && activity.earner.username && activity.earner.username}
    {' '}
    (
    {activity.earner && activity.earner.user_id && activity.earner.user_id}
    )
  </Typography>
)

const renderInsufficientBalance = () => (
  <Typography variant="subtitle1" gutterBottom component="div">
    Insufficient balance
  </Typography>
)

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
          {activity.type === 'faucettip_s' && 'Claim Faucet'}
          {activity.type === 'waterFaucet' && 'Water Faucet'}
          {activity.type === 'thundertip_f' && 'ThunderTip: fail'}
          {activity.type === 'thundertip_s' && 'ThunderTip: success'}
          {activity.type === 'thunderstormtip_f' && 'ThunderStormTip: fail'}
          {activity.type === 'thunderstormtip_s' && 'ThunderStormTip: success'}
          {activity.type === 'raintip_f' && 'RainTip: fail'}
          {activity.type === 'raintip_s' && 'RainTip: success'}
          {activity.type === 'soaktip_f' && 'SoakTip: fail'}
          {activity.type === 'soaktip_s' && 'SoakTip: success'}
          {activity.type === 'floodtip_f' && 'FloodTip: fail'}
          {activity.type === 'floodtip_s' && 'FloodTip: success'}
          {activity.type === 'sleettip_f' && 'SleetTip: fail'}
          {activity.type === 'sleettip_s' && 'SleetTip: success'}
          {activity.type === 'reactdrop_f' && 'ReactDrop: fail'}
          {activity.type === 'reactdrop_s' && 'ReactDrop: success'}
          {activity.type === 'reactdrop_i' && 'ReactDrop: insufficient Balance'}
          {activity.type === 'reactdroptip_s' && 'ReactDropTip: success'}
          {activity.type === 'thunderstorm_f' && 'ThunderStorm: fail'}
          {activity.type === 'thunderstorm_s' && 'ThunderStorm: success'}
          {activity.type === 'thunderstorm_i' && 'ThunderStorm: insufficient Balance'}
          {activity.type === 'thunder_f' && 'Thunder: fail'}
          {activity.type === 'thunder_s' && 'Thunder: success'}
          {activity.type === 'thunder_i' && 'Thunder: insufficient Balance'}
          {activity.type === 'soak_f' && 'Soak: fail'}
          {activity.type === 'soak_s' && 'Soak: success'}
          {activity.type === 'soak_i' && 'Soak: insufficient Balance'}
          {activity.type === 'sleet_f' && 'Sleet: fail'}
          {activity.type === 'sleet_s' && 'Sleet: success'}
          {activity.type === 'sleet_i' && 'Sleet: insufficient Balance'}
          {activity.type === 'flood_f' && 'Flood: fail'}
          {activity.type === 'flood_s' && 'Flood: success'}
          {activity.type === 'flood_i' && 'Flood: insufficient Balance'}
          {activity.type === 'rain_f' && 'Rain: fail'}
          {activity.type === 'rain_s' && 'Rain: success'}
          {activity.type === 'rain_i' && 'Rain: insufficient Balance'}
          {activity.type === 'tip_f' && 'Tip: fail'}
          {activity.type === 'tip_s' && 'Tip: success'}
          {activity.type === 'tip_i' && 'Tip: insufficient Balance'}
          {activity.type === 'info' && 'Info Request success'}
          {activity.type === 'help' && 'Help Request success'}
          {activity.type === 'deposit' && 'Deposit address Request success'}
          {activity.type === 'balance' && 'Balance Request success'}
          {activity.type === 'depositAccepted' && 'Deposit Accepted'}
          {activity.type === 'depositComplete' && 'Deposit Complete'}
          {activity.type === 'withdrawRequested' && 'Withdrawal Requested'}
          {activity.type === 'withdrawAccepted' && 'Withdrawal Accepted'}
          {activity.type === 'withdrawRejected' && 'Withdrawal Rejected'}
          {activity.type === 'withdrawComplete' && 'Withdrawal Complete'}
        </Grid>
        <Grid item xs={4} align="center">
          {(
            activity.type === 'floodtip_s'
            || activity.type === 'soaktip_s'

            || activity.type === 'sleettip_s'
            || activity.type === 'raintip_s'
            || activity.type === 'thunderstormtip_s'
            || activity.type === 'thundertip_s'
            || activity.type === 'reactdroptip_s'

            || activity.type === 'thundertip_f'
            || activity.type === 'thunderstormtip_f'
            || activity.type === 'raintip_f'
            || activity.type === 'soaktip_f'
            || activity.type === 'floodtip_f'
            || activity.type === 'sleettip_f'
            || activity.type === 'faucettip_s'
            || activity.type === 'deposit'

            || activity.type === 'balance'
            || activity.type === 'info'
            || activity.type === 'help'
          ) && renderTo(activity)}

          {(
            activity.type === 'reactdrop_s'
            || activity.type === 'thunder_s'

            || activity.type === 'thunderstorm_s'
            || activity.type === 'soak_s'
            || activity.type === 'sleet_s'
            || activity.type === 'flood_s'
            || activity.type === 'rain_s'

            || activity.type === 'reactdrop_i'
            || activity.type === 'thunderstorm_i'
            || activity.type === 'thunder_i'
            || activity.type === 'soak_i'
            || activity.type === 'sleet_i'
            || activity.type === 'flood_i'
            || activity.type === 'rain_i'
            || activity.type === 'tip_i'

            || activity.type === 'reactdrop_f'
            || activity.type === 'thunderstorm_f'
            || activity.type === 'thunder_f'
            || activity.type === 'soak_f'
            || activity.type === 'soak_f'
            || activity.type === 'sleet_f'
            || activity.type === 'flood_f'
            || activity.type === 'rain_f'
            || activity.type === 'tip_f'

            || activity.type === 'depositAccepted'
            || activity.type === 'depositComplete'

            || activity.type === 'withdrawRequested'
            || activity.type === 'withdrawAccepted'
            || activity.type === 'withdrawRejected'
            || activity.type === 'withdrawComplete'
          ) && renderBy(activity)}

          {activity.type === 'tip_s' && (
            <>
              <Typography variant="subtitle1" gutterBottom component="div">
                by:
                {' '}
                {activity.spender && activity.spender.username}
                {' '}
                (
                {activity.spender && activity.spender.user_id}
                )
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                to:
                {' '}
                {activity.earner && activity.earner.username}
                {' '}
                (
                {activity.earner && activity.earner.user_id}
                )
              </Typography>
            </>
          )}

        </Grid>
        <Grid item xs={2} align="center">
          {(
            activity.type === 'reactdrop_s'
            || activity.type === 'thunder_s'
            || activity.type === 'soak_s'
            || activity.type === 'thunderstorm_s'
            || activity.type === 'sleet_s'
            || activity.type === 'rain_s'
            || activity.type === 'flood_s'
            || activity.type === 'thundertip_s'
            || activity.type === 'raintip_s'
            || activity.type === 'soaktip_s'
            || activity.type === 'floodtip_s'
            || activity.type === 'sleettip_s'
            || activity.type === 'thunderstormtip_s'
            || activity.type === 'tip_s'

            || activity.type === 'depositAccepted'
            || activity.type === 'depositComplete'
            || activity.type === 'withdrawRequested'
            || activity.type === 'withdrawAccepted'
            || activity.type === 'withdrawRejected'
            || activity.type === 'withdrawComplete'

            || activity.type === 'thundertip_f'
            || activity.type === 'thunderstormtip_f'
            || activity.type === 'raintip_f'
            || activity.type === 'soaktip_f'
            || activity.type === 'floodtip_f'
            || activity.type === 'sleettip_f'
            || activity.type === 'reactdrop_f'

            || activity.type === 'thunderstorm_f'
            || activity.type === 'thunder_f'
            || activity.type === 'soak_f'
            || activity.type === 'sleet_f'
            || activity.type === 'flood_f'

            || activity.type === 'rain_f'
            || activity.type === 'tip_f'
            || activity.type === 'flood_f'
            || activity.type === 'flood_f'

            || activity.type === 'reactdrop_i'
            || activity.type === 'thunderstorm_i'
            || activity.type === 'thunder_i'
            || activity.type === 'soak_i'
            || activity.type === 'sleet_i'
            || activity.type === 'flood_i'
            || activity.type === 'rain_i'
            || activity.type === 'tip_i'
            || activity.type === 'reactdroptip_i'
            || activity.type === 'reactdroptip_s'
            || activity.type === 'waterFaucet'
          ) && renderAmount(activity)}

          {activity.type === 'balance' && ''}
          {activity.type === 'info' && `id: ${activity.earner.user_id}`}
        </Grid>
        <Grid item xs={2} align="center">
          {(
            activity.type === 'reactdrop_s'
            || activity.type === 'thunder_s'
            || activity.type === 'soak_s'
            || activity.type === 'thunderstorm_s'
            || activity.type === 'sleet_s'
            || activity.type === 'rain_s'
            || activity.type === 'flood_s'

            || activity.type === 'reactdrop_f'
            || activity.type === 'thunderstorm_f'
            || activity.type === 'thunder_f'
            || activity.type === 'soak_f'
            || activity.type === 'sleet_f'
            || activity.type === 'flood_f'
            || activity.type === 'rain_f'
            || activity.type === 'withdrawComplete'
          ) && renderSpenderBalance(activity)}

          {(
            activity.type === 'tip_s'
            || activity.type === 'floodtip_s'
            || activity.type === 'thundertip_s'
            || activity.type === 'thunderstormtip_s'
            || activity.type === 'raintip_s'
            || activity.type === 'soaktip_s'
            || activity.type === 'sleettip_s'
          ) && renderEarnedSpendBalance(activity)}

          {(
            activity.type === 'reactdrop_i'
            || activity.type === 'thunder_i'
            || activity.type === 'thunderstorm_i'
            || activity.type === 'soak_i'
            || activity.type === 'flood_i'
            || activity.type === 'sleet_i'
            || activity.type === 'rain_i'
            || activity.type === 'tip_i'
          ) && renderInsufficientBalance()}

          {(
            activity.type === 'depositComplete'
            || activity.type === 'reactdroptip_s'
            || activity.type === 'waterFaucet'
          ) && renderEarnerBalance(activity)}

          {activity.type === 'tip_f' && `amount: ${activity.amount / 1e8}`}

          {activity.type === 'depositAccepted' && ''}
          {activity.type === 'withdrawRequested' && ''}
          {activity.type === 'withdrawAccepted' && ''}
          {activity.type === 'withdrawRejected' && ''}
        </Grid>

      </Grid>,
    );
    return true;
  });
  return parent;
}

const ActivityContainer = function (props) {
  const { activity } = props;
  useEffect(() => { }, [activity]);
  const activitiesPerPage = 20;
  const totalPages = activity
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
          activity
            ? renderItems(activity.slice(indexOfFirstActivity, indexOfLastActivity))
            : <CircularProgress />
        }
      </Grid>
    </Grid>
  )
}

export default ActivityContainer;
