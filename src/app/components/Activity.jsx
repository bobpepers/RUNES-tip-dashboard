import React from 'react';
import {
  Grid,
  CircularProgress,
  Typography,
  Pagination,
  Button,
} from '@mui/material';
import Moment from 'react-moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

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
    <br />
    {activity.earner_balance / 1e8}
  </Typography>
)

const renderSpenderBalance = (activity) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    spender balance:
    <br />
    {activity.spender_balance / 1e8}
  </Typography>
)

const renderAmount = (activity) => (
  <Typography
    variant="subtitle1"
    gutterBottom
    component="div"
    style={{ wordBreak: 'break-word' }}
  >
    amount:
    <br />
    {activity.amount && activity.amount / 1e8}
    {activity.failedAmount && activity.failedAmount}
  </Typography>
)

const renderBy = (
  activity,
  navigate,
) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    by:
    <br />
    <Button
      onClick={() => navigate(`/management/user/${activity.spender && activity.spender.id && activity.spender.id}`)}
    >
      {activity.spender && activity.spender.username && activity.spender.username}
      {activity.spender && !activity.spender.username && activity.spender.firstname && `${activity.spender.firstname} `}
      {activity.spender && !activity.spender.username && activity.spender.lastname && activity.spender.lastname}
      {' '}
      (
      {activity.spender && activity.spender.user_id && activity.spender.user_id}
      )
    </Button>
  </Typography>
)

const renderTo = (
  activity,
  navigate,
) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    to:
    <br />
    <Button
      onClick={() => navigate(`/management/user/${activity.earner && activity.earner.id && activity.earner.id}`)}
    >
      {activity.earner && activity.earner.username && activity.earner.username}
      {activity.earner && !activity.earner.username && activity.earner.firstname && `${activity.earner.firstname} `}
      {activity.earner && !activity.earner.username && activity.earner.lastname && activity.earner.lastname}
      {' '}
      (
      {activity.earner && activity.earner.user_id && activity.earner.user_id}
      )
    </Button>

  </Typography>
)

const renderDashboardUser = (
  activity,
  navigate,
) => (
  <Typography variant="subtitle1" gutterBottom component="div">
    dashboard user:
    <br />
    <Button
      onClick={() => navigate(`/management/dashboarduser/${activity.dashboardUser && activity.dashboardUser.id && activity.dashboardUser.id}`)}
    >
      {activity.dashboardUser && activity.dashboardUser.username && activity.dashboardUser.username}
    </Button>

  </Typography>
)

