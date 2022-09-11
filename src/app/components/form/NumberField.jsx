import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import PropTypes from 'prop-types';

function NumberField({
  input,
  label,
  meta: {
    touched,
    error,
  },
  ...custom
}) {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-tfa">{label}</InputLabel>
      <OutlinedInput
        label={label}
        fullWidth
        id="outlined-adornment-tfa"
        inputProps={{ className: 'outlined-adornment-tfa' }}
        type="number"
        labelWidth={70}
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    </FormControl>
  )
}

NumberField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default NumberField;
