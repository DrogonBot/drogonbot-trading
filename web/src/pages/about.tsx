import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PageBody, PageContainer } from '../components/elements/common/layout';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { appEnv } from '../constants/Env.constant';
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
      <PageContainer>
        <SearchTop provinces={provinces} />
      </PageContainer>

      <Body>
        <PageContainer>
          <PageBody>{onRenderAboutUsPage()}</PageBody>
        </PageContainer>
      </Body>
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

export const Body = styled.div`
  min-height: 68.4vh;
`;
