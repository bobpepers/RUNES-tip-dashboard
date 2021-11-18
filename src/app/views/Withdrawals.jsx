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
    fetchWithdrawalsAction,
} from '../actions/withdrawals';
import WithdrawalsTable from '../components/WithdrawalsTable';

const headCells = [
    {
        id: 'dbId', numeric: false, disablePadding: true, label: 'id',
    },
    {
        id: 'userId', numeric: true, disablePadding: false, label: 'userId',
    },
    {
        id: 'username', numeric: true, disablePadding: false, label: 'username',
    },
    {
        id: 'to', numeric: true, disablePadding: false, label: 'to',
    },
    {
        id: 'txId', numeric: true, disablePadding: false, label: 'tx id',
    },
    {
        id: 'amount', numeric: true, disablePadding: false, label: 'amount',
    },
    {
        id: 'confirmations', numeric: true, disablePadding: false, label: 'confirmations',
    },
    {
        id: 'phase', numeric: true, disablePadding: false, label: 'phase',
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

const WithdrawalsView = (props) => {
    const {
        withdrawals,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [id, setId] = useState('');
    const [txId, setTxId] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => dispatch(fetchWithdrawalsAction(id, txId, userId, username, to)), [dispatch]);
    useEffect(() => dispatch(fetchWithdrawalsAction(id, txId, userId, username, to)), [
        id,
        txId,
        userId,
        username,
        to,
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
    const handleChangeTo = (event) => {
        setTo(event.target.value);
    };

    useEffect(() => {
        console.log(withdrawals);
    }, [withdrawals]);

    return (
        <div className="height100 content">
            <Grid container>
                <Grid item xs={12}>
                    <h3>Withdrawals</h3>
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
                                name="to"
                                value={to}
                                label="to"
                                variant="filled"
                                onChange={handleChangeTo} />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        withdrawals && withdrawals.isFetching
                            ? (<CircularProgress />)
                            : (
                                <WithdrawalsTable
                                    defaultPageSize={25}
                                    headCells={headCells || []}
                                    withdrawals={withdrawals
                                        && withdrawals.data
                                        ? withdrawals.data
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
    withdrawals: state.withdrawals,
})

export default withRouter(connect(mapStateToProps, null)(WithdrawalsView));