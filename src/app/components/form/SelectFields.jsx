import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import PropTypes from 'prop-types';

function SelectField({
  input,
  label,
  meta: {
    touched,
    error,
  },
  children,
  ...custom
}) {
  return (
    <FormControl
      className="admin-form-field"
      style={{ width: '100%' }}
    >
      <InputLabel
        error={!!(touched && error)}
      >
        {label}
      </InputLabel>
      <Select
        style={{ width: '100%' }}
        label={label}
        error={!!(touched && error)}
        {...input}
        {...custom}
      >
        {children}
      </Select>
      {touched && error && <div className="form-error">{error}</div>}
    </FormControl>
  )
}

SelectField.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default SelectField;
