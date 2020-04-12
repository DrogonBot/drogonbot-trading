import { ThemeProvider } from '@material-ui/core/styles';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { NextSEOApp } from '../components/seo/NextSEOApp';
import { MUITheme } from '../constants/UI/Theme.constant';
import { persistor, store } from '../store/reducers/persist.store';

class MyApp extends App {
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
        <PersistGate loading={null} persistor={persistor}>
          <NextSEOApp />
          <ThemeProvider theme={MUITheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

// makeStore function that returns a new store for every request
const makeStore = () => store;

// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
