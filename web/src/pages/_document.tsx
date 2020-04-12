import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  public render() {
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
