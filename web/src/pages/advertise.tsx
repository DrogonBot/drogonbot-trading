import styled from 'styled-components';

import { PageBody, PageContainer } from '../components/elements/common/layout';
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
      <PageContainer>
        <SearchTop provinces={provinces} />
      </PageContainer>

      <Body>
        <PageContainer>
          <PageBody>
            <h1>Anuncie sua Vaga</h1>

            <p>
              Assine nosso plano empresa por R$59.90/mes e anuncie quantas vagas
              quiser, em destaque! Divulgamos para você, em todos nossos canais
              (WhatsApp, redes sociais e e-mail).
            </p>

            <p>
              Se interessou? Envie um e-mail para{" "}
              <a href="mailto:admin@empregourgente.com">
                admin@empregourgente.com
              </a>
            </p>
          </PageBody>
        </PageContainer>
      </Body>
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

export const Body = styled.div`
  min-height: 68.4vh;
`;
