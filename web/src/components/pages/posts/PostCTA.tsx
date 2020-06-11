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
  let CTAInfo: ICTAInfo;

  const dispatch = useDispatch();
  const router = useRouter();

  if (post.redirectToSourceOnly) {
    // if this post is forcing us to redirect to source, lets do it!
    CTAInfo = {
      icon: faLink,
      link: post.externalUrl,
      translatedString: "postGenericApplyText",
    };
  } else {
    if (post.email) {
      CTAInfo = {
        icon: faEnvelope,
        link: `mailto:${post.email}`,
        translatedString: "postGenericApplyText",
      };
    } else if (post.phone) {
      CTAInfo = {
        icon: faMobileAlt,
        link: `tel:${post.phone}`,
        translatedString: "postGenericApplyText",
      };
    } else if (post.externalUrl) {
      CTAInfo = {
        icon: faLink,
        link: post.externalUrl,
        translatedString: "postGenericApplyText",
      };
    }
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
