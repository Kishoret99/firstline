import * as Yup from 'yup';
import API from '../shared/api';
import theme, {
  AppForm,
  AppHeader,
  AppInput,
  AppLabel,
  AppPassword,
  AppPrimaryButton,
  AppTypography,
  ErrorText,
  FormRowGridItem,
  LinkText,
  SmallLabel,
  VeritcalSpace,
} from '../shared/theme';
import { Button, darken, Grid, Link, withStyles } from '@material-ui/core';
import { Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ForgotPwdLink = withStyles({
  root: {
    height: '19px',
    fontFamily: 'inherit',
    fontSize: '14px',
    color: '#403e3e',
    textTransform: 'lowercase',
  },
})(Link);

export const SocialButton = withStyles({
  root: {
    width: '100%',
    height: '52px',
    color: '#fff',
    textTransform: 'lowercase',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '0px',
    '@media (max-width: 768px)': {
      width: '354px',
    },
  },
})(Button);

export const LinkedIn = withStyles({
  root: {
    background: '#0077b5',
    '&:hover': {
      backgroundColor: darken('#0077B5', 0.2),
    },
    '@media (max-width: 768px)': {
      width: '172px',
    },
  },
})(SocialButton);

export const Google = withStyles({
  root: {
    background: '#de4b39',
    '&:hover': {
      backgroundColor: darken('#DE4B39', 0.2),
    },
    '@media (max-width: 768px)': {
      width: '172px',
      marginRight: '15px',
    },
  },
})(SocialButton);

export const Span = withStyles({
  root: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    fontWeight: 'normal',
    textAlign: 'center',
    minWidth: '0',
  },
})(AppTypography);

export const GridWrapper = withStyles({
  root: {
    top: '72px',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      marginLeft: '1px',
      marginRight: '5px',
    },
  },
})(Grid);

export const LoginForm = withStyles({
  root: {},
})(AppForm);

export const LoginGrid = withStyles({
  root: {},
})(Grid);

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login(props) {
  const dispatch = useDispatch();
  const hospitalName = useSelector(
    (state: any) => state.hospitalName || props._hospitalName,
  );
  useEffect(() => {
    dispatch({
      type: 'UPDATE_HOSPITAL_NAME',
      payload: props._hospitalName,
    });
  }, [props._hospitalName]);
  const ref = useRef(null);

  const handleLoginWithEmailPassword = async (values) => {
    console.log(values);
    try {
      let url = `/api/job/share/${props.jobId}`;
      const res = await API.Post(url, values);
      if (res.status === 200) {
      }
    } catch (e) {}
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={{
        email: 'kishore2',
        password: '',
      }}
      onSubmit={(values) => {
        handleLoginWithEmailPassword(values);
      }}
      validationSchema={schema}
      validateOnBlur={true}
    >
      {(formik) => (
        <GridWrapper
          container
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <VeritcalSpace />
          <Grid item xs></Grid>
          <Grid item xs></Grid>
          <Grid item xs></Grid>
          <Grid item xs></Grid>
          <Grid item>
            <AppHeader>welcome to {hospitalName}</AppHeader>
          </Grid>
          <Grid item xs></Grid>
          <FormRowGridItem>
            <Span>
              Login to App to view hyper-personalized job recommendations
            </Span>
          </FormRowGridItem>
          <Grid item xs></Grid>
          <FormRowGridItem item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <LinkedIn>Linkedin</LinkedIn>
              </Grid>
              <Grid item xs={6}>
                <Google>Google</Google>
              </Grid>
            </Grid>
          </FormRowGridItem>
          <FormRowGridItem item>
            <Grid item>
              <AppLabel>Email</AppLabel>
            </Grid>
            <Grid item container>
              <AppInput
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email || ''}
              />
              <ErrorText>
                <>{formik.touched.email && formik.errors.email}</>
              </ErrorText>
            </Grid>
          </FormRowGridItem>
          <FormRowGridItem item>
            <Grid item>
              <AppLabel>Password</AppLabel>
            </Grid>
            <Grid item container direction="column">
              <AppPassword
                name="password"
                type={'password'}
                value={formik.values.password || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              />
              <ErrorText>
                <>{formik.touched.password && formik.errors.password}</>
              </ErrorText>
            </Grid>
          </FormRowGridItem>

          <Grid item xs></Grid>

          <FormRowGridItem item container justifyContent="center">
            <AppPrimaryButton
              type="submit"
              onClick={(e: any) => formik.handleSubmit(e)}
            >
              log In
            </AppPrimaryButton>
          </FormRowGridItem>
          {/* {message && <Alert severity={severity}>{message}</Alert>} */}

          <Grid item xs></Grid>
          <ForgotPwdLink href="#" underline="always">
            Forgot your password?
          </ForgotPwdLink>
          <Grid item></Grid>
          <Grid item>
            <Grid container direction="row" alignItems="baseline">
              <SmallLabel>If you are not yet registered,&nbsp;</SmallLabel>
              <LinkText href="#" underline="always">
                Register Now!
              </LinkText>
            </Grid>
          </Grid>
          <Grid item xs></Grid>
        </GridWrapper>
      )}
    </Formik>
  );
}

Login.getInitialProps = async ({ req, query }) => {
  return query;
};
