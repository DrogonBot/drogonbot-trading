import { DefaultSeo } from 'next-seo';

import { appEnv } from '../../constants/Env.constant';
import { AvailableLanguages } from '../../types/Global.types';

export const NextSEOApp = () => {
  switch (appEnv.language) {
    case AvailableLanguages.ptBr:
      return (
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "pt_BR",
            url: appEnv.appUrl,
            site_name: appEnv.appName
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image"
          }}
        />
      );
    case AvailableLanguages.eng:
      return null; // TODO: Configure SEO for this page in english
  }
};
