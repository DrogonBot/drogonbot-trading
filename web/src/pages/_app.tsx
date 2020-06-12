import '../styles/animations.css';
import '../styles/index.css';
import '../styles/normalize.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { ThemeProvider } from '@material-ui/core/styles';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';

import { LinearLoadingTop } from '../components/elements/ui/LinearLoadingTop';
import { RouterEventsWatcher } from '../components/elements/ui/RouterEvents';
import { AppWrapper } from '../components/pages/AppWrapper';
import { NextSEOApp } from '../components/seo/NextSEOApp';
import { MUITheme } from '../constants/UI/Theme.constant';
import { GAnalyticsHelper } from '../helpers/GAnalyticsHelper';
import { store } from '../store/reducers/store';

class MyApp extends App {
  public componentDidMount() {
    // avoid cacheing application
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });

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

  private _renderRootComponent(Component: JSX.Element) {
    return (
      <>
        <AppWrapper>
          <NextSEOApp />
          <RouterEventsWatcher />
          <ThemeProvider theme={MUITheme}>
            <LinearLoadingTop />
            {Component}
          </ThemeProvider>
        </AppWrapper>
      </>
    );
  }

  public render() {
    // pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    // @ts-ignore
    const { Component, pageProps, store: initialStore } = this.props;

    // Here we load redux PersistGate only if we are in a browser! If not, we dont need to run it!
    return (
      <RootContainer suppressHydrationWarning={true}>
        <Provider store={initialStore}>
          {process.browser ? (
            <PersistGate loading={null} persistor={store.__PERSISTOR}>
              {this._renderRootComponent(<Component {...pageProps} />)}
            </PersistGate>
          ) : (
            this._renderRootComponent(<Component {...pageProps} />)
          )}
        </Provider>
      </RootContainer>
    );
  }
}

// makeStore function that returns a new store for every request
const makeStore = () => store;

// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);

const RootContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;
