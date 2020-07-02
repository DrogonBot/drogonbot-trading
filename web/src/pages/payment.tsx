import CreditCardIcon from '@material-ui/icons/CreditCard';
import DescriptionIcon from '@material-ui/icons/Description';
import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Body, PageContent } from '../components/elements/common/layout';
import { RadioIcon } from '../components/elements/form/RadioIcon';
import { AuthenticatedPage } from '../components/pages/AuthenticatedPage';
import { Footer } from '../components/pages/index/Footer';
import { Header } from '../components/pages/index/Header/Header';
import { BoletoPayment } from '../components/pages/payment/BoletoPayment';
import { CreditCardPayment } from '../components/pages/payment/CreditCardPayment';
import { PaymentFAQ } from '../components/pages/payment/PaymentFAQ';
import { SearchLogo } from '../components/pages/posts/SearchLogo';
import { SearchHeader } from '../components/pages/posts/SearchTop';
import { appEnv } from '../constants/Env.constant';
import { colors } from '../constants/UI/Colors.constant';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { IProvince } from '../types/Form.types';
import { PaymentTypes } from '../types/Payment.types';

interface IProps {
  provinces: IProvince[];
}

const Payment = ({ provinces }: IProps) => {
  const [paymentType, setPaymentType] = useState<PaymentTypes>(
    PaymentTypes.CREDIT_CARD
  );

  const onChangePaymentType = (e) => {
    if (e.target?.value) {
      setPaymentType(e.target.value);
    } else {
      setPaymentType(e);
    }
  };

  const onRenderPaymentPanel = () => {
    switch (paymentType) {
      case PaymentTypes.BOLETO:
        return <BoletoPayment />;

      case PaymentTypes.CREDIT_CARD:
        return <CreditCardPayment />;
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
        <SearchHeader>
          <SearchLogo />
        </SearchHeader>

        <PageContent>
          <h1>Compre Créditos</h1>

          <p>
            <strong>Preço: R$19.90 por 60 créditos</strong>
          </p>

          <PaymentSelectorContainer>
            <CreditCardContainer
              onClick={() => onChangePaymentType(PaymentTypes.CREDIT_CARD)}
            >
              <RadioIcon
                text={"Cartão de Crédito"}
                customicon={<CreditCardIcon />}
                checked={paymentType === PaymentTypes.CREDIT_CARD}
                onChange={onChangePaymentType}
                value={PaymentTypes.CREDIT_CARD}
                name="payment-type-radio"
                inputProps={{ "aria-label": paymentType }}
              />
            </CreditCardContainer>

            <BoletoContainer
              onClick={() => onChangePaymentType(PaymentTypes.BOLETO)}
            >
              <RadioIcon
                text={"Boleto Bancário"}
                customicon={<DescriptionIcon />}
                checked={paymentType === PaymentTypes.BOLETO}
                onChange={onChangePaymentType}
                value={PaymentTypes.BOLETO}
                name="payment-type-radio"
                inputProps={{ "aria-label": paymentType }}
              />
            </BoletoContainer>
          </PaymentSelectorContainer>

          <PaymentPanel>{onRenderPaymentPanel()}</PaymentPanel>

          <PaymentFAQ />

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

const PaymentPanel = styled.div`
  padding: 2.5%;
  margin-bottom: 4rem;
`;

const PaymentSelectorContainer = styled.div`
  margin-bottom: 3rem;
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
`;

const BoletoContainer = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreditCardContainer = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExpansionPanelTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.silver};
`;

export default Payment;
