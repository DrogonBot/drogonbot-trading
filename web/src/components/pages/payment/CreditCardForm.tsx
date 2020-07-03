import { Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  CREDIT_CARD_AMEX_CVC,
  CREDIT_CARD_AMEX_MASK,
  CREDIT_CARD_CVC_MASK_DEFAULT,
  CREDIT_CARD_MASK_DEFAULT,
} from '../../../constants/payment.constant';
import { AppState } from '../../../store/reducers/index.reducers';
import { ICreditCard } from '../../../types/Payment.types';
import { IUser } from '../../../types/User.types';

interface IProps {
  onChange: (newCCInfo: ICreditCard) => void;
}

export const CreditCardForm: React.FC<IProps> = ({ onChange }) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

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

  useEffect(() => {
    onChange(creditCard);
  }, [creditCard]);

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
    </Container>
  );
};

const Container = styled.div``;

const CardsContainer = styled.div`
  flex: 100%;
`;

const CardInfoContainer = styled.div`
  flex: 100%;
  margin-top: 2rem;
`;

const Form = styled.form`
  margin-top: 1.5rem;
`;
