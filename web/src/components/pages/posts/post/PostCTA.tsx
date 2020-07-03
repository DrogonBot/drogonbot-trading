import { faEnvelope, faLink, faMobileAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { GenericHelper } from '../../../../helpers/GenericHelper';
import { TS } from '../../../../helpers/LanguageHelper';
import { userGetProfileInfo } from '../../../../store/actions/user.actions';
import { AppState } from '../../../../store/reducers/index.reducers';
import { IPost } from '../../../../types/Post.types';
import { IUser } from '../../../../types/User.types';

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

  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

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

    const user: any = await dispatch(userGetProfileInfo());

    if (!user) {
      alert(TS.string("account", "loginRequiredMessage"));
      router.push("/register");
      return;
    }

    if (post.premiumOnly && user.isPremium) {
      return GenericHelper.crossBrowserUrlRedirect(CTAInfo.link);
    } else {
      alert(TS.string("account", "premiumAccessOnly"));
      router.push("/payment");
      return;
    }
  };

  const CTAButton = () => {
    if (post.premiumOnly && !user?.isPremium) {
      return (
        <Button
          className="premium-only-button"
          variant="contained"
          color="default"
          size="large"
          startIcon={<LockIcon />}
        >
          {TS.string("post", "postPremiumOnlyCTA").toUpperCase()}
        </Button>
      );
    }

    return (
      <Button
        className="wobble-hor-bottom"
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<FontAwesomeIcon icon={CTAInfo.icon} />}
      >
        {TS.string("post", CTAInfo.translatedString).toUpperCase()}
      </Button>
    );
  };

  return (
    <Container>
      <CTALink onClick={onCTAClick}>
        <CTAButton />
      </CTALink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;

  .premium-only-button {
    background-color: ${colors.yellow};
    color: ${colors.dark};
  }
`;

const CTALink = styled.div`
  cursor: pointer;
`;
