import Head from 'next/head';
import { useRouter } from 'next/router';

import { Body, PageContainer, PageContent } from '../components/elements/common/layout';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { appEnv } from '../constants/Env.constant';
import { TS } from '../helpers/LanguageHelper';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { IProvince } from '../types/Form.types';
import { AvailableLanguages } from '../types/Global.types';

interface IProps {
  provinces: IProvince[];
}

const About = ({ provinces }: IProps) => {
  const router = useRouter();

  const { language } = router.query;

  const onRenderAboutUsPage = () => {
    switch (language) {
      case AvailableLanguages.eng:
        return (
          <>
            <h1>About Us</h1>

            <p>
              Since 2019, {appEnv.appName} has been promoting change in many
              people lives through our recruiting platform. We strongly believe
              that all information should be free and that's why we've created a
              system that aggregates all relevant job information in one single
              place.
            </p>
          </>
        );
      case AvailableLanguages.ptBr:
        return (
          <>
            <h1> Sobre nós </h1>
              
            <p>
              Desde 2019, {appEnv.appName} promove mudanças na vida de muitas
              pessoas por meio de nossa plataforma de recrutamento. Acreditamos
              firmemente que todas as informações devem ser gratuitas e é por
              isso que criamos um sistema que agrega todas as informações
              relevantes sobre empregos em um único local.            
            </p>
          </>
        );
    }
  };
  return (
    <>
      <Head>
        <title>{`${appEnv.appName} | ${TS.string(
          "global",
          "genericAbout"
        )}}`}</title>
      </Head>
      <Header />

      <Body>
        <PageContainer>
          <SearchTop provinces={provinces} />
        </PageContainer>
        <PageContent>{onRenderAboutUsPage()}</PageContent>
      </Body>
      <Footer />
    </>
  );
};

About.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

export default About;
