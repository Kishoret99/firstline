import theme from '../shared/theme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

export const MyButton = withStyles({
  root: {
    backgroundColor: 'red',
  },
})(Button);

const Layout = withStyles({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  },
})(Grid);

export const MyButton2 = withStyles({
  root: {
    margin: '20px',
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
})(MyButton);

const Index = (props) => {
  const { name } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  return (
    <Layout>
      <Dialog open={open} onClose={handleClose} Paper>
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
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <img src="/static/logo.png" />
      <Typography gutterBottom>
        {/* <Link href="/next">Go to the next page</Link> */}
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Super Secret Password
      </Button>
      <MyButton2>World</MyButton2>
    </Layout>
  );
};

Index.getInitialProps = async ({ req, query }) => {
  return query;
};

export default Index;
