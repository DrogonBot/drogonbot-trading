import { Button } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { TS } from '../../../../helpers/LanguageHelper';
import { IPost } from '../../../../types/Post.types';
import { AlertModal } from '../../../elements/ui/AlertModal';
import { RegisterWizard } from '../../register/RegisterWizard';

interface IProps {
  post: IPost;
  jobRoles: string[];
}

export const LeadModal = ({ post, jobRoles }: IProps) => {
  const router = useRouter();
  const { ref, modal } = router.query;

  if (ref === "whatsapp" || modal === "register") {
    // if we're being referred by whatsapp, lets just open the register modal...

    if (process.browser) {
      if (localStorage.getItem("register-modal") === "dont-show") {
        return null;
      }
    }

    return (
      <AlertModal
        alertKey="register-modal"
        title={TS.string("account", "registerCreateYourAccount")}
        content={<RegisterWizard jobRoles={jobRoles} />}
        showDontShowAgain={true}
      />
    );
  }

  // otherwise, capture a lead through WhatsApp

  if (process.browser) {
    const whatsAppModal = localStorage.getItem("whatsapp-modal");

    if (whatsAppModal === "dont-show") {
      return null;
    }
  }

  return (
    <AlertModal
      alertKey="whatsapp-modal"
      title="Grupo de Vagas no WhatsApp"
      content={
        <>
          <a
            href={`https://emprego-urgente.netlify.app/?userType=JobSeeker&stateCode=${post.stateCode}&city=${post.city}`}
            target="_blank"
          >
            <WhatsAppLogoContainer>
              <WhatsAppLogo
                src={"/images/logos/whatsapp.svg"}
                alt="WhatsApp Logo"
              />
            </WhatsAppLogoContainer>
          </a>
          <p>
            Participe do nosso grupo exclusivo de vagas no WhatsApp e receba
            diariamente oportunidades exclusivas em seu celular!
          </p>
          <p>
            Também enviaremos emails com vagas de seu interesse assim que
            estiverem disponíveis!
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
  max-height: 100px;
`;

const WhatsAppLogo = styled.img`
  max-width: 100px;
`;

const AlertModalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;
