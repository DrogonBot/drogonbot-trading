import { Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import FlagIcon from '@material-ui/icons/Flag';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import React from 'react';
import styled from 'styled-components';

import { appEnv } from '../../../../constants/Env.constant';
import { colors } from '../../../../constants/UI/Colors.constant';
import { UI } from '../../../../constants/UI/UI.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { IPost } from '../../../../types/Post.types';

interface IProps {
  post: IPost;
}

export const ActionButtons = ({ post }: IProps) => {
  const getFacebookLink = (stateCode: string) => {
    const facebookGroupLinks = {
      ES: "https://www.facebook.com/groups/empregoses/",
      SP: "https://www.facebook.com/groups/empregosessp/",
      MG: "https://www.facebook.com/groups/grupoempregosbh/",
    };

    return facebookGroupLinks[stateCode];
  };

  return (
    <Container>
      <Item
        target="_blank"
        href={`mailto:${appEnv.appEmail}?subject=Denuncia%20de%20Vaga&body=Bom+dia%21+Venho+por+meio+desta+mensagem+denunciar+a+vaga+https://empregourgente.com/posts/${post.slug}%0D%0A%0D%0AMotivos: %0D%0A - DIGITE AQUI O MOTIVO %0D%0A%0D%0AObrigado`}
      >
        <Button startIcon={<FlagIcon />} variant="outlined" color="secondary">
          {TS.string("post", "postFlag")}
        </Button>
      </Item>
      <Item
        href={`https://emprego-urgente.netlify.app/?userType=JobSeeker&stateCode=${post.stateCode}&city=${post.city}`}
        target="_blank"
      >
        <Button
          variant="outlined"
          className="btnWhatsapp"
          startIcon={<WhatsAppIcon />}
        >
          {TS.string("global", "genericWhatsAppGroups").toUpperCase()}
        </Button>
      </Item>
      <Item href={getFacebookLink(post.stateCode)} target="_blank">
        <Button
          variant="outlined"
          className="btnFacebook"
          startIcon={<FacebookIcon />}
        >
          {TS.string("global", "genericFacebookGroups").toUpperCase()}
        </Button>
      </Item>
      <Item href={`https://bit.ly/emprego-urgente-link1`} target="_blank">
        <Button
          variant="outlined"
          className="btnEU"
          startIcon={<SmartphoneIcon />}
        >
          {TS.string("global", "genericAppJobs").toUpperCase()}
        </Button>
      </Item>
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  padding: 3rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    margin: 0 auto;
  }

  .btnWhatsapp {
    background-color: white;
    border: 1px solid ${colors.whatsappGreen};
    color: ${colors.whatsappGreen};
  }
  .btnFacebook {
    background-color: white;
    border: 1px solid ${colors.facebookBlue};
    color: ${colors.facebookBlue};
  }

  .btnEU {
    background-color: white;
    border: 1px solid ${colors.accent};
    color: ${colors.accent};
  }
`;

const Item = styled.a`
  flex: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;
