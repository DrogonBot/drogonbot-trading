import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../store/reducers/index.reducers';
import { IPost } from '../../../../types/Post.types';
import { IUser } from '../../../../types/User.types';
import { PromoterModal } from './PromoterModal';
import { RegisterModal } from './RegisterModal';
import { WhatsAppModal } from './WhatsAppModal';

interface IProps {
  post: IPost;
  jobRoles: string[];
}

export const LeadModal = ({ post, jobRoles }: IProps) => {
  const router = useRouter();
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);
  const { ref, modal } = router.query;

  if (user) {
    // if user is already logged in, show promoter
    return <PromoterModal />;
  }

  if (ref === "whatsapp" || modal === "register") {
    // if we're being referred by whatsapp, lets just open the register modal...

    return <RegisterModal jobRoles={jobRoles} />;
  }

  if (process.browser) {
    if (localStorage.getItem("whatsapp-modal") === "dont-show") {
      return <RegisterModal jobRoles={jobRoles} />;
    }
  }

  return <WhatsAppModal post={post} />;
};
