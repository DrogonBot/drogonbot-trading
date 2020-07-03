import { Button } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShareIcon from '@material-ui/icons/Share';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { UI } from '../../../../constants/UI/UI.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { AlertModal } from '../../../elements/ui/AlertModal';

interface IProps {
  onClose: () => void;
}

export const CreditsModal = ({ onClose }: IProps) => {
  return (
    <AlertModal
      alertKey="credits-modal"
      title={TS.string("account", "noAccountCredits")}
      onClose={() => onClose()}
      content={
        <Container>
          <p>Para continuar, escolha uma das opções abaixo: </p>
          <Link href="/posts/share">
            <a>
              <h1>
                Divulge e Ganhe Créditos <Underline>Gratuitamente</Underline>
              </h1>
              <p>
                Compartilhe seu link de divulgação e{" "}
                <strong>
                  receba 1 crédito toda vez que alguém clicar em seu link,
                  gratuitamente.
                </strong>
                .
              </p>
              <CTAContainer>
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
                    Divulgue e Ganhe
                  </Button>
                </ButtonContainer>
              </CTAContainer>
            </a>
          </Link>

          <TextOr>OU</TextOr>

          <Link href="/payment">
            <a>
              <h1>Compre Créditos</h1>
              <p>
                Sem muito tempo para compartilhar e aguardar? Compre créditos
                para usar nosso sistema sem limitações!
              </p>
              <strong>
                Apenas R$0.33 centavos por crédito. Mínimo de 60 créditos por
                R$19.90
              </strong>

              <CTAContainer>
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
                    Comprar
                  </Button>
                </ButtonContainer>
              </CTAContainer>
            </a>
          </Link>
        </Container>
      }
    />
  );
};

const Underline = styled.div`
  text-decoration: underline;
`;

const Container = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }

  h1 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1rem;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  flex: auto;
  display: flex;
  justify-content: center;
  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 100%;
  }
`;

const ButtonContainer = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    margin-top: 1.5rem;
    flex: 100%;
  }
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
  text-decoration: underline;
`;
