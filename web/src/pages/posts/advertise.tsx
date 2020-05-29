import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Body, PageContainer, PageContent, PageList } from '../../components/elements/common/layout';
import { Footer } from '../../components/pages/index/Footer';
import { Header } from '../../components/pages/index/Header/Header';
import { SearchTop } from '../../components/pages/posts/SearchTop';
import { appEnv } from '../../constants/Env.constant';
import { TS } from '../../helpers/LanguageHelper';
import { loadCountryProvinces } from '../../store/actions/form.actions';
import { userUpdateAttribute } from '../../store/actions/user.actions';
import { AppState } from '../../store/reducers/index.reducers';
import { IProvince } from '../../types/Form.types';
import { AvailableLanguages } from '../../types/Global.types';
import { IUser } from '../../types/User.types';

interface IProps {
  provinces: IProvince[];
}

const PostAdvertise = ({ provinces }: IProps) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);
  const router = useRouter();
  const dispatch = useDispatch();

  if (process.browser) {
    if (!user) {
      router.push("/login");
    }
  }

  const onHandleStartAdvertising = async () => {
    await dispatch(
      userUpdateAttribute({
        isJobPromoter: true,
      })
    );
  };

  const onRenderJobPromoterCopy = () => {
    switch (appEnv.language) {
      case AvailableLanguages.ptBr:
        return (
          <>
            <CopyContainer>
              <h1>Divulgue Vagas de Emprego</h1>

              <Alert severity="info">
                Concorra a prêmios conforme o número de cliques em seus
                anúncios: R$120 reais para o 1º lugar, R$ 60 reais para o 2.º e
                R$ 20 reais do 3.º ao 5.º lugar. (Ranking calculador
                mensalmente)
              </Alert>

              <p>
                Quer ajudar ao próximo e ao mesmo tempo poder
                <strong> restaurar seus créditos</strong> para enviar currículos
                pelo nosso site, GRATUITAMENTE? Seja um divulgador!
              </p>

              <PageList>
                <li>
                  - Você <strong>não precisará pagar nada</strong> para se
                  aderir.
                </li>
                <li>
                  - Simples de realizar, iremos te orientar sobre os passos
                  necessários.
                </li>
                <li>
                  - Basta <strong>copiar e colar</strong> uma vaga de emprego em
                  um grupo que iremos indicar. Simples assim!
                </li>
              </PageList>
            </CopyContainer>
          </>
        );

      case AvailableLanguages.eng:
        return (
          <>
            <CopyContainer>
              <h1> Promote Job Vacancies </h1>
                  
              <p>
                       Want to help others and at the same time be able to {""}
                       <strong> restore your credits </strong> to send resumes
                at        our website for FREE? Be a promoter!     
              </p>
                  
              <PageList>
                       <li> You don't have to pay anything to join. </li>
                      
                <li>
                           Simple to perform, we will guide you on the necessary
                  steps.      
                </li>
                      
                <li>
                           Just copy and paste a job into a group that we will
                           indicate. That simple!       
                </li>
                    
              </PageList>
            </CopyContainer>
          </>
        );
    }
  };

  const renderJoinJobsPromoterText = () => (
    <>
      {onRenderJobPromoterCopy()}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onHandleStartAdvertising}
      >
        {TS.string("account", "userStartAdvertising")}
      </Button>
    </>
  );

  const renderPromotionArea = () => (
    <>
      <p>Promotion Area => replace by component</p>
    </>
  );

  return (
    <>
      <Head>
        <title>{`${appEnv.appName} | ${TS.string(
          null,
          "genericJobSeekerAdvertise"
        )}`}</title>
        <meta
          property="description"
          content="Anuncie nossas vagas de emprego e receba créditos de envio de currículo!"
        />
      </Head>
      <Header />

      <Body>
        <PageContainer>
          <SearchTop provinces={provinces} />
        </PageContainer>

        <PageContent>
          {!user?.isJobPromoter
            ? renderJoinJobsPromoterText()
            : renderPromotionArea()}
        </PageContent>
      </Body>
      <Footer />
    </>
  );
};

PostAdvertise.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

export default PostAdvertise;

const CopyContainer = styled.div`
  margin-bottom: 2rem;
`;
