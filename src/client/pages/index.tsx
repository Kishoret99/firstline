import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles<Theme, any>((theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(12),
  },
  nameHeading: {
    color: ({ color, isOpen }) => (isOpen ? 'red' : color),
  },
}));

const Index = (props) => {
  const { name } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);
  const classes = useStyles({ ...props, isOpen: open });

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Super Secret Passwords</DialogTitle>
        <DialogContent>
          <DialogContentText>1-2-3-4-5</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" gutterBottom className={classes.nameHeading}>
        {name}
      </Typography>
      <img src="/static/logo.png" />
      <Typography gutterBottom>
        {/* <Link href="/next">Go to the next page</Link> */}
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Super Secret Password
      </Button>
    </div>
  );
};

Index.getInitialProps = async ({ req, query }) => {
  return query;
};

export default Index;
