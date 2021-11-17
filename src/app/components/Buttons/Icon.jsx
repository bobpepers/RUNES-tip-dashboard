/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Button,
} from '@mui/material';
import { classNames } from '../../utils/class-names'

export const IconButton = ({
  label,
  children,
  small,
  ...props
}) => (
  <Button
    className={classNames(
      'px-3 rounded-md bg-blue-500 text-white',
      small ? 'py-1' : 'py-2',
    )}
    {...props}
  >
    <span className="sr-only">{label}</span>
    {children}
  </Button>
)
