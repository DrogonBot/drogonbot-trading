import { faEnvelope, faLink, faMobileAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { userConsumeCredit, userGetProfileInfo } from '../../../store/actions/user.actions';
import { IPost } from '../../../types/Post.types';

interface IProps {
  post: IPost;
}

interface ICTAInfo {
  icon: IconDefinition;
  link: string;
  translatedString: string;
}

export const PostCTA = ({ post }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let CTAInfo: ICTAInfo;

  if (post.email) {
    CTAInfo = {
      icon: faEnvelope,
      link: `mailto:${post.email}`,
      translatedString: "postApplyBtn",
    };
  } else if (post.phone) {
    CTAInfo = {
      icon: faMobileAlt,
      link: `tel:${post.phone}`,
      translatedString: "postCallPhone",
    };
  } else if (post.externalUrl) {
    CTAInfo = {
      icon: faLink,
      link: post.externalUrl,
      translatedString: "postVisitExternalLink",
    };
  }

  const onCTAClick = async () => {
    // if user is NOT authenticated, block and ask him to login

    const user = await dispatch(userGetProfileInfo());

    if (!user) {
      alert(TS.string("account", "loginRequiredMessage"));
      router.push("/register");
      return;
    }

    // else, proceed with link action + consume one credit
    const isCreditConsumed = await dispatch(userConsumeCredit(post));

    if (isCreditConsumed) {
      return (window.location.href = CTAInfo.link);
    } else {
      router.push("/posts/advertise");
    }
  };

  return (
    <Container>
      <CTALink onClick={onCTAClick}>
        <Button
          className="wobble-hor-bottom"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<FontAwesomeIcon icon={CTAInfo.icon} />}
        >
          {TS.string("post", CTAInfo.translatedString).toUpperCase()}
        </Button>
      </CTALink>
    </Container>
  );
};

const Container = styled.div``;

const CTALink = styled.div`
  cursor: pointer;
`;
