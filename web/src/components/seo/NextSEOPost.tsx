import { NextSeo } from 'next-seo';

import { appEnv } from '../../constants/Env.constant';

interface IProps {
  jobRole: string | string[];
  title: string;
  description: string;
  city: string;
  stateCode: string | string[];
  link: string;
  sector: string;
}

export const NextSEOPost = ({
  jobRole,
  title,
  description,
  link,
  city,
  stateCode,
  sector,
}: IProps) => {
  return (
    <NextSeo
      title={`Vaga para ${jobRole} em ${city}, ${stateCode}`}
      description={description}
      canonical={link}
      openGraph={{
        url: link,
        title: `Vaga para ${jobRole} em ${city}, ${stateCode}`,
        description,
        images: [
          {
            url: `${appEnv.serverUrl}/images/seo/${sector}.jpg`,
            width: 800,
            height: 600,
            alt: `Imagem de ${jobRole}, setor ${sector} em ${city}, ${stateCode}`,
          },
        ],
        site_name: appEnv.appName,
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
};