const renderItems = (
  data,
  navigate,
) => {
  const parent = [];
  data.map((activity) => {
    console.log(activity);
    parent.push(
      <Grid
        container
        key={activity.id}
      >
        <Grid
          item
          container
          xs={12}
          style={{
            borderBottom: '2px dotted black',
          }}
        >

          <Grid
            item
            xs={6}
            lg={1}
            align="center"
          >
            <Moment interval={1000} fromNow>{activity.createdAt}</Moment>
          </Grid>
          <Grid
            item
            xs={6}
            lg={1}
            align="center"
          >
            {activity.id}
          </Grid>
          <Grid
            item
            xs={12}
            lg={2}
            align="center"
          >
            {activity.type === 'faucettip_s' && 'Claim Faucet'}
            {activity.type === 'faucettip_t' && 'Claim Faucet too fast'}
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
            {activity.type === 'tiptip_s' && 'TipTip: success'}
            {activity.type === 'info_s' && 'Info Request success'}
            {activity.type === 'help_s' && 'Help Request success'}
            {activity.type === 'price_s' && 'Price Request success'}
            {activity.type === 'deposit_s' && 'Deposit address Request success'}
            {activity.type === 'balance_s' && 'Balance Request success'}
            {activity.type === 'info_f' && 'Info Request failed'}
            {activity.type === 'help_f' && 'Help Request failed'}
            {activity.type === 'price_f' && 'Price Request failed'}
            {activity.type === 'deposit_f' && 'Deposit address Request failed'}
            {activity.type === 'balance_f' && 'Balance Request failed'}
            {activity.type === 'withdraw_f' && 'Withdraw Request failed'}
            {activity.type === 'voicerain_f' && 'VoiceRain Request failed'}
            {activity.type === 'stats_f' && 'Stats Request failed'}
            {activity.type === 'publicstats_f' && 'PublicStats Request failed'}
            {activity.type === 'listtransactions_f' && 'ListTransactions Request failed'}
            {activity.type === 'ignoreme_f' && 'IgnoreMe Request failed'}
            {activity.type === 'ignoreme_s' && 'IgnoreMe Request success'}
            {activity.type === 'faucet_f' && 'Faucet Request failed'}
            {activity.type === 'fees_f' && 'Fees Request failed'}
            {activity.type === 'fees_s' && 'Fees Request success'}
            {activity.type === 'depositAccepted' && 'Deposit Accepted'}
            {activity.type === 'depositComplete' && 'Deposit Complete'}
            {activity.type === 'withdrawRequested' && 'Withdrawal Requested'}
            {activity.type === 'withdrawAccepted' && 'Withdrawal Accepted'}
            {activity.type === 'withdrawRejected' && 'Withdrawal Rejected'}
            {activity.type === 'withdrawComplete' && 'Withdrawal Complete'}
            {activity.type === 'hurricanetip_f' && 'HurricaneTip: fail'}
            {activity.type === 'hurricanetip_s' && 'HurricaneTip: success'}
            {activity.type === 'hurricane_f' && 'Hurricane: fail'}
            {activity.type === 'hurricane_s' && 'Hurricane: success'}
            {activity.type === 'hurricane_i' && 'Hurricane: insufficient Balance'}
            {activity.type === 'triviatip_s' && 'TriviaTip: success'}
            {activity.type === 'trivia_f' && 'Trivia: fail'}
            {activity.type === 'trivia_s' && 'Trivia: success'}
            {activity.type === 'trivia_i' && 'Trivia: insufficient Balance'}
            {activity.type === 'stats_s' && 'Stats: success'}
            {activity.type === 'listtransactions_s' && 'List Transactions: success'}
            {activity.type === 'publicstats_s' && 'PublicStats: success'}
            {activity.type === 'voicerain_s' && 'VoiceRain: success'}
            {activity.type === 'voicerain_i' && 'VoiceRain: insufficient Balance'}
            {activity.type === 'voiceraintip_s' && 'VoiceRainTip: success'}
            {activity.type === 'withdraw_i' && 'Withdraw: insufficient Balance'}

            {activity.type === 'login_s' && 'Dashboard Login: success'}
            {activity.type === 'login_f' && 'Dashboard Login: fail'}
            {activity.type === 'logout_s' && 'Dashboard Logout: success'}
            {activity.type === 'tip_faucet_s' && 'Tip Faucet: success'}
            {activity.type === 'tiptip_faucet_s' && 'Tip Faucet: success'}

          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            align="center"
          >
            {(
              activity.type === 'login_s'
            || activity.type === 'logout_s'
            ) && renderDashboardUser(activity, navigate)}

            {(
              activity.type === 'floodtip_s'
            || activity.type === 'soaktip_s'
            || activity.type === 'sleettip_s'
            || activity.type === 'raintip_s'
            || activity.type === 'thunderstormtip_s'
            || activity.type === 'thundertip_s'
            || activity.type === 'reactdroptip_s'
            || activity.type === 'hurricanetip_s'
            || activity.type === 'faucettip_s'
            || activity.type === 'faucettip_t'
            || activity.type === 'tiptip_s'
            || activity.type === 'triviatip_s'
            || activity.type === 'fees_s'
            || activity.type === 'ignoreme_s'
            || activity.type === 'listtransactions_s'
            || activity.type === 'publicstats_s'

            || activity.type === 'thundertip_f'
            || activity.type === 'thunderstormtip_f'
            || activity.type === 'raintip_f'
            || activity.type === 'soaktip_f'
            || activity.type === 'floodtip_f'
            || activity.type === 'sleettip_f'
            || activity.type === 'hurricanetip_f'

            || activity.type === 'deposit_s'
            || activity.type === 'stats_s'

            || activity.type === 'balance_s'
            || activity.type === 'info_s'
            || activity.type === 'help_s'
            || activity.type === 'price_s'
            || activity.type === 'depositAccepted'
            || activity.type === 'depositComplete'
            || activity.type === 'tiptip_faucet_s'

            ) && renderTo(activity, navigate)}

            {(
              activity.type === 'reactdrop_s'
            || activity.type === 'thunder_s'
            || activity.type === 'thunderstorm_s'
            || activity.type === 'soak_s'
            || activity.type === 'sleet_s'
            || activity.type === 'flood_s'
            || activity.type === 'rain_s'
            || activity.type === 'hurricane_s'
            || activity.type === 'trivia_s'
            || activity.type === 'voicerain_s'
            || activity.type === 'tip_faucet_s'

            || activity.type === 'reactdrop_i'
            || activity.type === 'thunderstorm_i'
            || activity.type === 'thunder_i'
            || activity.type === 'soak_i'
            || activity.type === 'sleet_i'
            || activity.type === 'flood_i'
            || activity.type === 'rain_i'
            || activity.type === 'tip_i'
            || activity.type === 'hurricane_i'
            || activity.type === 'trivia_i'
            || activity.type === 'withdraw_i'
            || activity.type === 'voicerain_i'

            || activity.type === 'reactdrop_f'
            || activity.type === 'thunderstorm_f'
            || activity.type === 'thunder_f'
            || activity.type === 'soak_f'
            || activity.type === 'soak_f'
            || activity.type === 'sleet_f'
            || activity.type === 'flood_f'
            || activity.type === 'rain_f'
            || activity.type === 'tip_f'
            || activity.type === 'hurricane_f'
            || activity.type === 'trivia_f'
            || activity.type === 'withdraw_f'
            || activity.type === 'voicerain_f'

            || activity.type === 'withdrawRequested'
            || activity.type === 'withdrawAccepted'
            || activity.type === 'withdrawRejected'
            || activity.type === 'withdrawComplete'
            ) && renderBy(activity, navigate)}

            {activity.type === 'tip_s' && (
              <>
                <Button
                  onClick={() => navigate(`/management/user/${activity.spender && activity.spender.id && activity.spender.id}`)}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                  >
                    by:
                    {' '}
                    {activity.spender && activity.spender.username && activity.spender.username}
                    {' '}
                    (
                    {activity.spender && activity.spender.user_id && activity.spender.user_id}
                    )
                  </Typography>
                </Button>
                <Typography variant="subtitle1" gutterBottom component="div">
                  to:
                  {' '}
                  {activity.earner && activity.earner.username && activity.earner.username}
                  {' '}
                  (
                  {activity.earner && activity.earner.user_id && activity.earner.user_id}
                  )
                </Typography>
              </>
            )}

          </Grid>
          <Grid
            item
            xs={6}
            lg={2}
            align="center"
          >
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
            || activity.type === 'hurricane_s'
            || activity.type === 'hurricanetip_s'
            || activity.type === 'tiptip_s'
            || activity.type === 'faucettip_s'
            || activity.type === 'voiceraintip_s'
            || activity.type === 'tiptip_faucet_s'
            || activity.type === 'tip_faucet_s'

            || activity.type === 'trivia_s'

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
            || activity.type === 'hurricane_f'
            || activity.type === 'trivia_f'
            || activity.type === 'voicerain_f'

            || activity.type === 'thunderstorm_f'
            || activity.type === 'thunder_f'
            || activity.type === 'soak_f'
            || activity.type === 'sleet_f'
            || activity.type === 'flood_f'

            || activity.type === 'rain_f'
            || activity.type === 'tip_f'
            || activity.type === 'flood_f'
            || activity.type === 'flood_f'

            || activity.type === 'trivia_i'
            || activity.type === 'reactdrop_i'
            || activity.type === 'thunderstorm_i'
            || activity.type === 'thunder_i'
            || activity.type === 'soak_i'
            || activity.type === 'sleet_i'
            || activity.type === 'flood_i'
            || activity.type === 'rain_i'
            || activity.type === 'tip_i'
            || activity.type === 'reactdroptip_i'
            || activity.type === 'hurricane_i'
            || activity.type === 'reactdroptip_s'
            || activity.type === 'waterFaucet'
            || activity.type === 'withdraw_i'
            || activity.type === 'voicerain_i'
            ) && renderAmount(activity)}
          </Grid>
          <Grid
            item
            xs={6}
            lg={2}
            align="center"
          >
            {(
              activity.type === 'reactdrop_s'
            || activity.type === 'thunder_s'
            || activity.type === 'soak_s'
            || activity.type === 'thunderstorm_s'
            || activity.type === 'sleet_s'
            || activity.type === 'rain_s'
            || activity.type === 'flood_s'
            || activity.type === 'hurricane_s'
            // || activity.type === 'tip_s'
            || activity.type === 'trivia_s'
            || activity.type === 'voicerain_s'
            || activity.type === 'tip_faucet_s'

            || activity.type === 'reactdrop_f'
            || activity.type === 'thunderstorm_f'
            || activity.type === 'thunder_f'
            || activity.type === 'soak_f'
            || activity.type === 'sleet_f'
            || activity.type === 'flood_f'
            || activity.type === 'rain_f'
            || activity.type === 'hurricane_f'
            || activity.type === 'trivia_f'
            || activity.type === 'withdraw_f'
            || activity.type === 'voicerain_f'
            || activity.type === 'withdrawComplete'

            || activity.type === 'reactdrop_i'
            || activity.type === 'thunder_i'
            || activity.type === 'thunderstorm_i'
            || activity.type === 'soak_i'
            || activity.type === 'flood_i'
            || activity.type === 'sleet_i'
            || activity.type === 'rain_i'
            || activity.type === 'tip_i'
            || activity.type === 'hurricane_i'
            || activity.type === 'trivia_i'
            || activity.type === 'withdraw_i'
            || activity.type === 'voicerain_i'
            ) && renderSpenderBalance(activity)}

            {(
              activity.type === 'tip_s'
            || activity.type === 'floodtip_s'
            || activity.type === 'thundertip_s'
            || activity.type === 'thunderstormtip_s'
            || activity.type === 'raintip_s'
            || activity.type === 'soaktip_s'
            || activity.type === 'sleettip_s'
            || activity.type === 'hurricanetip_s'
            || activity.type === 'tiptip_s'
            || activity.type === 'triviatip_s'
            || activity.type === 'faucettip_s'
            || activity.type === 'voiceraintip_s'
            || activity.type === 'tiptip_faucet_s'

            ) && renderEarnedSpendBalance(activity)}

            {(
              activity.type === 'depositComplete'
            || activity.type === 'reactdroptip_s'
            || activity.type === 'waterFaucet'
            || activity.type === 'balance_s'
            ) && renderEarnerBalance(activity)}

            {activity.type === 'tip_f' && `amount: ${activity.amount / 1e8}`}

            {activity.type === 'depositAccepted' && ''}
            {activity.type === 'withdrawRequested' && ''}
            {activity.type === 'withdrawAccepted' && ''}
            {activity.type === 'withdrawRejected' && ''}
          </Grid>
        </Grid>
      </Grid>,
    );
    return true;
  });
  return parent;
}

const ActivityComponent = function (props) {
  const {
    activity,
    totalCount,
    activitiesPerPage,
    page,
    setPage,
  } = props;

  const totalPages = totalCount
    ? Math.ceil(totalCount / activitiesPerPage)
    : 0;

  const handleNextPage = () => {
    if (totalPages > page) {
      setPage(page + 1)
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  };
  const handleChangePage = (
    event,
    value,
  ) => {
    setPage(value);
  }
  const navigate = useNavigate();

  return (
    <Grid
      container
      item
      xs={12}
      className="index600 glassHeaderActivity"
      style={{
        marginTop: '40px',
      }}
    >
      <Grid
        item
        xs={2}
        mx="auto"
      >
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
      <Grid
        item
        xs={2}
      >
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
      <Grid
        container
        item
        xs={12}
        className="glassHeader ml-20 mr-20"
      >
        {
          activity
            ? renderItems(
              activity,
              navigate,
            )
            : <CircularProgress />
        }
      </Grid>
    </Grid>
  )
}

export default ActivityComponent;
