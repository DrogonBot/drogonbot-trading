import 'styles/global-styles';

import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  public render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
      <Html lang="en">
        <Head>
          <link
            crossOrigin="anonymous"
            href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/css/google/main/normalize.css" />
          <link rel="stylesheet" href="/css/google/main/main.css" />
          <link rel="stylesheet" href="/css/google/search/search.css" />
          <link rel="stylesheet" href="/css/animations.css" />
          {styleTags}
        </Head>
        <body>
          <div className="root">{main}</div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
