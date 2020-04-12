import { NextSeo } from 'next-seo';

import { appEnv } from '../../constants/Env.constant';
import { AvailableLanguages } from '../../types/Global.types';

interface IProps {
  jobRole: string | string[];
  postsQty: number;
  city: string;
  stateCode: string | string[];
}

export const NextSEOPosts = ({
  postsQty,
  jobRole,
  city,
  stateCode
}: IProps) => {
  switch (appEnv.language) {
    case AvailableLanguages.ptBr:
      const title = `Emprego Urgente | ${postsQty} vagas de ${jobRole} em ${city}, ${stateCode}`;
      const description = `Cadastre seu currículo agora mesmo e tenha acesso a mais de ${postsQty} vagas de ${jobRole} em todo Brasil!`;
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
