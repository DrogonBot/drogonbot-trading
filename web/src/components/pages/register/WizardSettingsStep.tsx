import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { updateNewAccount } from '../../../store/actions/form.actions';
import { AppState } from '../../../store/reducers/index.reducers';
import { INewAccount, UserType } from '../../../types/User.types';
import { InputContainer } from '../../elements/common/layout';
import { ILocation, LocationDropdown } from '../../elements/form/LocationDropdown';
import { PositionsOfInterest } from '../../elements/form/PositionsOfInterest';

interface IProps {
  jobRoles: string[];
}

export const WizardSettingsStep = ({ jobRoles }: IProps) => {
  const dispatch = useDispatch();

  const newAccount = useSelector<AppState, INewAccount>(
    (state) => state.formReducer.newAccount
  );

  return (
    <Container>
      {newAccount.type === UserType.JobSeeker && (
        <InputContainer>
          <PositionsOfInterest
            value={newAccount.jobRoles}
            jobRoles={jobRoles}
            onChange={(values) => {
              dispatch(
                updateNewAccount({
                  jobRoles: values,
                })
              );
            }}
          />
        </InputContainer>
      )}
      <Form>
        <LocationDropdown
          initialCountry={TS.string("resume", "resumeSelectedCountry")}
          initialProvince={newAccount.province || null}
          initialCity={newAccount.city || null}
          showCountry={false}
          onChange={(e: ILocation) => {
            dispatch(
              updateNewAccount({
                country: e.country,
                province: e.province,
                city: e.city,
              })
            );
          }}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form``;
