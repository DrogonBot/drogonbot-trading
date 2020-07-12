import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { UI } from '../../../../constants/UI/UI.constant';
import { AccentText } from '../../../elements/common/layout';
import { AlertModal } from '../../../elements/ui/AlertModal';

export const PromoterModal = () => {
  return (
    <AlertModal
      alertKey="promoter-modal"
      title={"Divulgue e Ganhe DINHEIRO!"}
      showDontShowAgain={true}
      content={
        <Container>
          <ImageContainer>
            <Img src="/images/advertise/share.svg" alt="become a promoter" />
          </ImageContainer>

          <p>
            Quer convidar novos membros para nossos grupos de emprego no
            WhatsApp e de quebra ainda <AccentText>ganhar dinheiro</AccentText>{" "}
            com isso? Não é necessario nenhum tipo de pagamento ou compra de
            curso!
          </p>
          <p />
          <Link href="/posts/share">
            <a>
              <h1>Seja um Divulgador</h1>
              <p>
                Ganhe dinheiro cada vez que algum novo membro for adicionado aos
                nossos grupos de WhatsApp!
              </p>

              <CTAContainer>
                <ButtonContainer>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FavoriteIcon />}
                  >
                    Saiba Mais
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
  flex: 100%;
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
  max-width: 130px;
  height: auto;
`;
