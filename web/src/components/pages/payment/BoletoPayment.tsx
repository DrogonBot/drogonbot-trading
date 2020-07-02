import { Button, TextField } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { APIHelper } from '../../../helpers/APIHelper';
import { GenericHelper } from '../../../helpers/GenericHelper';
import { TS } from '../../../helpers/LanguageHelper';
import { ValidationHelper } from '../../../helpers/ValidationHelper';
import { AppState } from '../../../store/reducers/index.reducers';
import { IUser } from '../../../types/User.types';
import { TermsOfService } from '../../elements/form/TermsOfService';

export const BoletoPayment: React.FC = (props) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  const [userName, setUserName] = useState<string>(user?.name);
  const [userCPF, setUserCPF] = useState<string>("");

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
    <Container>
      <h3>Boleto Bancário</h3>

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

      <TermsOfService href={`/terms?language=${appEnv.language}`}>
        {TS.string("terms", "buttonTosAgree")}
      </TermsOfService>
    </Container>
  );
};

const Container = styled.div``;

export const Field = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
export const FieldCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
