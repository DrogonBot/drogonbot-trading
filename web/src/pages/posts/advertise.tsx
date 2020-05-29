import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { Body, PageContainer, PageContent } from '../../components/elements/common/layout';
import { Footer } from '../../components/pages/index/Footer';
import { Header } from '../../components/pages/index/Header/Header';
import { SearchTop } from '../../components/pages/posts/SearchTop';
import { appEnv } from '../../constants/Env.constant';
import { TS } from '../../helpers/LanguageHelper';
import { loadCountryProvinces } from '../../store/actions/form.actions';
import { AppState } from '../../store/reducers/index.reducers';
import { IProvince } from '../../types/Form.types';
import { IUser } from '../../types/User.types';

interface IProps {
  provinces: IProvince[];
}

const PostAdvertise = ({ provinces }: IProps) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);
  const router = useRouter();

  if (process.browser) {
    if (!user) {
      router.push("/login");
    }
  }

  const renderJoinJobsPromoterText = () => (
    <>
      <h1>Divulgue Vagas de Emprego</h1>

      <p>
        Quer ajudar ao proximo e ao mesmo tempo poder{" "}
        <strong>restaurar seus creditos</strong> para enviar curriculos pelo
        nosso site, GRATUITAMENTE? Seja um divulgador!
      </p>

      <ul>
        <li>Voce nao precisa pagar nada para se aderir.</li>
        <li>
          Simples de realizar, iremos te orientar sobre os passos necessarios.
        </li>
        <li>
          Basta copiar e colar uma vaga de emprego em um grupo que iremos
          indicar.{" "}
        </li>
      </ul>
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
