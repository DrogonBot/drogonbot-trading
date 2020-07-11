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
              <h2>SEÇÃO 5 - SISTEMA DE DIVULGAÇÃO</h2>
              <p>
                Ao utilizar nosso sistema de divulgação, você concorda que
                poderá ter sua{" "}
                <strong>
                  conta banida e o acesso ao Emprego-Urgente vetado{" "}
                </strong>{" "}
                por:
              </p>
              <ul>
                <li> Clicar nos próprios links.</li>
                <li>Solicitar amigos/parentes para clicar nos seus links.</li>
                <li>
                  Utilizar quaisquer métodos fraudulentos ou automatizado para
                  artificialmente aumentar seus cliques.
                </li>
              </ul>

              <p>
                Na <AccentText>suspeita</AccentText> de qualquer violação citada
                acima, ou a critério do Emprego-Urgente, sua conta pode ser
                banida e seu saldo zerado. Nesses casos, nenhum valor será pago
                e não lhe devemos nenhuma explicação.
              </p>

              <h3>5.1 - Pagamento de Saldo Pendente</h3>
              <p>
                Pagaremos saldos pendentes APENAS quando este atingir o valor
                mínimo para saque, via transferência bancária (TED), no prazo de
                3-5 dias úteis. Pagaremos apenas para contas de TITULAR com
                MESMO NOME do registrado no Emprego-Urgente (não depositaremos
                em contas de terceiros){" "}
              </p>

              <h3>5.2 - Banimento em redes sociais</h3>
              <p>
                Você concorda que a divulgação em redes sociais executadas são
                de inteira responsabilidade sua. Não nos responsabilizamos por
                banimentos de contas em redes sociais.
              </p>

              <h3>5.3 - Não Vínculo</h3>

              <p>
                Ao utilizar o sistema de divulgadores do Emprego-Urgente você
                concorda que possui autonomia para:
              </p>
              <ul>
                <li>Decidir quando, onde e como irá trabalhar.</li>
                <li>
                  Decidir a forma como irá executar sua divulgação (Apenas
                  sugerimos modelos de textos, porém a decisão final de usar ou
                  não é sua).
                </li>
                <li>
                  Solicitar que outra pessoa divulgue em seu nome, usando seu
                  link do Emprego-Urgente.
                </li>
              </ul>
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
