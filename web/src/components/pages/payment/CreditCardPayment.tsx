import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import styled from 'styled-components';

import { UI } from '../../../constants/UI/UI.constant';

export const CreditCardPayment: React.FC = (props) => {
  const [creditCard, setCreditCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setCreditCard({ ...creditCard, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({
      ...creditCard,
      [name]: value,
    });
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
        <form autoComplete="off">
          <TextField
            name="name"
            label="Nome"
            type="text"
            value={creditCard.name}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
          />
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
`;

const RightColumn = styled.div`
  flex: 100%;
  padding-left: 1.2rem;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 50%;
  }
`;
