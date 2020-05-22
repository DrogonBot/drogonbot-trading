import '../styles/app.scss';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { ThemeProvider } from '@material-ui/core/styles';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { LinearLoadingTop } from '../components/elements/ui/LinearLoadingTop';
import { RouterEventsWatcher } from '../components/elements/ui/RouterEvents';
import { NextSEOApp } from '../components/seo/NextSEOApp';
import { MUITheme } from '../constants/UI/Theme.constant';
import { GAnalyticsHelper } from '../helpers/GAnalyticsHelper';
import { persistor, store } from '../store/reducers/store';

// React slick carousel
class MyApp extends App {
  public componentDidMount() {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      GAnalyticsHelper.initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    GAnalyticsHelper.logPageView();
  }

  public static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    // Anything returned here can be accessed by the client

    return { pageProps };
  }

  private _renderRootComponents(Component: JSX.Element) {
    return (
      <>
        <NextSEOApp />
        <RouterEventsWatcher />
        <ThemeProvider theme={MUITheme}>
          <LinearLoadingTop />

          {Component}
        </ThemeProvider>
      </>
    );
  }

  public render() {
    // pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    // @ts-ignore
    const { Component, pageProps, store: initialStore } = this.props;

    // Here we load redux persist only if we are in a browser! If not, we dont need to run it!
    return (
      <Provider store={initialStore}>
        {process.browser ? (
          <PersistGate loading={null} persistor={persistor}>
            {this._renderRootComponents(<Component {...pageProps} />)}
          </PersistGate>
        ) : (
          this._renderRootComponents(<Component {...pageProps} />)
        )}
      </Provider>
    );
  }
}

// makeStore function that returns a new store for every request
const makeStore = () => store;

// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
