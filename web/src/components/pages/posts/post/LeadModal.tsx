import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../store/reducers/index.reducers';
import { IPost } from '../../../../types/Post.types';
import { IUser } from '../../../../types/User.types';
import { RegisterModal } from './RegisterModal';
import { WhatsAppModal } from './WhatsAppModal';

interface IProps {
  post: IPost;
  jobRoles: string[];
}

export const LeadModal = ({ post, jobRoles }: IProps) => {
  const router = useRouter();
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);
  const { utm_source } = router.query;

  if (user) {
    return null;
  }

  if (process.browser) {
    if (localStorage.getItem("whatsapp-modal") === "dont-show") {
      return <RegisterModal jobRoles={jobRoles} />;
    }
  }

  if (utm_source === "whatsapp" || utm_source === "telegram") {
    return <RegisterModal jobRoles={jobRoles} />;
  }

  return <WhatsAppModal post={post} />;
};
