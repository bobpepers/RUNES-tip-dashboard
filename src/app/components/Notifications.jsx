import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { withTranslation } from 'react-i18next';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

const Notifications = (props) => {
  const { trade } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(trade);
  });
  useEffect(() => {
    console.log(trade);
  }, [trade]);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });
  }

  const handleClose = (type, id) => {
    if (type === 'init') {
      navigate.push(`/trade/init/${id}`);
    }
    if (type === 'requested') {
      navigate.push(`/trade/requested/${id}`);
    }
    if (type === 'accepted') {
      navigate.push(`/trade/${id}`);
    }
    if (type === 'disputed') {
      navigate.push(`/trade/dispute/${id}`);
    }
    console.log(type);
    console.log(id);
    // this.setState({ anchorEl: event.currentTarget, open: false });
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickNotiMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotiMenu = (type, id) => {
    if (type === 'init') {
      navigate.push(`/trade/init/${id}`);
    }
    if (type === 'requested') {
      navigate.push(`/trade/requested/${id}`);
    }
    if (type === 'accepted') {
      navigate.push(`/trade/${id}`);
    }
    if (type === 'disputed') {
      navigate.push(`/trade/dispute/${id}`);
    }
    setAnchorEl(null);
  };

  return (
    <>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClickNotiMenu}
        className="langPadding toggleLangWrapper"
        id="user-nav-dropdown"
        style={{ color: '#bdbdbd' }}
      >
        <IconButton
          aria-label="show notifications"
          color="inherit"
          onClick={handleClick}
          style={{ padding: 0 }}
          size="large"
        >
          <Badge
            badgeContent={trade && trade.length && trade.length}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
          {' '}
          <ArrowDropDownIcon />

        </IconButton>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseNotiMenu}
        className="langPadding toggleLangWrapper"
      >
        {trade && trade.map((item) => (
          <MenuItem onClick={() => handleCloseNotiMenu(item.type, item.id)}>
            <div>
              Trade #
              {item.id}
              {' - '}
              {item.type}
            </div>
          </MenuItem>
        ))}

      </Menu>
    </>
  );
}

function mapStateToProps(state) {
  return {
    trade: state.trade.data,
  };
}

export default connect(mapStateToProps)(withTranslation()(Notifications));
