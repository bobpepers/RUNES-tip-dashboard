import React from 'react';
import {
  FormControl,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

function RenderTextField({
  input,
  type,
  meta: {
    touched,
    error,
  },
  label,
}) {
  return (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
      <FormControl
        variant="outlined"
        fullWidth
      >
        <TextField
          label={label}
          type={type}
          variant="outlined"
          inputProps={{ className: 'outlined-email-field' }}
          {...input}
        />
        {touched && error && <div className="form-error">{error}</div>}
      </FormControl>
    </div>
  )
}

RenderTextField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

RenderTextField.defaultProps = {
  type: 'text',
};

export default RenderTextField;
