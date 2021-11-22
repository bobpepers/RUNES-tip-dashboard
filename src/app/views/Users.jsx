import React, {
    useEffect,
    useState,
    useLayoutEffect,
    // Fragment,
} from 'react';
import { withRouter } from '../hooks/withRouter';
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

import {
    fetchUsersAction,
    banUserAction,
} from '../actions/users';

// import Info from '../containers/Info';
// import * as actions from '../actions/auth';
import UsersTable from '../components/UsersTable';

const headCells = [
    {
        id: 'dbId', numeric: false, disablePadding: true, label: 'id',
    },
    {
        id: 'userId', numeric: true, disablePadding: false, label: 'user id',
    },
    {
        id: 'username', numeric: true, disablePadding: false, label: 'username',
    },
    {
        id: 'available', numeric: true, disablePadding: false, label: 'available',
    },
    {
        id: 'locked', numeric: true, disablePadding: false, label: 'locked',
    },
    {
        id: 'total', numeric: true, disablePadding: false, label: 'total',
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

const UsersView = (props) => {
    const {
        users,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [banned, setBanned] = useState('All');
    const [platform, setPlatform] = useState('All');
    const [userId, setUserId] = useState('');

    useEffect(() => dispatch(fetchUsersAction(id, userId, username, platform, banned)), [dispatch]);
    useEffect(() => dispatch(fetchUsersAction(id, userId, username, platform, banned)), [
        id,
        username,
        banned,
        platform,
        userId,
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
    const handleChangePlatform = (event) => {
        setPlatform(event.target.value);
    };
    const handleChangeUserId = (event) => {
        setUserId(event.target.value);
    };

    useEffect(() => { }, [users]);

    const banUser = (id, banMessage) => {
        console.log(banMessage);
        console.log('bannMessage');
        dispatch(banUserAction(id, banMessage))
    };

    return (
        <div className="height100 content">
            <Grid container>
                <Grid item xs={12}>
                    <h3>Users</h3>
                </Grid>
                <Grid container item xs={12}>
                    <Grid container item xs={12} md={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="id"
                                value={id}
                                label="id"
                                variant="filled"
                                onChange={handleChangeId} />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} md={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="userId"
                                value={userId}
                                label="user id"
                                variant="filled"
                                onChange={handleChangeUserId} />
                        </FormControl>
                    </Grid>

                    <Grid container item xs={12} md={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="username"
                                value={username}
                                label="username"
                                variant="filled"
                                onChange={handleChangeUsername} />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} md={6}>
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
                        users && users.isFetching
                            ? (<CircularProgress />)
                            : (
                                <UsersTable
                                    defaultPageSize={25}
                                    banUser={banUser}
                                    headCells={headCells || []}
                                    users={users
                                        && users.data
                                        ? users.data
                                        : []
                                    }
                                />
                            )
                    }

                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users,
})

export default withRouter(connect(mapStateToProps, null)(UsersView));