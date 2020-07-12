import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import styled from 'styled-components';

import { UI } from '../../../../constants/UI/UI.constant';
import { AccentText, VideoResponsive } from '../../../elements/common/layout';
import { AlertModal } from '../../../elements/ui/AlertModal';

export const ExtraIncomeModal = () => {
  return (
    <AlertModal
      alertKey="extra-income-modal"
      title={"Ganhe R$20 reais para baixar o PagBank!"}
      content={
        <Container>
          <p>
            Quer <AccentText>ganhar R$ 20,00</AccentText> para baixar o app
            PagBank e validar sua conta? Veja o video abaixo e entenda como
            funciona!
          </p>

          <p>
            Caso voce queira continuar ganhando, indique amigos! ao{" "}
            <AccentText>
              <strong>PagBank</strong>
            </AccentText>
            . <AccentText>Ele ganha 20 reais</AccentText> ao se cadastrar e
            pagar uma conta de qualquer valor, e{" "}
            <AccentText>
              você 10 reais quando seu amigo terminar o processo.
            </AccentText>
          </p>

          <VideoResponsive height={160}>
            <iframe
              src="https://www.youtube.com/embed/zBwFxotVJ64"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoResponsive>

          <a href="https://bit.ly/pagbank-app-download" target="_blank">
            <h1>Comece Agora</h1>
            <p>
              Baixe o app e cria sua <AccentText>conta gratuita </AccentText>
              clicando abaixo:
            </p>
            <CTAContainer>
              <ButtonContainer>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FavoriteIcon />}
                  className="wobble-hor-bottom"
                >
                  Baixe o App
                </Button>
              </ButtonContainer>
            </CTAContainer>
          </a>
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

// const ImageContainer = styled.div`
//   flex: 100%;
//   display: flex;
//   justify-content: center;
//   /*DESKTOP ONLY CODE*/
//   @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
//     flex: 100%;
//   }
// `;

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

// const Img = styled.img`
//   max-width: 80px;
//   height: auto;
// `;
