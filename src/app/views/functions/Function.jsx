import React, {
  useEffect,
  useState,
} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchBotFunctionAction,
} from '../../actions/botFunction';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const triviaSuccessFailAmounts = (
  functionTips,
) => {
  const totalFailed = _.filter(functionTips, (o) => o.triviaanswer.correct === false);
  const totalSuccess = _.filter(functionTips, (o) => o.triviaanswer.correct === true);

  return (
    <Grid
      container
      justifyContent="center"
      className="zindexOne text-center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="zindexOne"
        justifyContent="center"
      >
        <h2>Results</h2>
      </Grid>
      <Grid
        item
        xs={6}
        className="zindexOne"
        justifyContent="center"
      >
        <p>Failed</p>
        <p>
          {totalFailed.length}
          {' '}
          users
        </p>
        {totalFailed.map((item) => (
          <p>
            {
              item.user
              && item.user.username
              && `${item.user.username} (${item.user.user_id})`
            }
          </p>
        ))}
        {totalFailed.map((item) => (
          <p>
            {
              item.user
              && !item.user.username
              && `${item.user.firstname && item.user.firstname} ${item.user.lastname && item.user.lastname} (${item.user.user_id})`
            }
          </p>
        ))}
      </Grid>
      <Grid
        item
        xs={6}
        className="zindexOne"
        justifyContent="center"
      >
        <p>Success</p>
        <p>
          {totalSuccess.length}
          {' '}
          users
        </p>
        {totalSuccess.map((item) => (
          <p>
            {
              item.user
              && item.user.username
              && `${item.user.username} (${item.user.user_id})`
            }
          </p>
        ))}
        {totalSuccess.map((item) => (
          <p>
            {
              item.user
              && !item.user.username
              && `${item.user.firstname && item.user.firstname} ${item.user.lastname && item.user.lastname} (${item.user.user_id})`
            }
          </p>
        ))}
      </Grid>
    </Grid>
  )
}
const triviaQuestionAndAnswer = (
  trivia,
) => {
  const correctTriviaAnswer = _.filter(trivia.triviaquestion.triviaanswers, (o) => o.correct === true);
  return (
    <Grid
      container
      justifyContent="center"
      className="zindexOne text-center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="zindexOne"
        justifyContent="center"
      >
        <h2>Question</h2>
        <p>{trivia.triviaquestion.question}</p>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="zindexOne"
        justifyContent="center"
      >
        <h2>Correct answer</h2>
        <p>{correctTriviaAnswer[0].answer}</p>
      </Grid>
    </Grid>
  )
}

const reactDropSuccessFailAmounts = (
  functionTips,
) => {
  const totalFailed = _.filter(functionTips, (o) => o.status === 'failed');
  const totalWaiting = _.filter(functionTips, (o) => o.status === 'waiting');
  const totalSuccess = _.filter(functionTips, (o) => o.status === 'success');

  return (
    <Grid
      container
      justifyContent="center"
      className="zindexOne text-center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="zindexOne"
        justifyContent="center"
      >
        <h2>Results</h2>
      </Grid>
      <Grid
        item
        xs={4}
        className="zindexOne"
        justifyContent="center"
      >
        <p>Waiting</p>
        <p>
          {totalWaiting.length}
          {' '}
          users
        </p>
        {totalWaiting.map((item) => (
          <p>
            {
              item.user
              && item.user.username
              && `${item.user.username} (${item.user.user_id})`
            }
          </p>
        ))}
        {totalWaiting.map((item) => (
          <p>
            {
              item.user
              && !item.user.username
              && `${item.user.firstname && item.user.firstname} ${item.user.lastname && item.user.lastname} (${item.user.user_id})`
            }
          </p>
        ))}
      </Grid>
      <Grid
        item
        xs={4}
        className="zindexOne"
        justifyContent="center"
      >
        <p>Failed</p>
        <p>
          {totalFailed.length}
          {' '}
          users
        </p>
        {totalFailed.map((item) => (
          <p>
            {
              item.user
              && item.user.username
              && `${item.user.username} (${item.user.user_id})`
            }
          </p>
        ))}
        {totalFailed.map((item) => (
          <p>
            {
              item.user
              && !item.user.username
              && `${item.user.firstname && item.user.firstname} ${item.user.lastname && item.user.lastname} (${item.user.user_id})`
            }
          </p>
        ))}
      </Grid>
      <Grid
        item
        xs={4}
        className="zindexOne"
        justifyContent="center"
      >
        <p>Success</p>
        <p>
          {totalSuccess.length}
          {' '}
          users
        </p>
        {totalSuccess.map((item) => (
          <p>
            {
              item.user
              && item.user.username
              && `${item.user.username} (${item.user.user_id})`
            }
          </p>
        ))}
        {totalSuccess.map((item) => (
          <p>
            {
              item.user
              && !item.user.username
              && `${item.user.firstname && item.user.firstname} ${item.user.lastname && item.user.lastname} (${item.user.user_id})`
            }
          </p>
        ))}
      </Grid>
    </Grid>
  )
}

