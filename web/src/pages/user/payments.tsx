import { Button, ButtonGroup } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { AccentText, Body, PageContent } from '../../components/elements/common/layout';
import { TermsOfService } from '../../components/elements/form/TermsOfService';
import { AuthenticatedPage } from '../../components/pages/AuthenticatedPage';
import { Footer } from '../../components/pages/index/Footer';
import { Header } from '../../components/pages/index/Header/Header';
import { SearchLogo } from '../../components/pages/posts/SearchLogo';
import { SearchHeader } from '../../components/pages/posts/SearchTop';
import { UserPaymentFAQ } from '../../components/pages/user/UserPaymentFAQ';
import { appEnv } from '../../constants/Env.constant';
import { colors } from '../../constants/UI/Colors.constant';
import { UI } from '../../constants/UI/UI.constant';
import { APIHelper } from '../../helpers/APIHelper';
import { GenericHelper } from '../../helpers/GenericHelper';
import { TS } from '../../helpers/LanguageHelper';
import { IProvince } from '../../types/Form.types';

interface IProps {
  provinces: IProvince[];
}

const Payments = ({ provinces }: IProps) => {
  const [creditsInfo, setCreditsInfo] = useState({
    paidCredits: 0,
    pendingPayment: 0,
    totalCredits: 0,
    totalIncome: 0,
    totalPaidCredits: 0,
    unpaidCredits: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await APIHelper.request("GET", "/credit", null, true);

      console.log(response.data);

      const {
        paidCredits,
        pendingPayment,
        totalCredits,
        totalIncome,
        totalPaidCredits,
        unpaidCredits,
      } = response.data;

      setChartData([
        { name: "Créditos Totais", qtd: Number(totalCredits) },
        { name: "Créditos Pagos", qtd: Number(paidCredits) },
        { name: "Créditos Não Pagos", qtd: Number(unpaidCredits) },
      ]);

      setCreditsInfo({
        paidCredits,
        pendingPayment,
        totalCredits,
        totalIncome,
        totalPaidCredits,
        unpaidCredits,
      });
    })();
  }, []);

  const onHandleWithdraw = () => {
    if (creditsInfo.pendingPayment < 25) {
      alert(
        "Você precisa de um saldo mínimo a receber de R$25.00 para solicitar uma retirada."
      );
      return;
    }

    GenericHelper.crossBrowserUrlRedirect(
      `whatsapp://send?abid=17788467427&text=${encodeURI(
        "Ei, bom dia. Gostaria de retirar meu saldo."
      )}`
    );
  };

  return (
    <AuthenticatedPage>
      <Head>
        <title>{`${appEnv.appName} | Pagamento`}</title>
        <meta property="description" content="Meus pagamentos" />
      </Head>
      <Header />

      <Body>
        <SearchHeader>
          <SearchLogo />
        </SearchHeader>

        <PageContent>
          <h1>Meus Pagamentos</h1>

          <Alert severity="info">Valor mínimo para saque: R$25.00.</Alert>

          <h2>Ações</h2>

          <ButtonContainer>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button onClick={onHandleWithdraw}>Solicitar Saque</Button>

              <Button>
                <Link href="/posts/share">
                  <a>Divulgar</a>
                </Link>
              </Button>
            </ButtonGroup>
          </ButtonContainer>
          <h2>Detalhes</h2>

          {creditsInfo && (
            <ColumnContainer>
              <ColumnLeft>
                <p>
                  <strong>Créditos Totais (cliques): </strong>
                  {creditsInfo.totalCredits}
                </p>
                <p>
                  <AccentText>
                    <strong>Saldo:</strong> R${" "}
                    {creditsInfo.pendingPayment.toFixed(2)}
                  </AccentText>
                </p>
                <p>
                  <strong>Créditos Pagos: </strong> {creditsInfo.paidCredits}
                </p>
                <p>
                  <strong>Créditos Não Pagos: </strong>{" "}
                  {creditsInfo.unpaidCredits}
                </p>
              </ColumnLeft>

              <ColumnRight>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} maxBarSize={30}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="qtd" fill={colors.primary} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </ColumnRight>
            </ColumnContainer>
          )}

          <UserPaymentFAQ />

          <TermsOfService href={`/terms?language=${appEnv.language}`}>
            {TS.string("terms", "tosAgree")}
          </TermsOfService>
        </PageContent>
      </Body>
      <Footer />
    </AuthenticatedPage>
  );
};

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  left: -2rem;
  margin: 0 auto;

  tspan {
    font-size: 0.9rem;
  }

  .recharts-legend-item-text {
    font-size: 0.9rem;
  }
`;

export const ButtonContainer = styled.div`
  a {
    color: white;
  }
`;

export const ExpansionPanelTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.silver};
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ColumnLeft = styled.div`
  flex: 100%;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 50%;
  }
`;
export const ColumnRight = styled.div`
  flex: 100%;
  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 50%;
  }
`;

export default Payments;
