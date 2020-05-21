import { FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { updateNewAccount } from '../../../store/actions/form.actions';
import { UserType } from '../../../types/User.types';
import { InputContainer } from '../../elements/common/layout';

export const WizardBasicInfoStep = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userShowPassword, setUserShowPassword] = useState<boolean>(false);
  const [
    userShowPasswordConfirmation,
    setUserShowPasswordConfirmation,
  ] = useState<boolean>(false);
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
    return async () => {
      console.log("User finished this step! Saving on redux!");

      const newAccountData = {
        name: userName,
        email: userEmail,
        password: userPassword,
        passwordConfirmation: userPasswordConfirmation,
        type: userAccountType,
      };

      await dispatch(updateNewAccount(newAccountData));
    };
  }, [
    userName,
    userEmail,
    userPassword,
    userPasswordConfirmation,
    userAccountType,
  ]);

  const handleClickShowPassword = () => {
    setUserShowPassword(!userShowPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirmation = () => {
    setUserShowPasswordConfirmation(!userShowPasswordConfirmation);
  };

  const handleMouseDownPasswordConfirmation = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Form>
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
        <InputContainer>
          <TextField
            fullWidth
            label={TS.string("account", "registerInputName")}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <TextField
            fullWidth
            label={TS.string("account", "registerInputEmail")}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              {TS.string("account", "registerInputPassword")}
            </InputLabel>
            <Input
              type={userShowPassword ? "text" : "password"}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {userShowPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </InputContainer>
        <InputContainer>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              {TS.string("account", "registerInputPasswordConfirmation")}
            </InputLabel>
            <Input
              type={userShowPasswordConfirmation ? "text" : "password"}
              value={userPasswordConfirmation}
              onChange={(e) => setUserPasswordConfirmation(e.target.value)}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirmation}
                    onMouseDown={handleMouseDownPasswordConfirmation}
                  >
                    {userShowPasswordConfirmation ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </InputContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form``;
