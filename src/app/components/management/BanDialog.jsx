import React, {
  useState,
} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
  const {
    confirmBan,
    id,
    name,
    otherId,
  } = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Ban
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Ban
          {' '}
          {name}
          {' '}
          #
          {id}
          {' '}
          (
          {otherId}
          )
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please state reason for ban, this message will be show to user/channel/group
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="banMessage"
            label="Ban Message"
            type="text"
            multiline
            maxRows={4}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => confirmBan(id, message)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
