import React, {
  useEffect,
  useState,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
  TextField,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { withRouter } from '../../hooks/withRouter';

import {
  fetchServerAction,
  banServerAction,
} from '../../actions/servers';
import ServerTable from '../../components/management/ServerTable';

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

function ServersView(props) {
  const {
    auth,
    servers,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [id, setId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [serverName, setServerName] = useState('');
  const [platform, setPlatform] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => dispatch(
    fetchServerAction(
      id,
      groupId,
      serverName,
      platform,
      page * rowsPerPage,
      rowsPerPage,
    ),
  ), [
    id,
    groupId,
    serverName,
    platform,
    auth,
    page,
    rowsPerPage,
  ]);

  const handleChangeId = (event) => {
    console.log(event);
    setId(event.target.value);
  };

  const handleChangegroupId = (event) => {
    setGroupId(event.target.value);
  };

  const handleChangeServerName = (event) => {
    setServerName(event.target.value);
  };
  const handleChangePlatform = (event) => {
    setPlatform(event.target.value);
  };

  useEffect(() => { }, [servers]);

  const banServer = (id, banMessage) => {
    console.log(banMessage);
    console.log('bannMessage');
    dispatch(banServerAction(id, banMessage))
  };

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Servers</h3>
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
                name="groupId"
                value={groupId}
                label="discord id"
                variant="filled"
                floatingLabelText="groupId"
                onChange={handleChangegroupId}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="serverName"
                value={serverName}
                label="server name"
                variant="filled"
                onChange={handleChangeServerName}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Platform</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={platform}
                onChange={handleChangePlatform}
                label="Platform"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="telegram">
                  Telegram
                </MenuItem>
                <MenuItem value="discord">
                  Discord
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {
            servers && servers.isFetching
              ? (<CircularProgress />)
              : (
                <ServerTable
                  defaultPageSize={25}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={servers && servers.count && servers.count}
                  banServer={banServer}
                  servers={servers
                    && servers.data
                    ? servers.data
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
  servers: state.servers,
})

export default withRouter(connect(mapStateToProps, null)(ServersView));
