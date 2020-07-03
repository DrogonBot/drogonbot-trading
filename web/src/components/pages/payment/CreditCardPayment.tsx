import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { APIHelper } from '../../../helpers/APIHelper';
import { TS } from '../../../helpers/LanguageHelper';
import { PaymentHelper } from '../../../helpers/PaymentHelper';
import { ValidationHelper } from '../../../helpers/ValidationHelper';
import { userGetProfileInfo } from '../../../store/actions/user.actions';
import { AppState } from '../../../store/reducers/index.reducers';
import { ICreditCard } from '../../../types/Payment.types';
import { IUser } from '../../../types/User.types';
import { TermsOfService } from '../../elements/form/TermsOfService';
import { CreditCardForm } from './CreditCardForm';
import { UserPaymentInfoForm } from './UserPaymentInfoForm';

export const CreditCardPayment: React.FC = (props) => {
  const dispatch = useDispatch();
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  const router = useRouter();

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

  const onHandleCreditCardPayment = async () => {
    // VALIDATION ========================================

    // Credit card validation

    const creditCardHash = await PaymentHelper.validateAndGenerateCreditCardHash(
      creditCard
    );

    if (!creditCardHash) {
      return;
    }

    // User info validation

    const invalidFields = ValidationHelper.validateKeyValue(userInfo, {
      optionalFields: [],
      fieldLabels: {
        buyerName: "Nome",
        buyerCPF: "CPF",
        buyerEmail: "E-mail",
        buyerStreet: "Rua",
        buyerNumber: "Número da rua/av.",
        buyerComplement: "Complemento da rua/av.",
        buyerNeighborhood: "Bairro",
        buyerCity: "Cidade",
        buyerState: "Estado",
        buyerPostCode: "CEP",
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

    const response = await APIHelper.request(
      "POST",
      "/transaction/checkout/creditcard",
      paymentServerPayload,
      true
    );

    if (!response.data) {
      alert(
        "Erro ao processar seu pagamento. Por favor, tente pagar via boleto."
      );
    }

    if (response.data.status === "error") {
      alert(`Erro: ${response.data.message}`);
      return;
    }

    const paymentPayload = response.data.payments[0];

    const isSuccessful = paymentPayload.status === "CONFIRMED";

    if (isSuccessful) {
      alert("Pagamento processado com sucesso");
      // refresh user info
      dispatch(userGetProfileInfo());

      router.push("/");
    } else {
      alert(`Erro: ${paymentPayload.failReason}`);
    }
  };

  return (
    <Container>
      <CreditCardForm onChange={(newCCInfo) => setCreditCard(newCCInfo)} />

      <UserPaymentInfoForm
        onChange={(newUserInfo) => setUserInfo(newUserInfo)}
        onTriggerPayment={() => onHandleCreditCardPayment()}
      />

      <TermsOfService href={`/terms?language=${appEnv.language}`}>
        {TS.string("terms", "buttonTosAgree")}
      </TermsOfService>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
