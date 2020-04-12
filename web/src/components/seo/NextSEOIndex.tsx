import { NextSeo } from 'next-seo';

import { appEnv } from '../../constants/Env.constant';
import { AvailableLanguages } from '../../types/Global.types';

export const NextSEOIndex = () => {
  switch (appEnv.language) {
    case AvailableLanguages.ptBr:
      const title =
        "Emprego Urgente | Vagas de emprego disponíveis em sua região";
      const description =
        "Procurando vagas? Aqui na Emprego Urgente você encontra milhares vagas disponíveis em todo Brasil! Cadastre seu currículo agora mesmo!";
      const link = "https://www.empregourgente.com";

      return (
        <NextSeo
          title={title}
          description={description}
          canonical={link}
          openGraph={{
            url: link,
            title,
            description,
            images: [
              {
                url: "/images/seo/emprego-urgente800600.png",
                width: 800,
                height: 600,
                alt: "Emprego urgente logo"
              }
            ],
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
