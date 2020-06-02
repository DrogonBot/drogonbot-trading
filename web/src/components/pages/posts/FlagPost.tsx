import { Button } from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';
import React from 'react';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { TS } from '../../../helpers/LanguageHelper';
import { IPost } from '../../../types/Post.types';

interface IProps {
  post: IPost;
}

export const FlagPost = ({ post }: IProps) => {
  return (
    <FlagPostContainer>
      <a
        target="_blank"
        href={`mailto:${appEnv.appEmail}?subject=Denuncia%20de%20Vaga&body=Bom+dia%21+Venho+por+meio+desta+mensagem+denunciar+a+vaga+https://empregourgente.com/posts/${post.slug}%0D%0A%0D%0AMotivos: %0D%0A - DIGITE AQUI O MOTIVO %0D%0A%0D%0AObrigado`}
      >
        <Button startIcon={<FlagIcon />} variant="outlined" color="secondary">
          {TS.string("post", "postFlag")}
        </Button>
      </a>
    </FlagPostContainer>
  );
};

const FlagPostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
