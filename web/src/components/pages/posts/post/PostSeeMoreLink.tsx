import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { GenericHelper } from '../../../../helpers/GenericHelper';
import { TS } from '../../../../helpers/LanguageHelper';
import { userConsumeCredit, userGetProfileInfo } from '../../../../store/actions/user.actions';
import { IPost } from '../../../../types/Post.types';

interface IProps {
  post: IPost;
}

export const PostSeeMoreLink: React.FC<IProps> = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();

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
      return GenericHelper.crossBrowserUrlRedirect(post.externalUrl);
    } else {
      router.push("/posts/share");
    }
  };

  return (
    <SeeMoreLink onClick={onCTAClick}>
      <strong>{TS.string("post", "postMoreInfoDestinationPage")}...</strong>
    </SeeMoreLink>
  );
};

const SeeMoreLink = styled.p`
  color: ${colors.accent};
  display: block;
  margin-top: 1.5rem;
  cursor: pointer;
`;
