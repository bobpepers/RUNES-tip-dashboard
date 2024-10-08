import React, { useEffect } from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { leaveGroupAction } from '../../actions/leaveGroup';

const LeaveGroup = function (props) {
  const {
    id,
    groupId,
    groupName,
    leaveGroup,
  } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLeaveGroup = () => {
    dispatch(leaveGroupAction(
      id,
    ));
  };

  useEffect(() => {
    setOpen(false);
  }, [
    leaveGroup,
  ]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Leave Group
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to leave?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              Server:
              {' '}
              {groupName}
            </p>
            <p>
              Id:
              {' '}
              {groupId}
            </p>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>No</Button>
          <Button onClick={handleLeaveGroup}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    leaveGroup: state.leaveGroup.data,
  };
}

export default connect(mapStateToProps, null)(LeaveGroup);
