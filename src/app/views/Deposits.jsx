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
    fetchDepositsAction,
} from '../actions/deposits';
import DepositsTable from '../components/DepositsTable';

const headCells = [
    {
        id: 'dbId', numeric: false, disablePadding: true, label: 'id',
    },
    {
        id: 'username', numeric: true, disablePadding: false, label: 'username',
    },
    {
        id: 'email', numeric: true, disablePadding: false, label: 'email',
    },
    {
        id: 'role', numeric: true, disablePadding: false, label: 'role',
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

const DepositsView = (props) => {
    const {
        deposits,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [id, setId] = useState('');
    const [txId, setTxId] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [from, setFrom] = useState('');

    useEffect(() => dispatch(fetchDepositsAction(id, txId, userId, username, from)), [dispatch]);
    useEffect(() => dispatch(fetchDepositsAction(id, txId, userId, username, from)), [
        id,
        txId,
        userId,
        username,
        from,
    ]);

    const handleChangeId = (event) => {
        console.log(event);
        setId(event.target.value);
    };

    const handleChangeTxId = (event) => {
        setTxId(event.target.value);
    };

    const handleChangeUserId = (event) => {
        setUserId(event.target.value);
    };
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleChangeFrom = (event) => {
        setFrom(event.target.value);
    };

    useEffect(() => {
        console.log(deposits);
    }, [deposits]);

    return (
        <div className="height100 content">
            <Grid container>
                <Grid item xs={12}>
                    <h3>Deposits</h3>
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
                                name="txId"
                                value={username}
                                label="tx id"
                                variant="filled"
                                onChange={handleChangeTxId} />
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
                    <Grid container item xs={12} md={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="from"
                                value={from}
                                label="from"
                                variant="filled"
                                onChange={handleChangeFrom} />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        deposits && deposits.isFetching
                            ? (<CircularProgress />)
                            : (
                                <DepositsTable
                                    defaultPageSize={25}
                                    headCells={headCells || []}
                                    deposits={deposits
                                        && deposits.data
                                        ? deposits.data
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
    deposits: state.deposits,
})

export default withRouter(connect(mapStateToProps, null)(DepositsView));