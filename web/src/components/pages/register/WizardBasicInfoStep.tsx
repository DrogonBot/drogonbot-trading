import { MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { UserType } from '../../../types/User.types';
import { InputContainer } from '../../elements/common/layout';
import { LocationDropdown } from '../../elements/form/LocationDropdown';

interface IProps {}

export const WizardBasicInfoStep = (props: IProps) => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState<
    string
  >("");
  const [userAccountType, setUserAccountType] = useState<string>("JobSeeker");

  const userAccountTypeOptions = [UserType.JobSeeker, UserType.Company];

  const handleUserAccountTypeChange = (e) => {
    setUserAccountType(e.target.value);
  };

  useEffect(() => {
    // Here we detect when the component is unmounting (basically, becoming hidden on user screen). This happens when the user click NEXT or PREVIOUS and it should save its content on redux, so we can create a payload from all steps that's going to be submitted to the server to register this user
    return () => {
      console.log("User finished this step! Saving on redux!");
    };
  }, []);

  return (
    <Container>
      <Form>
        <InputContainer>
          <TextField
            fullWidth
            label={TS.string("account", "registerInputName")}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </InputContainer>

        <LocationDropdown
          initialCountry={TS.string("resume", "resumeSelectedCountry")}
          showCountry={false}
          onChange={(e) => console.log(e)}
        />

        <InputContainer>
          <TextField
            fullWidth
            label={TS.string("account", "registerInputEmail")}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            fullWidth
            type="password"
            label={TS.string("account", "registerInputPassword")}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            fullWidth
            type="password"
            label={TS.string("account", "registerInputPasswordConfirmation")}
            value={userPasswordConfirmation}
            onChange={(e) => setUserPasswordConfirmation(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            select
            value={userAccountType}
            onChange={handleUserAccountTypeChange}
            fullWidth
            label={TS.string("account", "loginSelectAccountTypeTitle")}
          >
            {userAccountTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {TS.string("account", `account${option}`)}
              </MenuItem>
            ))}
          </TextField>
        </InputContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form``;
