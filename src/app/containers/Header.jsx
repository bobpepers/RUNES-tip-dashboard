import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  connect,
} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  MenuItem,
  Menu,
  useMediaQuery,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MobileNav from '../assets/images/mobilenav.svg';

function Header(
  props,
) {
  const {
    authenticated,
    user,
  } = props;
  const heightRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mainMenuHeight, setMainMenuHeight] = useState(0);
  const [anchorElManagement, setAnchorElManagement] = useState(null);
  const openManagement = Boolean(anchorElManagement);
  const [anchorElFunctions, setAnchorElFunctions] = useState(null);
  const openFunctions = Boolean(anchorElFunctions);
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {}, []);
  useEffect(() => {}, [
    user,
    authenticated,
  ]);

  useEffect(() => {
    setMainMenuHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleClickManagement = (event) => {
    setAnchorElManagement(event.currentTarget);
  };
  const handleCloseManagement = () => {
    setAnchorElManagement(null);
  };

  const handleClickFunctions = (event) => {
    setAnchorElFunctions(event.currentTarget);
  };
  const handleCloseFunctions = () => {
    setAnchorElFunctions(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const mainMenuItems = () => (
    <>
      <Button
        component={Link}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
          marginTop: mdDown ? '0.5rem' : '0px',
        }}
        size="large"
        to="/"
        aria-controls="basic-menu"
        aria-haspopup="true"
      >
        <Trans>Dashboard</Trans>
      </Button>
      <Button
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openManagement ? 'true' : undefined}
        onClick={handleClickManagement}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
          marginTop: mdDown ? '0.5rem' : '0px',
        }}
      >
        <Trans>Management</Trans>
      </Button>
      <Menu
        anchorEl={anchorElManagement}
        open={openManagement}
        onClose={handleCloseManagement}
      >
        <Link
          className="nav-link"
          to="/management/bot/settings"
        >
          <MenuItem onClick={handleCloseManagement}>
            Bot Settings
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/features"
        >
          <MenuItem onClick={handleCloseManagement}>
            Feature Settings
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/coins"
        >
          <MenuItem onClick={handleCloseManagement}>
            Coins
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/servers"
        >
          <MenuItem onClick={handleCloseManagement}>
            Servers
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/channels"
        >
          <MenuItem onClick={handleCloseManagement}>
            Channels
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/users"
        >
          <MenuItem onClick={handleCloseManagement}>
            Users
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/trivia"
        >
          <MenuItem onClick={handleCloseManagement}>
            Trivia
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/pricecurrencies"
        >
          <MenuItem onClick={handleCloseManagement}>
            Price Currencies
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/dashboardusers"
        >
          <MenuItem onClick={handleCloseManagement}>
            DashboardUsers
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/management/withdrawaladdresses"
        >
          <MenuItem onClick={handleCloseManagement}>
            WithdrawalAddresses
          </MenuItem>
        </Link>
      </Menu>

      <Button
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openFunctions ? 'true' : undefined}
        onClick={handleClickFunctions}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
          marginTop: mdDown ? '0.5rem' : '0px',
        }}
      >
        Functions
      </Button>
      <Menu
        anchorEl={anchorElFunctions}
        open={openFunctions}
        onClose={handleCloseFunctions}
      >
        <Link
          className="nav-link"
          to="/functions/deposits"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Deposits
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/withdrawals"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Withdrawals
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/errors"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Errors
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/tips"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Tips
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/rains"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Rains
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/soaks"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Soaks
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/floods"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Floods
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/sleets"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Sleets
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/voicerains"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Voicerains
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/thunders"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Thunders
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/thunderstorms"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Thunderstorms
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/hurricanes"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Hurricanes
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/reactdrops"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Reactdrops
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/functions/trivias"
        >
          <MenuItem onClick={handleCloseFunctions}>
            Trivias
          </MenuItem>
        </Link>
      </Menu>
    </>
  );

  const secondaryMenuItems = () => (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <div
        style={{
          display: 'block',
          float: 'right',
        }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="primary-search-account-menu"
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {
            authenticated.authenticated
              ? (
                <div>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/settings"
                    >
                      settings
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/logout"
                    >
                      logout
                    </Link>
                  </MenuItem>
                </div>
              )
              : (
                <div>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/login"
                    >
                      login
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/register"
                    >
                      register
                    </Link>
                  </MenuItem>
                </div>
              )

          }
        </Menu>
      </div>
    </Box>
  );

  return (
    <div
      className="header initHeaderHeight"
      style={{
        height: mainMenuHeight,
      }}
    >
      <AppBar
        position="relative"
        className="navbar"
        sx={{
          width: '100%',
        }}
      >
        <Toolbar
          disableGutters
          variant="dense"
          ref={heightRef}
          sx={{
            width: '100%',
            paddingBottom: '0.5rem',
            paddingTop: '0.5rem',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              flexDirection: 'column',
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: 'row',
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="Mobile Navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleMenu}
                className="navbar-toggler"
                sx={{
                  padding: 0,
                }}
              >
                <MobileNav
                  className="mobileNav"
                />
              </IconButton>
              {secondaryMenuItems()}
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                flexDirection: 'column',
                alignSelf: 'flex-start',
                display: {
                  xs: menu ? 'flex' : 'none',
                  md: 'none',
                },
              }}
            >
              {mainMenuItems()}
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            {mainMenuItems()}
            {secondaryMenuItems()}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.number,
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth,
    user: state.user.data,
  };
}

export default connect(mapStateToProps, null)(Header);
