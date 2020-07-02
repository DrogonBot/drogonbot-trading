import { Button, Grid, TextField } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import InputMask from 'react-input-mask';
import styled from 'styled-components';

import {
  CREDIT_CARD_AMEX_CVC,
  CREDIT_CARD_AMEX_MASK,
  CREDIT_CARD_CVC_MASK_DEFAULT,
  CREDIT_CARD_MASK_DEFAULT,
} from '../../../constants/payment.constant';
import { UI } from '../../../constants/UI/UI.constant';
import { PaymentHelper } from '../../../helpers/PaymentHelper';
import { ICreditCard } from '../../../types/Payment.types';

export const CreditCardPayment: React.FC = (props) => {
  const [creditCardMask, setCreditCardMask] = useState<string>(
    CREDIT_CARD_MASK_DEFAULT
  );
  const [cvcMask, setCvcMask] = useState(CREDIT_CARD_CVC_MASK_DEFAULT);

  const [creditCard, setCreditCard] = useState<ICreditCard>({
    name: "",
    number: "",
    cvc: "",
    expiry: "",
    focus: "",
  });

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

  const onHandleCreditCardPayment = async () => {
    // validate payment!

    const creditCardHash = await PaymentHelper.validateAndGenerateCreditCardHash(
      creditCard
    );

    console.log("CREDIT CARD HASH");
    console.log(creditCardHash);
  };

  return (
    <Container>
      <LeftColumn>
        <Cards
          cvc={creditCard.cvc}
          expiry={creditCard.expiry}
          focused={creditCard.focus}
          name={creditCard.name}
          number={creditCard.number}
        />
      </LeftColumn>

      <RightColumn>
        <form>
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
                    label="Número"
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
          </Grid>
        </form>
      </RightColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LeftColumn = styled.div`
  flex: 100%;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 50%;
  }
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const RightColumn = styled.div`
  flex: 100%;
  padding-left: 1.2rem;
  margin-top: 2rem;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 50%;
    margin-top: 0;
  }
`;
