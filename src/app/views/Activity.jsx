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
    fetchActivityAction,
} from '../actions/activity';
import ActivityContainer from '../containers/Activity';

const headCells = [
    {
        id: 'dbId', numeric: false, disablePadding: true, label: 'id',
    },
    {
        id: 'userId', numeric: true, disablePadding: false, label: 'userId',
    },
    {
        id: 'from', numeric: true, disablePadding: false, label: 'from',
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

const ActivityView = (props) => {
    const {
        activity,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [id, setId] = useState('');
    const [spender, setSpender] = useState('');
    const [earner, setEarner] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => dispatch(fetchActivityAction(id, spender, earner, type, amount)), [dispatch]);
    useEffect(() => dispatch(fetchActivityAction(id, spender, earner, type, amount)), [
        id,
        spender,
        earner,
        type,
        amount,
    ]);

    const handleChangeId = (event) => {
        console.log(event);
        setId(event.target.value);
    };

    const handleChangeSpender = (event) => {
        setSpender(event.target.value);
    };

    const handleChangeEarner = (event) => {
        setEarner(event.target.value);
    };
    const handleChangeType = (event) => {
        setType(event.target.value);
    };
    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    };

    useEffect(() => {
        console.log(activity);
    }, [activity]);

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
                                name="spender"
                                value={spender}
                                label="spender"
                                variant="filled"
                                onChange={handleChangeSpender} />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} md={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="earner"
                                value={earner}
                                label="earner"
                                variant="filled"
                                onChange={handleChangeEarner} />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} md={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="type"
                                value={type}
                                label="type"
                                variant="filled"
                                onChange={handleChangeType} />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12} md={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="amount"
                                value={amount}
                                label="amount"
                                variant="filled"
                                onChange={handleChangeAmount} />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        activity && activity.isFetching
                            ? (<CircularProgress />)
                            : (
                                <ActivityContainer
                                    activity={activity
                                        && activity.data
                                        ? activity.data
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
    activity: state.activity,
})

export default withRouter(connect(mapStateToProps, null)(ActivityView));