import '../styles/app.scss';

import { ThemeProvider } from '@material-ui/core/styles';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import { LinearLoadingTop } from '../components/elements/ui/LinearLoadingTop';
import { RouterEventsWatcher } from '../components/elements/ui/RouterEvents';
import { NextSEOApp } from '../components/seo/NextSEOApp';
import { MUITheme } from '../constants/UI/Theme.constant';
import { GAnalyticsHelper } from '../helpers/GAnalyticsHelper';
import { PWAHelper } from '../helpers/PWAHelper';
import { store } from '../store/reducers/store';

class MyApp extends App {
  public componentDidMount() {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      GAnalyticsHelper.initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    GAnalyticsHelper.logPageView();

    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt triggered");

      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      PWAHelper.deferredPrompt = e;
    });
  }

  public static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    // Anything returned here can be accessed by the client

    return { pageProps };
  }

  public render() {
    // pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    // @ts-ignore
    const { Component, pageProps, store: initialStore } = this.props;

    return (
      <Provider store={initialStore}>
        <NextSEOApp />
        <RouterEventsWatcher />
        <ThemeProvider theme={MUITheme}>
          <LinearLoadingTop />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }
}

// makeStore function that returns a new store for every request
const makeStore = () => store;

// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
