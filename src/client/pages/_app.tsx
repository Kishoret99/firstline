import { initializeStore, useStore } from '../shared/store';
import theme from '../shared/theme';
import '../styles/global.css';
import {
  MuiThemeProvider,
  StylesProvider,
  ThemeProvider,
  withStyles,
} from '@material-ui/core';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Head>
        <title>nestui</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
};

// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  // //initialise redux store on server side
  // const reduxStore = initializeStore(appContext);
  // // const { dispatch } = reduxStore;

  // appProps.pageProps = {
  //   ...appProps.pageProps,
  //   initialReduxState: reduxStore.getState(),
  // };

  return appProps;
};

export default MyApp;
