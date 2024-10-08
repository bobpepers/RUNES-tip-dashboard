import React, { useEffect, useState } from 'react';
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
import { makeStyles } from 'tss-react/mui';
import { withRouter } from '../../hooks/withRouter';

import {
  fetchGroupsAction,
  banGroupAction,
} from '../../actions/groups';
import GroupTable from '../../components/management/GroupTable';

const useStyles = makeStyles()((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function GroupsView(props) {
  const {
    auth,
    groups,
  } = props;
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [id, setId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupName, setGroupName] = useState('');
  const [isBotInGroup, setIsBotInGroup] = useState(true); // Default value set to true
  const [platform, setPlatform] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => dispatch(
    fetchGroupsAction(
      id,
      groupId,
      groupName,
      platform,
      page * rowsPerPage,
      rowsPerPage,
      isBotInGroup, // Pass the boolean value
    ),
  ), [
    id,
    groupId,
    groupName,
    platform,
    auth,
    page,
    rowsPerPage,
    isBotInGroup, // Add this to the dependency array
  ]);

  const handleChangeId = (event) => {
    setId(event.target.value);
  };

  const handleChangeGroupId = (event) => {
    setGroupId(event.target.value);
  };

  const handleChangeGroupName = (event) => {
    setGroupName(event.target.value);
  };

  const handleChangePlatform = (event) => {
    setPlatform(event.target.value);
  };

  const handleChangeIsBotInGroup = (event) => {
    const { value } = event.target;
    setIsBotInGroup(value === 'all' ? undefined : value === 'true'); // Handle 'all' option
  };

  useEffect(() => { }, [groups]);

  const banGroup = (id, banMessage) => {
    dispatch(banGroupAction(id, banMessage));
  };

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Groups</h3>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12} md={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="platform-select-label">Platform</InputLabel>
              <Select
                labelId="platform-select-label"
                id="platform-select"
                value={platform}
                onChange={handleChangePlatform}
                label="Platform"
              >
                <MenuItem value="all"><em>All</em></MenuItem>
                <MenuItem value="telegram">Telegram</MenuItem>
                <MenuItem value="discord">Discord</MenuItem>
                <MenuItem value="matrix">Matrix</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
                onChange={handleChangeGroupId}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="groupName"
                value={groupName}
                label="group name"
                variant="filled"
                onChange={handleChangeGroupName}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="is-bot-in-group-select-label">Is Bot in Group</InputLabel>
              <Select
                labelId="is-bot-in-group-select-label"
                id="is-bot-in-group-select"
                value={isBotInGroup === undefined ? 'all' : isBotInGroup.toString()} // Convert boolean to string for Select
                onChange={handleChangeIsBotInGroup}
                label="Is Bot in Group"
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="all"><em>All</em></MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          {
            groups && groups.isFetching
              ? (<CircularProgress />)
              : (
                <GroupTable
                  defaultPageSize={25}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={groups && groups.count && groups.count}
                  banGroup={banGroup}
                  groups={groups && groups.data ? groups.data : []}
                />
              )
          }
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  groups: state.groups,
});

export default withRouter(connect(mapStateToProps, null)(GroupsView));
