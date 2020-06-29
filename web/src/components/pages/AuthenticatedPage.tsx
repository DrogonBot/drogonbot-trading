import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AppState } from '../../store/reducers/index.reducers';
import { IUser } from '../../types/User.types';

interface IProps {
  children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  if (process.browser) {
    if (!user) {
      alert("Você precisa estar logado para acessar essa página!");
      router.push("/login");
    }
  }

  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
`;
