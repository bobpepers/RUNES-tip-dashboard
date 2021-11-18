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
    fetchServerAction,
} from '../actions/servers';

// import Info from '../containers/Info';
// import * as actions from '../actions/auth';
//import TableAds from '../components/TableAds';

const headers = [
    'db ID',
    'discord ID',
    'Server name',
    'last active',
];

const headCells = [
    {
        id: 'buyer', numeric: false, disablePadding: true, label: 'Buyer',
    },
    {
        id: 'country', numeric: true, disablePadding: false, label: 'Country',
    },
    {
        id: 'paymentMethod', numeric: true, disablePadding: false, label: 'Payment Method',
    },
    {
        id: 'price', numeric: true, disablePadding: false, label: 'Price / RUNES',
    },
    {
        id: 'currency', numeric: true, disablePadding: false, label: 'Currency',
    },
    // {
    //  id: 'actual', numeric: true, disablePadding: false, label: 'Over/Under Price %',
    // },
    {
        id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
    },
    {
        id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
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

const ServersView = (props) => {
    const {
        servers,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [id, setId] = useState('');
    const [groupId, setGroupId] = useState('');
    const [serverName, setServerName] = useState('');
    const [platform, setPlatform] = useState('All');


    useEffect(() => dispatch(fetchServerAction(id, groupId, serverName, platform)), [dispatch]);
    useEffect(() => dispatch(fetchServerAction(id, groupId, serverName, platform)), [
        id,
        groupId,
        serverName,
        platform,
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

    useEffect(() => {
        console.log(servers);
    }, [servers]);

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
                                onChange={handleChangeId} />
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
                                onChange={handleChangegroupId} />
                        </FormControl>
                    </Grid>

                    <Grid container item xs={12} md={3}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="serverName"
                                value={serverName}
                                label="server name"
                                variant="filled"
                                onChange={handleChangeServerName} />
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
                                <p>Loop results here</p>
                            )
                    }

                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    servers: state.servers,
})

export default withRouter(connect(mapStateToProps, null)(ServersView));