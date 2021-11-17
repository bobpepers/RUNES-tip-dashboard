import React from 'react';
import {
  connect,
} from 'react-redux';
// import makeStyles from '@mui/styles/makeStyles';
import {
  Grid,

  Badge,
  Button,
} from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { withTranslation } from 'react-i18next';
// import actions from 'redux-form/lib/actions';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ThemeToggle from '../components/ThemeToggle';

const Footer = (props) => {
  const {
    t,
    i18n,
    error,
    loading,
  } = props;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';
  const countryCode = (country) => {
    if (country === 'pt') {
      return 'br';
    }
    if (country === 'en') {
      return 'us';
    }
    if (country === 'nl') {
      return 'nl';
    }
  }

  const [anchorElLang, setAnchorElLang] = React.useState(null);

  const handleClickLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="infoBar footer">
      <Grid
        container
        // className="height100 d-flex justify-content-around justify-content-md-center Grid itemst-unstyled categories ng-scope"
        // ng-controller="myController"
        direction="row"
        justifyContent="center"
        alignItems="baseline"
      >
        <Grid
          item
          xs={6}
          sm={4}
          md={2}
          align="center"
          // alignItems="center"
          // direction="row"
        >
          <ThemeToggle />
        </Grid>
        <Grid
          item
          xs={6}
          sm={4}
          md={2}
          align="center"
          // alignItems="center"
          // direction="row"
        >
          <Button
                          // aria-controls="simple-menu"
                          // aria-haspopup="true"
            onClick={handleClickLangMenu}
            className="langPadding toggleLangWrapper"
            id="user-nav-dropdown"
            style={{ color: '#bdbdbd' }}
          >
            <Badge
              color="secondary"
            >
              <span>
                <ReactCountryFlag countryCode={countryCode(`${getCurrentLng()}`)} svg />
                {' '}
                {t(`${getCurrentLng()}`)}
              </span>
            </Badge>

            {' '}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorElLang}
            keepMounted
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
            className="langPadding toggleLangWrapper"
          >
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('en');
              }}
            >
              <div>
                <ReactCountryFlag countryCode="us" svg />
                {' '}
                {t('en')}
              </div>
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('pt')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="br" svg />
                {' '}
                {t('pt')}
              </div>
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('nl')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="nl" svg />
                {' '}
                {t('nl')}
              </div>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // errorMessage: state.auth.error,
})

export default connect(mapStateToProps)(withTranslation()(Footer));
