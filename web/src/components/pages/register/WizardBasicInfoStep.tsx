import { FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { updateNewAccount } from '../../../store/actions/form.actions';
import { UserType } from '../../../types/User.types';
import { InputContainer } from '../../elements/common/layout';

export const WizardBasicInfoStep = () => {
  const dispatch = useDispatch();

  // Fetch data from redux (this will repopulate fields even if we go next and then go back again)
  const { name, email, password, passwordConfirmation, type } = useSelector<
    any,
    any
  >((state) => state.formReducer.newAccount);

  const [userName, setUserName] = useState<string>(name);
  const [userEmail, setUserEmail] = useState<string>(email);
  const [userPassword, setUserPassword] = useState<string>(password);
  const [userShowPassword, setUserShowPassword] = useState<boolean>(false);
  const [
    userShowPasswordConfirmation,
    setUserShowPasswordConfirmation,
  ] = useState<boolean>(false);
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState<
    string
  >(passwordConfirmation);
  const [userAccountType, setUserAccountType] = useState<string>(type);

  const userAccountTypeOptions = [UserType.JobSeeker, UserType.Company];

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
            onChange={(e) => {
              dispatch(updateNewAccount("type", e.target.value));
              setUserAccountType(e.target.value);
            }}
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
            onChange={(e) => {
              dispatch(updateNewAccount("name", e.target.value));
              setUserName(e.target.value);
            }}
          />
        </InputContainer>

        <InputContainer>
          <TextField
            fullWidth
            label={TS.string("account", "registerInputEmail")}
            value={userEmail}
            onChange={(e) => {
              dispatch(updateNewAccount("email", e.target.value));
              setUserEmail(e.target.value);
            }}
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
              onChange={(e) => {
                dispatch(updateNewAccount("password", e.target.value));
                setUserPassword(e.target.value);
              }}
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
              onChange={(e) => {
                dispatch(
                  updateNewAccount("passwordConfirmation", e.target.value)
                );
                setUserPasswordConfirmation(e.target.value);
              }}
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
