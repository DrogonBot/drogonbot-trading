import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import styled from 'styled-components';

import { appEnv } from '../../../../constants/Env.constant';
import { ExpansionPanelTitle } from '../../../../pages/payment';
import { IPost } from '../../../../types/Post.types';

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
              Porque muitas vagas não dão retorno ao candidato?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <iframe
                src="https://www.youtube.com/embed/WzSQZS_cEZs?start=145"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoResponsive>
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
            <VideoResponsive>
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

              <iframe
                src="https://www.youtube.com/embed/x4NQpxLr5FU"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoResponsive>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Dicas para envio de currículo por E-MAIL
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/D5HXP8OyFI0"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoResponsive>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Envio meu currículo porém sem resultados até o momento. Como posso
              melhorar?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <iframe
                src="https://www.youtube.com/embed/tW3I0XYJyE0"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <iframe
                src="https://www.youtube.com/embed/0MxvryGnDwc?start=145"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />{" "}
            </VideoResponsive>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Quais são as principais perguntas de uma entrevista de emprego?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <iframe
                src="https://www.youtube.com/embed/qejkRftycSI"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoResponsive>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Meu primeiro emprego. E agora?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <iframe
                src="https://www.youtube.com/embed/dK9-W918_eM"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoResponsive>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Fui selecionado para uma entrevista. Como me preparar?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <iframe
                src="https://www.youtube.com/embed/WfsKmRbBv7A?start=145"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoResponsive>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Procuro emprego mas não possuo experiência. E agora?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <iframe
                src="https://www.youtube.com/embed/uSYY3AQpr0k?start=145"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
const VideoResponsive = styled.div`
  width: 100%;

  iframe {
    width: 100%;
    height: 440px;
  }
`;
