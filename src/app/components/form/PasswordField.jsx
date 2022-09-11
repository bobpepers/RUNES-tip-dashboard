import React from 'react';
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

function RenderPasswordField({
  input,
  meta: {
    touched,
    error,
  },
  handleClickShowPassword,
  mvalues,
  handleChange,
  handleMouseDownPassword,
  label,
}) {
  return (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
      <FormControl
        variant="outlined"
        fullWidth
      >
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          label={label}
          inputProps={{ className: 'outlined-adornment-password' }}
          type={mvalues.showPassword ? 'text' : 'password'}
          value={mvalues.password}
          onChange={handleChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {mvalues.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )}
          {...input}
        />
      </FormControl>
      {touched && error && <div className="form-error">{error}</div>}
    </div>
  )
}

RenderPasswordField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  mvalues: PropTypes.shape({
    showPassword: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
};

export default RenderPasswordField;
