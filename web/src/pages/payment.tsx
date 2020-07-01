import { Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Body, PageContainer, PageContent } from '../components/elements/common/layout';
import { AuthenticatedPage } from '../components/pages/AuthenticatedPage';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { appEnv } from '../constants/Env.constant';
import { colors } from '../constants/UI/Colors.constant';
import { APIHelper } from '../helpers/APIHelper';
import { GenericHelper } from '../helpers/GenericHelper';
import { TS } from '../helpers/LanguageHelper';
import { ValidationHelper } from '../helpers/ValidationHelper';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { AppState } from '../store/reducers/index.reducers';
import { IProvince } from '../types/Form.types';
import { paymentTypes } from '../types/Payment.types';
import { IUser } from '../types/User.types';

interface IProps {
  provinces: IProvince[];
}

const Payment = ({ provinces }: IProps) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  const [userName, setUserName] = useState<string>(user?.name);
  const [userCPF, setUserCPF] = useState<string>("");
  const [paymentType, setPaymentType] = useState<paymentTypes>("BOLETO");

  const onHandleGenerateBoleto = async () => {
    const numberOnlyCPF = userCPF.replace(/\D/g, ""); // remove all non numeric chars

    const paymentPayload = {
      buyerName: userName,
      buyerCPF: numberOnlyCPF,
      buyerEmail: user.email,
    };

    // Validation ========================================

    const invalidFields = ValidationHelper.validateKeyValue(paymentPayload, {
      optionalFields: [],
      fieldLabels: {
        buyerName: "Nome",
        buyerCPF: "CPF",
      },
    });

    if (invalidFields) {
      if (process.browser) {
        window.alert(
          `${TS.string(
            "global",
            "genericFollowingFieldsInvalid"
          )} ${invalidFields}`
        );
      }
      return;
    }

    const response = await APIHelper.request(
      "POST",
      "/transaction/checkout/boleto",
      paymentPayload,
      true
    );

    console.log(response.data);

    if (process.browser) {
      GenericHelper.crossBrowserUrlRedirect(response.data.installmentLink);
    }
  };

  return (
    <AuthenticatedPage>
      <Head>
        <title>{`${appEnv.appName} | Pagamento`}</title>
        <meta
          property="description"
          content="Compre créditos para utilizar o sistema"
        />
      </Head>
      <Header />

      <Body>
        <PageContainer>
          <SearchTop provinces={provinces} />
        </PageContainer>

        <PageContent>
          <h1>Compre Créditos</h1>

          <p>
            <strong>Preço: R$19.90 por 60 créditos</strong>
          </p>

          <PaymentSelectorContainer />

          <p>Digite seus dados abaixo para gerarmos um boleto:</p>

          <Field>
            <TextField
              fullWidth
              label={TS.string("account", "registerInputName")}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Field>

          <Field>
            <InputMask
              mask="999.999.999-99"
              disabled={false}
              maskChar="x"
              value={userCPF}
              onChange={(e) => {
                setUserCPF(e.target.value);
              }}
            >
              {() => <TextField fullWidth label={"CPF"} />}
            </InputMask>
          </Field>

          <FieldCenter>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DescriptionIcon />}
              onClick={onHandleGenerateBoleto}
            >
              Gerar Boleto
            </Button>
          </FieldCenter>

          <TOSContainer>
            <Link href={`/terms?language=${appEnv.language}`}>
              {TS.string("terms", "buttonTosAgree")}
            </Link>
          </TOSContainer>

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
                Desde 2017, bancos exigem que o pagador forneca o CPF para
                emissão do boleto.{" "}
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
                oportunidades para todos, de forma equilibrada. Caso não
                realizemos tal cobrança, a concorrência traria menos resultados
                para os aplicantes. Além disso, somos uma empresa como qualquer
                outra e possuímos contas e funcionários a pagar.
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
                É o diretor do Emprego Urgente. Não há motivos para
                preocupações.
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
                Se você pagou por boleto bancário, a compensação deverá ocorrer
                em até 72 horas úteis após o pagamento. Caso demore além do
                prazo prazo, favor enviar um e-mail para {appEnv.appEmail}
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
                Caso eu não pague um boleto gerado, meu nome vai para o
                Serasa/SPC?
              </ExpansionPanelTitle>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Não. Não cobramos multa ou juros. Apenas gere outro boleto.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <h2>Ainda precisa de ajuda?</h2>

          <p>
            Entre em contato via WhatsApp{" "}
            <a
              href={`https://wa.me/17788467427/?text=${encodeURIComponent(
                "Oi, tudo bem? Preciso de ajuda na compra de creditos do EmpregoUrgente!"
              )}`}
              target="_blank"
            >
              clicando aqui
            </a>
          </p>
        </PageContent>
      </Body>
      <Footer />
    </AuthenticatedPage>
  );
};

Payment.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

const PaymentSelectorContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid red;
`;

const TOSContainer = styled.p`
  font-size: 0.9rem;
  color: ${colors.silver};
  text-align: center;
`;

export const ExpansionPanelTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.silver};
`;

export const Field = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
export const FieldCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export default Payment;
