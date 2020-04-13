import { NextSeo } from 'next-seo';

import { appEnv } from '../../constants/Env.constant';

interface IProps {
  jobRole: string | string[];
  title: string;
  description: string;
  city: string;
  stateCode: string | string[];
  link: string;
}

export const NextSEOPost = ({
  jobRole,
  title,
  description,
  link,
  city,
  stateCode
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
};
