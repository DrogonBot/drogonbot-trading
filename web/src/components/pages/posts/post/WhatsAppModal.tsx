import { Button } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import React from 'react';
import styled from 'styled-components';

import { IPost } from '../../../../types/Post.types';
import { AlertModal } from '../../../elements/ui/AlertModal';

interface IProps {
  post: IPost;
}

export const WhatsAppModal: React.FC<IProps> = ({ post }) => {
  return (
    <AlertModal
      alertKey="whatsapp-modal"
      title="Grupo de Vagas no Telegram/WhatsApp"
      content={
        <>
          <a
            href={`https://emprego-urgente.netlify.app/?userType=JobSeeker&stateCode=${post.stateCode}&city=${post.city}`}
            target="_blank"
          >
            <WhatsAppLogoContainer>
              <WhatsAppLogo
                src={"/images/logos/telegram_whatsapp.png"}
                alt="WhatsApp and Telegram Logo"
              />
            </WhatsAppLogoContainer>
          </a>
          <p>
            Participe do nosso grupo exclusivo de vagas no Telegram ou WhatsApp
            e receba diariamente oportunidades exclusivas em seu celular!
            Enviaremos também vagas por e-mail!
          </p>

          <AlertModalContainer>
            <a
              href={`https://emprego-urgente.netlify.app/?userType=JobSeeker&stateCode=${post.stateCode}&city=${post.city}`}
              target="_blank"
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<WhatsAppIcon />}
              >
                Acessar Grupo
              </Button>
            </a>
          </AlertModalContainer>
        </>
      }
      showDontShowAgain={true}
    />
  );
};

const WhatsAppLogoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const WhatsAppLogo = styled.img`
  max-width: 70%;
  max-height: 200px;
`;

const AlertModalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;