const FunctionView = function (props) {
  const {
    auth,
    botFunction,
    functionName,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [functionTips, setFunctionTips] = useState([]);
  const { functionId } = useParams();

  useEffect(() => {
    setFunctionTips([])
    if (
      auth.authenticated
      && functionId
    ) {
      dispatch(fetchBotFunctionAction(functionName, functionId));
    }
  }, [
    auth,
    functionId,
  ]);

  useEffect(() => {
    if (functionName === 'rain') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.raintips
        && botFunction.data.raintips,
      );
    }
    if (functionName === 'flood') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.floodtips
        && botFunction.data.floodtips,
      );
    }
    if (functionName === 'hurricane') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.hurricanetips
        && botFunction.data.hurricanetips,
      );
    }
    if (functionName === 'reactdrop') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.reactdroptips
        && botFunction.data.reactdroptips,
      );
    }
    if (functionName === 'sleet') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.sleettips
        && botFunction.data.sleettips,
      );
    }
    if (functionName === 'soak') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.soaktips
        && botFunction.data.soaktips,
      );
    }
    if (functionName === 'thunder') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.thundertips
        && botFunction.data.thundertips,
      );
    }
    if (functionName === 'thunderstorm') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.thunderstormtips
        && botFunction.data.thunderstormtips,
      );
    }
    if (functionName === 'tip') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.tiptips
        && botFunction.data.tiptips,
      );
    }
    if (functionName === 'voicerain') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.voiceraintips
        && botFunction.data.voiceraintips,
      );
    }
    if (functionName === 'trivia') {
      setFunctionTips(
        botFunction
        && botFunction.data
        && botFunction.data.triviatips
        && botFunction.data.triviatips,
      );
    }
  }, [
    botFunction,
  ]);

  useEffect(() => {
    console.log('functionTips');
    console.log(functionTips);
  }, [
    functionTips,
  ]);

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
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {capitalizeFirstLetter(functionName)}
            {' '}
            Id:
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.id
              && botFunction.data.id
            }
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            username
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.user
              && botFunction.data.user.username
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            firstname
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.user
              && botFunction.data.user.firstname
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            lastname
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.user
              && botFunction.data.user.lastname
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={3}
          sm={3}
          md={3}
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
            userId
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.user
              && botFunction.data.user.user_id
            }
          </Typography>
        </Grid>

      </Grid>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={4}
          sm={4}
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
            Amount
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.amount / 1e8
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          sm={4}
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
            feeAmount
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.feeAmount / 1e8
            }
          </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          sm={4}
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
            userCount
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            {
              botFunction
              && botFunction.data
              && botFunction.data.userCount
            }
          </Typography>
        </Grid>

      </Grid>
      <Grid
        container
        justifyContent="center"
        className="zindexOne text-center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="zindexOne"
          justifyContent="center"
        >
          <h2>Group and/or Channel</h2>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="zindexOne"
          justifyContent="center"
        >
          <p>Group</p>
          <p>
            {botFunction.data && botFunction.data.group && botFunction.data.group.groupName}
            {' '}
            (
            {botFunction.data && botFunction.data.group && botFunction.data.group.groupId}
            )
          </p>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="zindexOne"
          justifyContent="center"
        >
          <p>Channel</p>
          <p>
            {botFunction.data && botFunction.data.channel && botFunction.data.channel.channelId}
            {' '}
            (
            {botFunction.data && botFunction.data.channel ? botFunction.data.channel.channelId : 'n/a'}
            )
          </p>
        </Grid>
      </Grid>
      {
        functionName === 'reactdrop'
        && botFunction.data
        && (
          <Grid
            container
            justifyContent="center"
            className="zindexOne text-center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="zindexOne"
              justifyContent="center"
            >
              <h2>Status</h2>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className="zindexOne"
              justifyContent="center"
            >
              <p>Ends on</p>
              <p>
                {botFunction.data && botFunction.data.ends && botFunction.data.ends}
              </p>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className="zindexOne"
              justifyContent="center"
            >
              <p>state</p>
              <p>
                {botFunction.data && botFunction.data.ended ? 'done' : 'running'}
              </p>
            </Grid>
          </Grid>
        )
      }
      {
        functionName === 'reactdrop'
        && botFunction.data
        && (
          <Grid
            container
            justifyContent="center"
            className="zindexOne text-center"
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className="zindexOne"
              justifyContent="center"
            >
              <h2>Emoji used</h2>
              <p
                style={{
                  fontSize: '48px',
                }}
              >
                {botFunction.data && botFunction.data.emoji && botFunction.data.emoji}
              </p>
            </Grid>
          </Grid>
        )
      }
      {
        functionName === 'reactdrop'
        && botFunction.data
        && functionTips
        && functionTips.length > 0
        && reactDropSuccessFailAmounts(functionTips)
      }
      {
        functionName === 'trivia'
        && botFunction.data
        && functionTips
        && functionTips.length > 0
        && triviaQuestionAndAnswer(botFunction.data)
      }
      {
        functionName === 'trivia'
        && botFunction.data
        && functionTips
        && functionTips.length > 0
        && triviaSuccessFailAmounts(functionTips)
      }
      <Grid
        container
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="zindexOne"
          justifyContent="center"
        >
          <h2 className="text-center">Users Received</h2>
        </Grid>
      </Grid>
      {
        functionTips
        && functionTips.length > 0
        && functionTips.map((row, index) => (
          <Grid
            container
            justifyContent="center"
            className="zindexOne text-center"
          >
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className="zindexOne"
              justifyContent="center"
            >
              <p>id</p>
              <p>{row.id}</p>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className="zindexOne"
              justifyContent="center"
            >
              <p>user</p>
              <Button
                onClick={() => navigate(`/management/user/${row.user && row.user.id}`)}
              >
                {row.user && row.user.username}
                {row.user && !row.user.username && row.user.firstname && `${row.user.firstname} `}
                {row.user && !row.user.username && row.user.lastname && row.user.lastname}
                {' '}
                (
                {row.user && row.user.user_id}
                )
              </Button>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className="zindexOne"
              justifyContent="center"
            >
              <p>amount</p>
              <p>
                {row.amount / 1e8}
              </p>
            </Grid>
          </Grid>
        ))
      }

    </div>
  );
}

FunctionView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  botFunction: state.botFunction,
})

export default withRouter(connect(mapStateToProps, null)(FunctionView));
