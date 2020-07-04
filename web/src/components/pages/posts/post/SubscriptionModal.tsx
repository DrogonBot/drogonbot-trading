import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { UI } from '../../../../constants/UI/UI.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { AccentText, Underline } from '../../../elements/common/layout';
import { AlertModal } from '../../../elements/ui/AlertModal';

interface IProps {
  stateCode: string;
  city: string;
  jobRole: string;
}

export const SubscriptionModal = ({ stateCode, jobRole, city }: IProps) => {
  return (
    <AlertModal
      alertKey="subscription-modal"
      title={TS.string("subscription", "subscriptionModalTitle")}
      content={
        <Container>
          <ImageContainer>
            <Img src="/images/subscription/vip.svg" alt="become a subscriber" />
          </ImageContainer>

          <p>
            Faça já parte dessa comunidade <Underline>exclusiva </Underline>e
            tenha acesso as melhores oportunidades de sua região, de forma
            ILIMITADA!
          </p>
          <p>
            Somos <Underline>especialistas</Underline> em vagas operacionais no
            seu estado ({stateCode}) e temos várias oportunidades para o cargo
            de {jobRole} em {city}!
          </p>
          <Link href="/payment">
            <a>
              <h1>Assinatura Trimestral</h1>
              <p>
                Por apenas R$24.90{" "}
                <AccentText>(equivalente a apenas R$8.30/mês)</AccentText> você
                tem <Underline>acesso ilimitado</Underline> a todas as vagas por
                90 dias (3 MESES).
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
