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

      <PageContainer>
        <PageBody>
          <h1>Anuncie sua Vaga</h1>

          <p>Por que anunciar com o Emprego Urgente?</p>

          <BenefitsContainer>
            <BenefitItem>
              <BenefitTitle />
            </BenefitItem>
          </BenefitsContainer>
        </PageBody>
      </PageContainer>
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

const BenefitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
`;

const BenefitItem = styled.div`
  background-color: hotpink;
  display: flex;
  flex-wrap: wrap;
`;

const BenefitTitle = styled.div`
  flex: 100%;
  font-size: 1.3rem;
  font-weight: bold;
`;
