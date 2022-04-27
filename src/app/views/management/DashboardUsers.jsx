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
  fetchDashboardUsersAction,
} from '../../actions/dashboardUsers';
import DashboardUsersTable from '../../components/management/DashboardUsersTable';

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

function DashboardUsersView(props) {
  const {
    auth,
    dashboardUsers,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [banned, setBanned] = useState('All');
  const [role, setRole] = useState('All');

  // useEffect(() => dispatch(fetchDashboardUsersAction(id, email, username, role, banned)), [auth]);
  useEffect(() => dispatch(fetchDashboardUsersAction(id, email, username, role, banned)), [
    id,
    username,
    banned,
    role,
    email,
    auth,
  ]);

  const handleChangeId = (event) => {
    console.log(event);
    setId(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeBanned = (event) => {
    setBanned(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    console.log(dashboardUsers);
  }, [dashboardUsers]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Dashboard Users</h3>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12} md={4}>
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

          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="username"
                value={username}
                label="username"
                variant="filled"
                onChange={handleChangeUsername}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="email"
                value={email}
                label="email"
                variant="filled"
                onChange={handleChangeEmail}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                onChange={handleChangeRole}
                label="Role"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value={8}>
                  SuperAdmin
                </MenuItem>
                <MenuItem value={4}>
                  Admin
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Banned</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={banned}
                onChange={handleChangeBanned}
                label="Banned"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="true">
                  True
                </MenuItem>
                <MenuItem value="false">
                  False
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {
            dashboardUsers && dashboardUsers.isFetching
              ? (<CircularProgress />)
              : (
                <DashboardUsersTable
                  defaultPageSize={25}
                  dashboardUsers={dashboardUsers
                    && dashboardUsers.data
                    ? dashboardUsers.data
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
  dashboardUsers: state.dashboardUsers,
})

export default withRouter(connect(mapStateToProps, null)(DashboardUsersView));
