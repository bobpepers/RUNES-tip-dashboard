import React, {
  useEffect,
  useState,
} from 'react';
import {
  Grid,
  FormControl,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const ActivityFilter = function (props) {
  const {
    id,
    setId,
    spender,
    setSpender,
    earner,
    setEarner,
    type,
    setType,
    amount,
    setAmount,
  } = props;

  const classes = useStyles();

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

  return (
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
            name="spender"
            value={spender}
            label="spender"
            variant="filled"
            onChange={handleChangeSpender}
          />
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="earner"
            value={earner}
            label="earner"
            variant="filled"
            onChange={handleChangeEarner}
          />
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="type"
            value={type}
            label="type"
            variant="filled"
            onChange={handleChangeType}
          />
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="amount"
            value={amount}
            label="amount"
            variant="filled"
            onChange={handleChangeAmount}
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ActivityFilter;
