import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';
import _ from 'lodash';
import Head from 'next/head';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Body, PageContainer, PageContent, PageList } from '../../components/elements/common/layout';
import { AuthenticatedPage } from '../../components/pages/AuthenticatedPage';
import { Footer } from '../../components/pages/index/Footer';
import { Header } from '../../components/pages/index/Header/Header';
import { SearchTop } from '../../components/pages/posts/SearchTop';
import { appEnv } from '../../constants/Env.constant';
import { groups } from '../../constants/groups';
import { UI } from '../../constants/UI/UI.constant';
import { TS } from '../../helpers/LanguageHelper';
import { PromoterHelper } from '../../helpers/PromoterHelper';
import { loadCountryProvinces } from '../../store/actions/form.actions';
import { AppState } from '../../store/reducers/index.reducers';
import { IProvince } from '../../types/Form.types';
import { IGroupItem } from '../../types/Groups.types';
import { IUser } from '../../types/User.types';

interface IProps {
  provinces: IProvince[];
}

const PostAdvertise = ({ provinces }: IProps) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  const classes = useStyles();

  const [isShareableLinkCopied, setIsShareableLinkCopied] = useState(false);

  const userShareableLink = user && PromoterHelper.getShareableLink(user);

  const messageVariations = [
    "Pessoal, curso gratuito de desenho mecânico + grupo no whatsapp! Bora participar!",
    "Ei gente, olha esse curso gratuito de desenho mecânico + grupo no whatsapp! Participem!",
    "E ai pessoal! Vamos ter um aulão 100% gratuito sobre DESENHO MECANICO! Bora participar!",
  ];

  const userShareableLinkMessage = _.sample(messageVariations);

  const onHandleCopyClipboard = () => {
    navigator.clipboard.writeText(
      `${userShareableLinkMessage} ${userShareableLink}`
    );

    setIsShareableLinkCopied(true);
  };

  const onRenderGroups = () => {
    try {
      // return groups[user.stateCode].map((group: IGroupItem, index) => (
      // ! Promoting only SeuJobs -> SP for now

      const spGroups = _.shuffle(groups.SP);

      return spGroups.map((group: IGroupItem, index) => (
        <li key={index}>
          <a target="_blank" href={group.link}>
            - {group.name}
          </a>
        </li>
      ));
    } catch (error) {
      return (
        <p>
          Nenhum grupo sugerido para seu estado! Por favor, procure manualmente
          no Face!
        </p>
      );
    }
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

            {user && (
              <>
                <h3>1. Copie seu link</h3>

                <Alert severity="info">
                  <LinkContainer>
                    <LinkColumnLeft>
                      Seu link para divulgação:{" "}
                      <a href={userShareableLink}>{userShareableLink}</a>{" "}
                    </LinkColumnLeft>
                    <LinkColumnRight>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FileCopyIcon />}
                        onClick={onHandleCopyClipboard}
                      >
                        Copiar Link
                      </Button>
                    </LinkColumnRight>
                  </LinkContainer>
                </Alert>

                <br />
                {isShareableLinkCopied && (
                  <p>Link copiado com sucesso! Divulgue nos grupos abaixo!</p>
                )}
              </>
            )}

            {user && (
              <>
                <h3>2. Entre em grupos do Face</h3>

                <Alert severity="warning">Apenas grupos do estado de SP!</Alert>

                <p>
                  Sugerimos que você primeiro{" "}
                  <strong>solicite participação e aguarde ser aceito(a)</strong>{" "}
                  nos seguintes grupos
                </p>

                <PageList>{onRenderGroups()}</PageList>
              </>
            )}

            <h3>3. Divulgue nos comentários</h3>

            <p>
              Sugerimos que poste seu link na{" "}
              <strong>seção de comentários</strong> dos posts. Não crie uma nova
              publicação, pois provavelmente será banido dos grupos!
            </p>

            {/* <AdvertiseImg
              src="/images/advertise/advertise_example.png"
              alt="advertisement example"
            /> */}

            <h3>4. Aguarde clicarem em seu link</h3>

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
