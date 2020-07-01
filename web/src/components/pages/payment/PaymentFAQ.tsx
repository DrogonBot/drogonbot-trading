import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { ExpansionPanelTitle } from '../../../pages/payment';

export const PaymentFAQ: React.FC = () => {
  return (
    <Container>
      <h2>Perguntas Frequentes</h2>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ExpansionPanelTitle>
            Porque necessito do CPF para pagamento do boleto?
          </ExpansionPanelTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Desde 2017, bancos exigem que o pagador forneca o CPF para emissão
            do boleto.{" "}
            <a
              target="_blank"
              href="http://g1.globo.com/jornal-nacional/noticia/2016/10/boletos-deverao-apresentar-cpf-do-pagador-partir-de-2017.html"
            >
              Clique aqui para maiores informações.
            </a>
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
            Porque há cobrança pelo uso do sistema no Emprego Urgente?
          </ExpansionPanelTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Precisamos limitar o uso do sistema de forma que existam
            oportunidades para todos, de forma equilibrada. Caso não realizemos
            tal cobrança, a concorrência traria menos resultados para os
            aplicantes. Além disso, somos uma empresa como qualquer outra e
            possuímos contas e funcionários a pagar.
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
            Quem é "João Paulo Furtado Silva", favorecido do boleto gerado?
          </ExpansionPanelTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            É o diretor do Emprego Urgente. Não há motivos para preocupações.
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
            Quanto tempo devo aguardar para compensar os boletos pagos?
          </ExpansionPanelTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Se você pagou por boleto bancário, a compensação deverá ocorrer em
            até 72 horas úteis após o pagamento. Caso demore além do prazo
            prazo, favor enviar um e-mail para {appEnv.appEmail}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <ExpansionPanelTitle>
            Caso eu não pague um boleto gerado, meu nome vai para o Serasa/SPC?
          </ExpansionPanelTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Não. Não cobramos multa ou juros. Apenas gere outro boleto.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Container>
  );
};

const Container = styled.div``;
