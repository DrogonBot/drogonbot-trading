import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

import { MUITheme as theme } from '../constants/UI/Theme.constant';

// As suggested on: https://stackoverflow.com/questions/55109497/how-to-integrate-nextjs-styled-components-with-material-ui

class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />)
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  public render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* InfoLinks Ads */}
          <script type="text/javascript">
            {" "}
            var infolinks_pid = 3258071; var infolinks_wsid = 0;{" "}
          </script>{" "}
          <script
            type="text/javascript"
            src="//resources.infolinks.com/js/infolinks_main.js"
          ></script>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          {/* PWA TAGS */}
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/images/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/images/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/images/icon/apple-icon.png" />
          <meta name="theme-color" content="#317EFB" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
