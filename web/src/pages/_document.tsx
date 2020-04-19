import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    const baseStyles = (
      <>
        <link
          crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/google/main/normalize.css" />
        <link rel="stylesheet" href="/css/google/main/main.css" />
        <link rel="stylesheet" href="/css/google/search/search.css" />
        <link rel="stylesheet" href="/css/animations.css" />
      </>
    );

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {baseStyles}
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
