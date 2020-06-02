import { Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';
import { UI } from '../../../constants/UI/UI.constant';
import { TS } from '../../../helpers/LanguageHelper';
import { IPost } from '../../../types/Post.types';

interface IProps {
  post: IPost;
}

export const JoinCommunities = ({ post }: IProps) => {
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
      <a
        href={`http://bit.ly/emprego-urgente-${post.stateCode.toLowerCase()}4`}
        target="_blank"
      >
        <Button
          variant="outlined"
          className="btnWhatsapp"
          startIcon={<WhatsAppIcon />}
        >
          {TS.string("global", "genericWhatsAppGroups").toUpperCase()}
        </Button>
      </a>
      <a href={getFacebookLink(post.stateCode)} target="_blank">
        <Button
          variant="outlined"
          className="btnFacebook"
          startIcon={<FacebookIcon />}
        >
          {TS.string("global", "genericFacebookGroups").toUpperCase()}
        </Button>
      </a>
      <a href={`https://bit.ly/emprego-urgente-link1`} target="_blank">
        <Button
          variant="outlined"
          className="btnEU"
          startIcon={<SmartphoneIcon />}
        >
          {TS.string("global", "genericAppJobs").toUpperCase()}
        </Button>
      </a>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
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
