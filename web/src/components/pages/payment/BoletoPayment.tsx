import DescriptionIcon from '@material-ui/icons/Description';
import React, { useState } from 'react';
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
import { UserPaymentInfoForm } from './UserPaymentInfoForm';

export const BoletoPayment: React.FC = (props) => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  const [userInfo, setUserInfo] = useState({
    buyerName: user?.name,
    buyerCPF: user?.cpf || "",
    buyerEmail: user?.email,
    buyerStreet: user?.street || "",
    buyerNumber: user?.streetNumber || "",
    buyerComplement: "",
    buyerNeighborhood: user?.streetNeighborhood || "",
    buyerCity: user?.city,
    buyerState: user?.stateCode,
    buyerPostalCode: user?.postalCode || "",
  });

  const onHandleGenerateBoleto = async () => {
    const numberOnlyCPF = userInfo.buyerCPF.replace(/\D/g, ""); // remove all non numeric chars

    const paymentPayload = {
      buyerName: userInfo.buyerName,
      buyerCPF: numberOnlyCPF,
      buyerEmail: userInfo.buyerEmail,
      buyerCity: userInfo.buyerCity,
      buyerState: userInfo.buyerState,
      buyerPostalCode: userInfo.buyerPostalCode,
      buyerStreet: userInfo.buyerStreet,
      buyerNumber: userInfo.buyerNumber,
      buyerNeighborhood: userInfo.buyerNeighborhood,
    };

    // Validation ========================================

    const invalidFields = ValidationHelper.validateKeyValue(paymentPayload, {
      optionalFields: [],
      fieldLabels: {
        buyerName: "Nome",
        buyerCPF: "CPF",
        buyerEmail: "E-mail",
        buyerCity: "Cidade",
        buyerState: "Estado",
        buyerPostalCode: "CEP",
        buyerStreet: "Rua/Av.",
        buyerNumber: "Número",
        buyerNeighborhood: "Bairro",
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
      "/subscription/boleto",
      paymentPayload,
      true
    );

    console.log(response.data);

    if (process.browser) {
      GenericHelper.crossBrowserUrlRedirect(response.data.links[1].href);
    }
  };

  return (
    <Container>
      <h3>Boleto Bancário</h3>

      <p>Digite seus dados abaixo para gerarmos um boleto:</p>

      <br />

      <UserPaymentInfoForm
        onChange={(newUserInfo) => setUserInfo(newUserInfo)}
        onTriggerPayment={() => onHandleGenerateBoleto()}
        paymentIcon={<DescriptionIcon />}
        paymentButtonText={"Gerar Boleto"}
      />

      <TermsOfService href={`/terms?language=${appEnv.language}`}>
        {TS.string("terms", "buttonTosAgree")}
      </TermsOfService>
    </Container>
  );
};

const Container = styled.div``;
