import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import styled from 'styled-components';

import { appEnv } from '../../../../constants/Env.constant';
import { ExpansionPanelTitle } from '../../../../pages/payment';
import { IPost } from '../../../../types/Post.types';
import { VideoResponsive } from '../../../elements/common/layout';

interface IProps {
  post: IPost;
}

export const PostFAQ: React.FC<IProps> = ({ post }) => {
  return (
    <Container>
      <h2>Dúvidas Frequentes</h2>
      <FAQContainer>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              As vagas são do Emprego-Urgente? Vocês poderiam me indicar?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            Nós apenas repassamos vagas encontradas publicamente pela internet.
            Não temos <strong>NENHUM</strong> contato com tais anunciantes,
            portanto, não podemos indicar ninguém, infelizmente!
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Porque muitas vagas não dão retorno ao candidato?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            Porque recebem tantos currículo que fica impossivel entrar em
            contato com cada um.
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Recebi uma proposta de emprego, mas exigem que eu pague por um
              curso. É golpe?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive height={440}>
              <Typography>
                Sim! Qualquer vaga que exija pagamento prévio para "ser
                selecionado" ou que tente lhe vender algum curso provavelmente é
                golpe. Favor denunciar
                <a
                  target="_blank"
                  href={`mailto:${appEnv.appEmail}?subject=Denuncia%20de%20Vaga&body=Bom+dia%21+Venho+por+meio+desta+mensagem+denunciar+a+vaga+https://empregourgente.com/posts/${post.slug}%0D%0A%0D%0AMotivos: %0D%0A - DIGITE AQUI O MOTIVO %0D%0A%0D%0AObrigado`}
                >
                  clicando aqui
                </a>
              </Typography>
              <br />
            </VideoResponsive>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </FAQContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  h2 {
    padding-left: 3rem;
    padding-right: 3rem;
    flex: 100%;
    margin-bottom: 0;
  }
`;

const FAQContainer = styled.div`
  padding: 3rem;
  flex: 100%;
  max-width: 900px;
`;
