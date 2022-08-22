import React from 'react';
import {
  connect,
} from 'react-redux';
import { withStyles } from 'tss-react/mui';
import {
  Switch,
} from '@mui/material';
import {
  Brightness3,
  WbSunny,
} from '@mui/icons-material';
import { changeTheme } from '../actions';

const ThemeSwitch = withStyles(Switch, (_theme, _params, classes) => ({
  switchBase: {
    color: '#FE6B8B',
    [`&.${classes.checked}`]: {
      color: '#FE6B8B',
    },
    [`&.${classes.checked} + .${classes.track}`]: {
      backgroundColor: '#FE6B8B',
    },
  },
  checked: {},
  track: {},
}));

// tslint:disable:jsx-no-lambda
function ThemeToggle(props) {
  const {
    theme: {
      theme,
    },
    changeTheme,
  } = props;

  const handleChangeCurrentStyleMode = (value) => {
    changeTheme(value);
  };

  return (
    <div>
      <WbSunny />
      <ThemeSwitch
        checked={theme !== 'light'}
        onChange={(e) => handleChangeCurrentStyleMode(theme === 'light' ? 'dark' : 'light')}
      />
      <Brightness3 />
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
})

const mapDispatchToProps = (dispatch) => ({
  changeTheme: (payload) => dispatch(changeTheme(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
