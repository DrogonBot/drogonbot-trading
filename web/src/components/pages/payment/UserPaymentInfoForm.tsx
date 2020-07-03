import { Button, Grid, TextField } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { CEP_MASK, CPF_MASK } from '../../../constants/payment.constant';
import { AppState } from '../../../store/reducers/index.reducers';
import { IUser } from '../../../types/User.types';

interface IProps {
  onChange: (newUserInfo) => void;
  onTriggerPayment: () => void;
}

export const UserPaymentInfoForm: React.FC<IProps> = ({
  onChange,
  onTriggerPayment,
}) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

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

  useEffect(() => {
    onChange(userInfo);
  }, [userInfo]);

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

  return (
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
              onClick={() => onTriggerPayment()}
              size="large"
              fullWidth
            >
              Pagar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  flex: 100%;
  max-width: 100%;
  margin-top: 2rem;
`;

const Form = styled.form`
  margin-top: 1.5rem;
`;
