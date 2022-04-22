import React, {
  useState,
  useEffect,
} from 'react';
import {
  Button,
  Grid,
  Badge,
} from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ThemeToggle from '../components/ThemeToggle';

function Footer(props) {
  const {
    i18n,
    loading,
  } = props;
  const LANGUAGE_KEY = 'language';
  const [language, setLanguage] = useState('');
  const [anchorElLang, setAnchorElLang] = useState(null);

  const changeLanguage = (lng) => {
    i18n.activate(lng);
    localStorage.setItem(LANGUAGE_KEY, lng);
    setLanguage(lng);
  };

  useEffect(() => {
    const persistedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (persistedLanguage === 'null') {
      changeLanguage('en');
    }
    if (!persistedLanguage) {
      changeLanguage('en');
    }
    if (language !== persistedLanguage && persistedLanguage !== 'null') {
      changeLanguage(persistedLanguage);
    }
  }, []);

  useEffect(() => { }, [language]);

  const countryCode = (country) => {
    if (country === 'en') {
      return 'us';
    }
    if (country === 'nl') {
      return 'nl';
    }
    if (country === 'fr') {
      return 'fr';
    }
    return 'us';
  }

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
          style={{
            marginBottom: 'auto',
          }}
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
                <ReactCountryFlag countryCode={countryCode(language)} svg />
                {' '}
                {`${language}`}
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
              onClick={() => {
                handleCloseLangMenu();
                changeLanguage('en');
              }}
            >
              <div>
                <ReactCountryFlag countryCode="us" svg />
                {' '}
                en
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseLangMenu();
                changeLanguage('fr')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="fr" svg />
                {' '}
                fr
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseLangMenu();
                changeLanguage('nl')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="nl" svg />
                {' '}
                nl
              </div>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
