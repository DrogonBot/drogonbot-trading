import { Body, PageContainer, PageContent } from '../components/elements/common/layout';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { appEnv } from '../constants/Env.constant';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { IProvince } from '../types/Form.types';

interface IProps {
  provinces: IProvince[];
}

const Advertise = ({ provinces }: IProps) => {
  return (
    <>
      <Header />

      <Body>
        <PageContainer>
          <SearchTop provinces={provinces} />
        </PageContainer>

        <PageContent>
          <h1>Anuncie sua Vaga</h1>

          <p>
            Assine nosso plano empresa por R$59.90/mês e anuncie quantas vagas
            quiser, em destaque! Divulgamos para você, em todos nossos canais
            (WhatsApp, redes sociais e e-mail).
          </p>

          <p>
            Se interessou? Envie um e-mail para{" "}
            <a href="mailto:admin@empregourgente.com">
              admin@empregourgente.com
            </a>
          </p>
        </PageContent>
      </Body>
      <Footer />
    </>
  );
};

Advertise.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

export default Advertise;
