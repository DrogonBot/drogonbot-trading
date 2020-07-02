import { Button, Grid, TextField } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  CEP_MASK,
  CPF_MASK,
  CREDIT_CARD_AMEX_CVC,
  CREDIT_CARD_AMEX_MASK,
  CREDIT_CARD_CVC_MASK_DEFAULT,
  CREDIT_CARD_MASK_DEFAULT,
} from '../../../constants/payment.constant';
import { APIHelper } from '../../../helpers/APIHelper';
import { PaymentHelper } from '../../../helpers/PaymentHelper';
import { userGetProfileInfo } from '../../../store/actions/user.actions';
import { AppState } from '../../../store/reducers/index.reducers';
import { ICreditCard } from '../../../types/Payment.types';
import { IAlertInfo } from '../../../types/UI.types';
import { IUser } from '../../../types/User.types';

export const CreditCardPayment: React.FC = (props) => {
  const dispatch = useDispatch();

  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  const router = useRouter();

  const [creditCardMask, setCreditCardMask] = useState<string>(
    CREDIT_CARD_MASK_DEFAULT
  );
  const [cvcMask, setCvcMask] = useState(CREDIT_CARD_CVC_MASK_DEFAULT);

  const [creditCard, setCreditCard] = useState<ICreditCard>({
    name: user?.name,
    number: "",
    cvc: "",
    expiry: "",
    focus: "",
  });

  const [userInfo, setUserInfo] = useState({
    buyerName: user?.name,
    buyerCPF: "",
    buyerEmail: user?.email,
    buyerStreet: "",
    buyerNumber: "",
    buyerComplement: "",
    buyerNeighborhood: "",
    buyerCity: user?.city,
    buyerState: user?.stateCode,
    buyerPostCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<IAlertInfo | null>(null);

  const handleInputFocus = (e) => {
    setCreditCard({ ...creditCard, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      // If our credit card number starts with 34 or 37, its an Amex number, that has a slightly different mask
      if (/^3[47]/.test(value)) {
        setCreditCardMask(CREDIT_CARD_AMEX_MASK);
        setCvcMask(CREDIT_CARD_AMEX_CVC); // 4 digit CVC
      } else {
        setCreditCardMask(CREDIT_CARD_MASK_DEFAULT);
        setCvcMask(CREDIT_CARD_CVC_MASK_DEFAULT);
      }
    }

    setCreditCard({
      ...creditCard,
      [name]: value,
    });
  };

  const handleUserInfoChange = (e) => {
    const name: string = e.target.name;
    let value: string = e.target.value;

    if (name === "buyerState") {
      value = value.toUpperCase();
    }

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const onHandleCreditCardPayment = async () => {
    // validate payment!

    const creditCardHash = await PaymentHelper.validateAndGenerateCreditCardHash(
      creditCard
    );

    console.log("CREDIT CARD HASH");
    console.log(creditCardHash);

    // submit hash with request to our backend

    const preparedCPF = userInfo.buyerCPF.replace(/-/g, "").replace(/\./g, "");

    const {
      buyerStreet,
      buyerNumber,
      buyerComplement,
      buyerNeighborhood,
      buyerCity,
      buyerState,
      buyerPostCode,
    } = userInfo;

    const preparedPostCode = buyerPostCode.replace(new RegExp("-", "g"), "");

    const paymentServerPayload = {
      buyerCreditCardHash: creditCardHash,
      buyerName: creditCard.name,
      buyerCPF: preparedCPF,
      buyerEmail: userInfo.buyerEmail,
      buyerAddress: {
        street: buyerStreet,
        number: buyerNumber,
        complement: buyerComplement,
        neighborhood: buyerNeighborhood,
        city: buyerCity,
        state: buyerState,
        postCode: preparedPostCode,
      },
    };

    console.log(paymentServerPayload);

    const response = await APIHelper.request(
      "POST",
      "/transaction/checkout/creditcard",
      paymentServerPayload,
      true
    );

    console.log(response.data);

    if (response.data.status === "error") {
      setPaymentInfo({
        message: response.data.message,
        type: "error",
      });
      return;
    }

    const paymentPayload = response.data.payments[0];

    const isSuccessful = paymentPayload.status === "CONFIRMED";

    if (isSuccessful) {
      setPaymentInfo({
        message: "Pagamento processado com sucesso!",
        type: "success",
      });
      // refresh user info
      dispatch(userGetProfileInfo());

      router.push("/");
    } else {
      setPaymentInfo({
        message: paymentPayload.failReason,
        type: "error",
      });
    }

    console.log(response.data);
  };

  return (
    <Container>
      <CardsContainer>
        <Cards
          cvc={creditCard.cvc}
          expiry={creditCard.expiry}
          focused={creditCard.focus}
          name={creditCard.name}
          number={creditCard.number}
        />
      </CardsContainer>

      <CardInfoContainer>
        <h3>Dados do Cartão de Crédito</h3>
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Seu Nome"
                type="text"
                value={creditCard.name}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                variant={"outlined"}
                fullWidth
                size="small"
                helperText="Nome no Cartão de Crédito"
              />
            </Grid>

            <Grid item xs={12}>
              <InputMask
                mask={creditCardMask}
                maskChar="x"
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                value={creditCard.number}
              >
                {() => (
                  <TextField
                    name="number"
                    label="Número do Cartão"
                    type="text"
                    variant={"outlined"}
                    fullWidth
                    size="small"
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={6}>
              <InputMask
                mask={"99/99"}
                maskChar="x"
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                value={creditCard.expiry}
              >
                {() => (
                  <TextField
                    name="expiry"
                    label="Data de expiração"
                    type="text"
                    variant={"outlined"}
                    fullWidth
                    size="small"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6}>
              <InputMask
                mask={cvcMask}
                maskChar="x"
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                value={creditCard.cvc}
              >
                {() => (
                  <TextField
                    name="cvc"
                    label="CVC"
                    type="text"
                    variant={"outlined"}
                    fullWidth
                    size="small"
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
        </Form>
      </CardInfoContainer>

      <UserInfoContainer>
        <h3>Dados para Pagamento</h3>
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="buyerEmail"
                label="E-mail"
                type="text"
                value={userInfo.buyerEmail}
                onChange={handleUserInfoChange}
                variant={"outlined"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <InputMask
                mask={CPF_MASK}
                maskChar="x"
                onChange={handleUserInfoChange}
                value={userInfo.buyerCPF}
              >
                {() => (
                  <TextField
                    name="buyerCPF"
                    label="CPF"
                    type="text"
                    variant={"outlined"}
                    fullWidth
                    size="small"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="buyerStreet"
                label="Rua/Av."
                type="text"
                variant={"outlined"}
                fullWidth
                size="small"
                onChange={handleUserInfoChange}
                value={userInfo.buyerStreet}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="buyerNumber"
                label="Número"
                type="text"
                variant={"outlined"}
                fullWidth
                size="small"
                onChange={handleUserInfoChange}
                value={userInfo.buyerNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="buyerNeighborhood"
                label="Bairro"
                type="text"
                variant={"outlined"}
                fullWidth
                size="small"
                onChange={handleUserInfoChange}
                value={userInfo.buyerNeighborhood}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="buyerComplement"
                label="Complemento"
                type="text"
                variant={"outlined"}
                fullWidth
                size="small"
                onChange={handleUserInfoChange}
                value={userInfo.buyerComplement}
                helperText="Exemplo: Ao lado da padaria xyz..."
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="buyerCity"
                label="Cidade"
                type="text"
                variant={"outlined"}
                fullWidth
                size="small"
                onChange={handleUserInfoChange}
                value={userInfo.buyerCity}
              />
            </Grid>
            <Grid item xs={4}>
              <InputMask
                mask={"aa"}
                maskChar="x"
                onChange={handleUserInfoChange}
                value={userInfo.buyerState}
              >
                {() => (
                  <TextField
                    name="buyerState"
                    label="Estado"
                    type="text"
                    variant={"outlined"}
                    fullWidth
                    size="small"
                    helperText={"Duas letras apenas. Ex: SP"}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={4}>
              <InputMask
                mask={CEP_MASK}
                maskChar="x"
                onChange={handleUserInfoChange}
                value={userInfo.buyerPostCode}
              >
                {() => (
                  <TextField
                    name="buyerPostCode"
                    label="CEP"
                    type="text"
                    variant={"outlined"}
                    fullWidth
                    size="small"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CreditCardIcon />}
                onClick={onHandleCreditCardPayment}
                size="large"
                fullWidth
              >
                Pagar
              </Button>
            </Grid>
            <Grid item xs={12}>
              {paymentInfo && (
                <Alert severity={paymentInfo.type}>{paymentInfo.message}</Alert>
              )}
            </Grid>
          </Grid>
        </Form>
      </UserInfoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardsContainer = styled.div`
  flex: 100%;
`;

const CardInfoContainer = styled.div`
  flex: 100%;
  margin-top: 2rem;
`;

const UserInfoContainer = styled.div`
  flex: 100%;
  max-width: 100%;
  margin-top: 2rem;
`;

const Form = styled.form`
  margin-top: 1.5rem;
`;
