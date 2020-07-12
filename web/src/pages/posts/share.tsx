import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';
import _ from 'lodash';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AccentText, Body, PageContainer, PageContent, PageList } from '../../components/elements/common/layout';
import { AuthenticatedPage } from '../../components/pages/AuthenticatedPage';
import { Footer } from '../../components/pages/index/Footer';
import { Header } from '../../components/pages/index/Header/Header';
import { SearchTop } from '../../components/pages/posts/SearchTop';
import { appEnv } from '../../constants/Env.constant';
import { UI } from '../../constants/UI/UI.constant';
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

  const classes = useStyles();

  const adgroupShareableLink =
    user &&
    `https://adgroup-desenho-industrial.netlify.app/?promoterId=${user._id}&payerId=2`;
  const seuJobsGroupsShareableLink =
    user &&
    `https://telegram-group.netlify.app/?promoterId=${user._id}&payerId=3`;

  const euPagBankShareableLink =
    user &&
    `https://pagbank-indique-amigos.netlify.app/?promoterId=${user._id}&payerId=4`;

  const adgroupMessageVariations = [
    "Pessoal, aulão gratuito de desenho mecânico + grupo no whatsapp! Bora participar!",
    "Ei gente, olha esse aulão gratuito de desenho mecânico + grupo no whatsapp! Participem!",
    "E ai pessoal! Vamos ter um aulão 100% gratuito sobre DESENHO MECANICO! Bora participar!",
  ];

  const seuJobsMessageVariations = [
    "Pessoal, acessem nosso grupo em SP de EMPREGOS NO TELEGRAM! ENTRE Se nao tiver o Telegram instalado, baixe antes de entrar!",
    "Ei gente, vamos entrar em nosso grupo para SP de VAGAS no TELEGRAM! Se nao tiver o Telegram instalado, baixe antes de entrar!",
    "Oi pessoal! Grupo de VAGAS NO TELEGRAM (SP)! Bora participar!! Se nao tiver o Telegram instalado, baixe antes de entrar!",
  ];

  const euPagBankMessageVariations = [
    "Pessoal, sabiam quem tem como ganhar dinheiro indicando o app PagBank? Veja como funciona. 100% Grátis",
    "Ei gente, querem ganhar uma graninha indicando PagBank? Acesse e veja como funciona. 100% Grátis",
    "Ei pessoal, querem ganhar um extra indicando PagBank? Acesse e veja como funciona. 100% Grátis",
  ];

  const adgroupShareableMessage = _.sample(adgroupMessageVariations);
  const seuJobsShareableMessage = _.sample(seuJobsMessageVariations);
  const euPagBankShareableMessage = _.sample(euPagBankMessageVariations);

  const onHandleCopyClipboard = (message: string, shareableLink: string) => {
    navigator.clipboard.writeText(`${message} ${shareableLink}`);
  };

  return (
    <AuthenticatedPage>
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
          <CopyContainer>
            <h1>Divulgue e Ganhe DINHEIRO!</h1>

            {/* <p>Veja o vídeo abaixo e aprenda como deve ser feito:</p> */}

            {/* <ShareExplanationVideo
              src="https://www.youtube.com/embed/zZzMIWTQa2A"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}

            <p>
              Quer ajudar ao próximo e ao mesmo tempo poder
              <strong> ganhar algum dinheiro?</strong> Divulgue o link dos
              nossos grupos abaixo! Você receberá 1 crédito por clique único. Ao
              atingir o valor mínimo para retirada, iremos efetuar o pagamento
              diretamente em sua conta.
            </p>

            <p>
              Caso se torne um divulgador,{" "}
              <AccentText>
                <a
                  href="https://chat.whatsapp.com/LVdk9leeUEX4zWX51aGLnn"
                  target="_blank"
                >
                  <strong>
                    CLIQUE AQUI para participar de nosso grupo de divulgadores
                  </strong>
                </a>
              </AccentText>
              , já que postaremos avisos por lá.
            </p>

            {user && (
              <>
                <h3>1. Escolha um dos links e divulgue</h3>

                <h4>IndicaApp - R$ 0.07 por CLIQUE</h4>

                <Alert severity="info">
                  <LinkContainer>
                    <LinkColumnLeft>
                      Seu link para divulgação:{" "}
                      <a href={euPagBankShareableLink}>
                        {euPagBankShareableLink}
                      </a>{" "}
                    </LinkColumnLeft>
                    <LinkColumnRight>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FileCopyIcon />}
                        onClick={() =>
                          onHandleCopyClipboard(
                            euPagBankShareableMessage,
                            euPagBankShareableLink
                          )
                        }
                      >
                        Copiar Link
                      </Button>
                    </LinkColumnRight>
                  </LinkContainer>
                </Alert>

                <br />

                <p>Grupos sugeridos para divulgar:</p>

                <Alert severity="warning">
                  <PageList>
                    <li key={1}>
                      <a href="https://www.facebook.com/groups/querotrabalharvagasdeempregos/?ref=br_rs">
                        Quero Trabalhar - Vagas de Empregos
                      </a>
                    </li>
                    <li key={2}>
                      <a href="https://www.facebook.com/groups/vagasabcdm/">
                        Vagas ABCDM
                      </a>
                    </li>
                  </PageList>
                </Alert>

                <h4>Adgroup - R$ 0.13 por CADASTRO</h4>

                <Alert severity="info">
                  <LinkContainer>
                    <LinkColumnLeft>
                      Seu link para divulgação:{" "}
                      <a href={adgroupShareableLink}>{adgroupShareableLink}</a>{" "}
                    </LinkColumnLeft>
                    <LinkColumnRight>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FileCopyIcon />}
                        onClick={() =>
                          onHandleCopyClipboard(
                            adgroupShareableMessage,
                            adgroupShareableLink
                          )
                        }
                      >
                        Copiar Link
                      </Button>
                    </LinkColumnRight>
                  </LinkContainer>
                </Alert>

                <br />

                <p>Grupos sugeridos para divulgar:</p>

                <Alert severity="warning">
                  <PageList>
                    <li key={1}>
                      <a href="https://www.facebook.com/groups/328205223881706/">
                        Projetista Mecânico (+ Recomendado)
                      </a>
                    </li>
                    <li key={2}>
                      <a href="https://www.facebook.com/groups/374562575922448/?ref=br_rs">
                        Cadista / Projetista (+ Recomendado)
                      </a>
                    </li>
                    <li key={3}>
                      <a href="https://www.facebook.com/groups/666437053509871/">
                        Dimensionamento e Projeto Mecânico
                      </a>
                    </li>
                    <li key={4}>
                      <a href="https://www.facebook.com/groups/1901304170093223/">
                        Desenho Industrial Mecânico
                      </a>
                    </li>
                    <li key={5}>
                      <a href="https://www.facebook.com/groups/664643813630132/">
                        Vagas offshore macae e regiao
                      </a>
                    </li>
                  </PageList>
                </Alert>

                <h4>SeuJobs - R$ 0.05 por CLIQUE</h4>

                <Alert severity="info">
                  <LinkContainer>
                    <LinkColumnLeft>
                      Seu link para divulgação:{" "}
                      <a href={seuJobsGroupsShareableLink}>
                        {seuJobsGroupsShareableLink}
                      </a>{" "}
                    </LinkColumnLeft>
                    <LinkColumnRight>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FileCopyIcon />}
                        onClick={() =>
                          onHandleCopyClipboard(
                            seuJobsShareableMessage,
                            seuJobsGroupsShareableLink
                          )
                        }
                      >
                        Copiar Link
                      </Button>
                    </LinkColumnRight>
                  </LinkContainer>
                </Alert>

                <p>Grupos sugeridos para divulgar:</p>

                <small>Obs: Deve ser na grande SP</small>

                <Alert severity="warning">
                  <PageList>
                    <li key={1}>
                      <a href="https://www.facebook.com/groups/Temostrampo/">
                        Temos Trampo
                      </a>
                    </li>
                    <li key={2}>
                      <a href="https://www.facebook.com/groups/guarulhosvagas/">
                        Guarulhos Vagas
                      </a>
                    </li>
                    <li key={3}>
                      <a href="https://www.facebook.com/groups/concursoemsp/">
                        Concurso e Vagas em SP
                      </a>
                    </li>
                    <li key={4}>
                      <a href="https://www.facebook.com/groups/851299251885320/">
                        Empregos Zona Norte SP
                      </a>
                    </li>
                  </PageList>
                </Alert>

                <br />
              </>
            )}

            <h3>2. Divulgue nos comentários</h3>

            <p>
              Sugerimos que poste seu link na{" "}
              <strong>seção de comentários</strong> dos posts. Não crie uma nova
              publicação, pois provavelmente será banido dos grupos!
            </p>

            {/* <AdvertiseImg
              src="/images/advertise/advertise_example.png"
              alt="advertisement example"
            /> */}

            <h3>3. Aguarde clicarem em seu link</h3>

            <p>
              Aguarde um pouco até <strong>clicarem em seus links</strong> para
              seus créditos aumentarem. Caso esteja demorando, repita o processo
              (com intervalo de pelo menos 30 minutos, para não te banirem)
            </p>
          </CopyContainer>
        </PageContent>
      </Body>
      <Footer />
    </AuthenticatedPage>
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

// const ShareExplanationVideo = styled.iframe`
//   width: 100%;
//   height: 315px;
// `;

// const AdvertiseImg = styled.img`
//   width: 100%;
//   max-width: 400px;
// `;

const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  word-break: break-word;
`;

const LinkColumnLeft = styled.div`
  flex: 70%;
`;

const LinkColumnRight = styled.div`
  flex: auto;

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CopyContainer = styled.div`
  margin-bottom: 2rem;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);
