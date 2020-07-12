import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../store/reducers/index.reducers';
import { IPost } from '../../../../types/Post.types';
import { IUser } from '../../../../types/User.types';
import { ExtraIncomeModal } from './ExtraIncomeModal';
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

    const n = _.random(10);
    console.log(n);

    if (n >= 0 && n <= 3) {
      return <PromoterModal />;
    } else {
      return <ExtraIncomeModal />;
    }
  }

  if (ref === "whatsapp" || modal === "register") {
    const n = _.random(10);

    if (n >= 0 && n <= 7) {
      return <ExtraIncomeModal />;
    } else {
      // if we're being referred by whatsapp, lets just open the register modal...

      return <RegisterModal jobRoles={jobRoles} />;
    }
  }

  if (process.browser) {
    if (localStorage.getItem("whatsapp-modal") === "dont-show") {
      return <RegisterModal jobRoles={jobRoles} />;
    }
  }

  return <WhatsAppModal post={post} />;
};
