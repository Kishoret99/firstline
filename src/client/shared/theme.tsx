import { createTheme, withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import {
  Button,
  Grid,
  OutlinedInput,
  Typography,
  Link,
} from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;

export const AppTypography = withStyles({
  root: {
    fontFamily: 'inherit',
    fontWeight: 600,
    letterSpacing: '0px',
  },
})(Typography);

export const FormRowGridItem = withStyles({
  root: {
    width: '100%',
    maxWidth: '420px',
    '@media (max-width: 768px)': {
      width: '365px',
      marginRight: '15px',
    },
  },
})(Grid);

export const FullWidthGridItem = withStyles({
  root: {
    width: '100%',
  },
})(Grid);

export const AppDiv = ({ classes, children }) => {
  return <div className={classes.root}>{children}</div>;
};

export const AppForm = ({ classes, children, ...rest }) => {
  return (
    <form className={classes.root} {...rest}>
      {children}
    </form>
  );
};

export const FullWidthDiv = withStyles({
  root: {
    width: '100%',
  },
})(AppDiv);

export const ProfileFormGrid = withStyles({
  root: {
    width: '100%',
    '@media (min-width: 769px)': {
      position: 'relative',
      maxWidth: '214px',
    },
    '@media (max-width: 768px)': {
      marginBottom: '20px',
    },
  },
})(Grid);

export const ProfileInfoGrid = withStyles({
  root: {
    '@media (min-width: 769px)': {
      width: '100%',
      marginTop: '7%',
    },
  },
})(Grid);

export const ErrorText = withStyles({
  root: {
    fontSize: '13px',
    width: '100%',
    paddingLeft: '12px',
    color: 'red',
  },
})(AppTypography);

export const AppInput = withStyles({
  root: {
    height: '52px',
    width: '100%',
    fontFamily: 'inherit',
    fontWeight: 600,
    fontSize: '14px',
    borderRadius: '0px',
    backgroundColor: '#ffffff',
    minWidth: '0',
  },
})(OutlinedInput);

export const AppPassword = withStyles({
  root: {
    '& input::-ms-reveal, & input::-ms-clear': {
      display: 'none',
    },
  },
})(AppInput);

export const VeritcalSpace = withStyles({
  root: {
    height: '60px',
  },
})(Grid);

export const AppHeader = withStyles({
  root: {
    fontSize: '40px',
    color: theme.palette.secondary.dark,
    textAlign: 'left',
    textTransform: 'lowercase',
  },
})(AppTypography);

export const AppLabel = withStyles({
  root: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    paddingBottom: '5px',
  },
})(AppTypography);

export const SmallLabel = withStyles({
  root: {
    fontWeight: 'normal',
  },
})(AppLabel);

export const AppProfileLabel = withStyles({
  root: {
    color: theme.palette.secondary.gray,
  },
})(AppLabel);

export const AppPrimaryButton = withStyles({
  root: {
    fontFamily: 'inherit',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    height: '52px',
    color: '#fff',
    textTransform: 'lowercase',
    borderRadius: '0px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
})(Button);

export const LinkText = withStyles({
  root: {
    fontFamily: 'inherit',
    fontSize: '14px',
    color: '#403e3e',
    fontWeight: 700,
    textTransform: 'lowercase',
  },
})(Link);

export const ContentWrapper = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 300px)',
  },
})(Grid);

export const CenteredContent = withStyles({
  root: {
    alignItems: 'center',
  },
})(ContentWrapper);

export const AppPoppinsTypography = withStyles({
  root: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    letterSpacing: '0px',
  },
})(Typography);

export const MobileView = withStyles({
  root: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
})(AppDiv);

export const DesktopView = withStyles({
  root: {
    display: 'none',
    '@media (min-width: 769px)': {
      display: 'block',
    },
  },
})(AppDiv);
