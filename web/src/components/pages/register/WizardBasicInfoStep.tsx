import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';

interface IProps {}

export const WizardBasicInfoStep = (props: IProps) => {
  const [userName, setUserName] = useState<string>("");
  // const [userEmail, setUserEmail] = useState<string>("");
  // const [userPassword, setUserPassword] = useState<string>("");
  // const [userPasswordConfirmation, setUserPasswordConfirmation] = useState<
  //   string
  // >("");
  // const [userAccountType, setUserAccountType] = useState<string>("");

  return (
    <Container>
      <Form>
        {userName}
        <TextField
          id="standard-basic"
          label={TS.string("account", "registerInputName")}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
`;

const Form = styled.form``;
