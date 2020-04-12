import { faEnvelope, faLink, faMobileAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';

interface IProps {
  email: string;
  phone: string;
  externalUrl: string;
}

interface ICTAInfo {
  icon: IconDefinition;
  link: string;
  translatedString: string;
}

export const PostCTA = ({ email, phone, externalUrl }: IProps) => {
  let CTAInfo: ICTAInfo;

  if (email) {
    CTAInfo = {
      icon: faEnvelope,
      link: `mailto:${email}`,
      translatedString: "postApplyBtn",
    };
  } else if (phone) {
    CTAInfo = {
      icon: faMobileAlt,
      link: `tel:${phone}`,
      translatedString: "postCallPhone",
    };
  } else if (externalUrl) {
    CTAInfo = {
      icon: faLink,
      link: externalUrl,
      translatedString: "postVisitExternalLink",
    };
  }

  return (
    <Container>
      <a href={CTAInfo.link}>
        <Button
          className="wobble-hor-bottom"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<FontAwesomeIcon icon={CTAInfo.icon} />}
        >
          {TS.string("post", CTAInfo.translatedString).toUpperCase()}
        </Button>
      </a>
    </Container>
  );
};

const Container = styled.div``;
