import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import {
  Button,
  MenuItem,
  Menu,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Trans } from '@lingui/macro'
import { ReactComponent as MobileNav } from '../assets/images/mobilenav.svg';

const Header = function (props) {
  const {
    t,
    i18n,
    authenticated,
    user,
  } = props;
  const heightRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [height, setHeight] = useState(0);
  const [anchorElManagement, setAnchorElManagement] = useState(null);
  const openManagement = Boolean(anchorElManagement);
  const [anchorElFunctions, setAnchorElFunctions] = useState(null);
  const openFunctions = Boolean(anchorElFunctions);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleWindowResize = useCallback((event) => {
    if (height !== heightRef.current.clientHeight) {
      setHeight(heightRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
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
    // handleMobileMenuClose();
  };

  const show = (menu) ? 'show' : '';

  return (
    <header className="rootRow header" style={{ height }}>
      <Navbar
        ref={heightRef}
        fixed="top"
        className="navbar navbar-default"
        expand="lg"
      >
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <MobileNav
            className="mobileNav"
          />
        </button>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`collapse navbar-collapse ${show}`}
        >
          <Nav className="mr-auto rNavbar">
            <Button
              component={Link}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
              }}
              size="large"
              to="/"
              aria-controls="basic-menu"
              aria-haspopup="true"
            >
              <Trans>Dashboard</Trans>
            </Button>
            {/*
            <Link
              className="nav-link"
              to="/activity"
            >
              Activity
            </Link>
            */}

            <Button
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={openManagement ? 'true' : undefined}
              onClick={handleClickManagement}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
              }}
            >
              <Trans>Management</Trans>
            </Button>
            <Menu
              anchorEl={anchorElManagement}
              open={openManagement}
              onClose={handleCloseManagement}
              MenuListProps={{
                //  'aria-labelledby': 'basic-button',
              }}
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
                marginRight: '10px',
              }}
            >
              Functions
            </Button>
            <Menu
              anchorEl={anchorElFunctions}
              open={openFunctions}
              onClose={handleCloseFunctions}
              MenuListProps={{
                //  'aria-labelledby': 'basic-button',
              }}
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
          </Nav>
          <ul>
            <li>
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
                  authenticated
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

            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Header);
