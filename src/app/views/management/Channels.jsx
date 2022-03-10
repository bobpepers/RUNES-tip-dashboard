import React, {
  useEffect,
  useState,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  FormControl,
  CircularProgress,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { withRouter } from '../../hooks/withRouter';

import {
  fetchChannelsAction,
  banChannelAction,
} from '../../actions/channels';

import ChannelTable from '../../components/ChannelTable';

const headCells = [
  {
    id: 'dbId', numeric: false, disablePadding: true, label: 'id',
  },
  {
    id: 'server', numeric: true, disablePadding: false, label: 'server',
  },
  {
    id: 'channelId', numeric: true, disablePadding: false, label: 'channel id',
  },
  {
    id: 'channelName', numeric: true, disablePadding: false, label: 'channel name',
  },
  {
    id: 'lastActive', numeric: true, disablePadding: false, label: 'last active',
  },
  {
    id: 'banned', numeric: true, disablePadding: false, label: 'banned',
  },
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ChannelsView(props) {
  const {
    auth,
    channels,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [id, setId] = useState('');
  const [channelId, setchannelId] = useState('');
  const [channelName, setchannelName] = useState('');

  // useEffect(() => dispatch(fetchChannelsAction(id, channelId, channelName, 'all')), [auth]);
  useEffect(() => dispatch(fetchChannelsAction(id, channelId, channelName, 'all')), [
    id,
    channelId,
    channelName,
    auth,
  ]);

  const handleChangeId = (event) => {
    setId(event.target.value);
  };

  const handleChangechannelId = (event) => {
    setchannelId(event.target.value);
  };

  const handleChangechannelName = (event) => {
    setchannelName(event.target.value);
  };

  const banChannel = (id, banMessage) => {
    console.log(banMessage);
    console.log('bannMessage');
    dispatch(banChannelAction(id, banMessage))
  };

  useEffect(() => { }, [channels]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Channels</h3>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="id"
                value={id}
                label="id"
                variant="filled"
                onChange={handleChangeId}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="channelId"
                value={channelId}
                label="discord id"
                variant="filled"
                floatingLabelText="channelId"
                onChange={handleChangechannelId}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="channelName"
                value={channelName}
                label="server name"
                variant="filled"
                onChange={handleChangechannelName}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {
            channels && channels.isFetching
              ? (<CircularProgress />)
              : (
                <ChannelTable
                  defaultPageSize={25}
                  headCells={headCells || []}
                  banChannel={banChannel}
                  channels={channels
                    && channels.data
                    ? channels.data
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
  channels: state.channels,
})

export default withRouter(connect(mapStateToProps, null)(ChannelsView));
