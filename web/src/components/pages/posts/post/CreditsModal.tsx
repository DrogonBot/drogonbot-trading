import { Button } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShareIcon from '@material-ui/icons/Share';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { AlertModal } from '../../../elements/ui/AlertModal';

export const CreditsModal = () => {
  return (
    <AlertModal
      alertKey="credits-modal"
      title={TS.string("account", "noAccountCredits")}
      content={
        <Container>
          <p>Para continuar, escolha uma das opções abaixo: </p>
          <Link href="/payment">
            <a>
              <h1>Compre Créditos</h1>
              <p>
                Sem muito tempo para compartilhar e aguardar? Compre créditos
                para usar nosso sistema sem limitações!
              </p>
              <strong>Apenas R$0.33 centavos por crédito.</strong>

              <ImageContainer>
                <Img
                  src="/images/advertise/buy-credits.svg"
                  alt="buy credits"
                />
              </ImageContainer>
              <ButtonContainer>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<MonetizationOnIcon />}
                >
                  Comprar Créditos
                </Button>
              </ButtonContainer>
            </a>
          </Link>

          <TextOr>OU</TextOr>

          <Link href="/posts/share">
            <a>
              <h1>Compartilhe</h1>
              <p>
                Compartilhe seu link de divulgação e receba 1 crédito toda vez
                que alguém clicar em sua URL. Dessa forma você nos ajuda, faz o
                bem ao próximo e consegue alguns créditos para aplicar.
              </p>
              <ImageContainer>
                <Img
                  src="/images/advertise/share.svg"
                  alt="share to earn credits"
                />
              </ImageContainer>

              <ButtonContainer>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ShareIcon />}
                >
                  Divulgar
                </Button>
              </ButtonContainer>
            </a>
          </Link>
        </Container>
      }
    />
  );
};

const Container = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ButtonContainer = styled.div`
  flex: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ImageContainer = styled.div`
  flex: 100%;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  max-width: 70px;
  height: auto;
`;

const TextOr = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.primary};
`;
