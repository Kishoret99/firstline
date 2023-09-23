import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableModal({ open, zIndex, id, onClose }: any) {
  const [dialogZIndex, setDialogZIndex] = useState(1300);

  useEffect(() => {
    setDialogZIndex(zIndex);
  }, [zIndex]);

  const handleDialogClick = () => {
    console.log('hiiiiiiiiiii');
    // Increase the z-index when the dialog is clicked
    // setDialogZIndex(1400);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={true}
        // onClose={onClose}
        PaperComponent={PaperComponent}
        hideBackdrop={true}
        aria-labelledby="draggable-dialog-title"
        style={{ zIndex: dialogZIndex, pointerEvents: 'none' }}
        // onClick={handleDialogClick}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            {'Modal id ' + id}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus={false} color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button autoFocus={false} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
