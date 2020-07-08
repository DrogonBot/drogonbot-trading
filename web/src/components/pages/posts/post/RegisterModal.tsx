import React from 'react';
import styled from 'styled-components';

import { TS } from '../../../../helpers/LanguageHelper';
import { AlertModal } from '../../../elements/ui/AlertModal';
import { RegisterWizard } from '../../register/RegisterWizard';

interface IProps {
  jobRoles: string[];
}

export const RegisterModal: React.FC<IProps> = ({ jobRoles }) => {
  return (
    <AlertModal
      alertKey="register-modal"
      title={TS.string("account", "registerCreateYourAccount")}
      content={
        <Container>
          <p>
            Realize seu cadastro gratuito abaixo para ficar por dentro de todas
            as nossas oportunidades!
          </p>

          <RegisterWizard jobRoles={jobRoles} />
        </Container>
      }
      showDontShowAgain={true}
    />
  );
};

const Container = styled.div``;
