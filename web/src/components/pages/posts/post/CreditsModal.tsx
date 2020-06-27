import React from 'react';

import { TS } from '../../../../helpers/LanguageHelper';
import { AlertModal } from '../../../elements/ui/AlertModal';

export const CreditsModal = () => {
  return (
    <AlertModal
      alertKey="credits-modal"
      title={TS.string("account", "noAccountCredits")}
      content={
        <>
          <p>Teste</p>
        </>
      }
      showDontShowAgain={true}
    />
  );
};
