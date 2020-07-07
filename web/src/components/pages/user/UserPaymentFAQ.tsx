import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { ExpansionPanelTitle } from '../../../pages/payment';
import { AccentText } from '../../elements/common/layout';

export const UserPaymentFAQ: React.FC = () => {
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
              <AccentText>Quais regras devo seguir?</AccentText>
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <p>
                Na <AccentText>suspeita</AccentText> de qualquer violação
                abaixo, sua conta será suspensa e seu saldo zerado. Nenhum valor
                será pago.
              </p>
              <ul>
                <li> Não clicar nos próprios links.</li>
                <li>
                  Não solicitar amigos/parentes para clicar nos seus links.
                </li>
                <li>
                  Não utilizar quaisquer métodos fraudulentos para
                  artificialmente aumentar seus cliques.
                </li>
                <li>
                  Solicitar apenas pessoas dos grupos indicados (ou similares)
                  para acessarem seus links.
                </li>
              </ul>
              <p>
                Antes de quaisquer pagamentos as informações contidas nos seus
                creditos serão verificadas, quanto a veracidade.
              </p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Quanto tempo até eu receber meu saque?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Em média, 3 a 5 dias úteis. Caso demore mais do que isso, envie um
              e-mail para {appEnv.appEmail}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ExpansionPanelTitle>
              Tenho duvidas sobre meu pagamento. Como devo proceder?
            </ExpansionPanelTitle>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <VideoResponsive>
              <Typography>
                Favor entrar em contato{" "}
                <a
                  target="_blank"
                  href={`whatsapp://send?abid=17788467427&text=${encodeURI(
                    "Ei, bom dia. Gostaria de mais informações sobre meu pagamento."
                  )}`}
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
    flex: 100%;
    margin-bottom: 0;
  }
`;

const FAQContainer = styled.div`
  padding-top: 1rem;
  flex: 100%;
  max-width: 900px;
  width: 80%;
`;
const VideoResponsive = styled.div`
  width: 100%;

  iframe {
    width: 100%;
    height: 440px;
  }
`;
