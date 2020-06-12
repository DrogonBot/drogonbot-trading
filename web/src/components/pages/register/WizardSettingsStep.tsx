import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { updateNewAccount } from '../../../store/actions/form.actions';
import { AppState } from '../../../store/reducers/index.reducers';
import { INewAccount, UserType } from '../../../types/User.types';
import { FormItemContainer } from '../../elements/common/layout';
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
        <FormItemContainer>
          <PositionsOfInterest
            value={newAccount.genericPositionsOfInterest}
            jobRoles={jobRoles}
            onChange={(values) => {
              dispatch(
                updateNewAccount({
                  genericPositionsOfInterest: values,
                })
              );
            }}
          />
        </FormItemContainer>
      )}
      <Form>
        <LocationDropdown
          initialCountry={TS.string("resume", "resumeSelectedCountry")}
          initialProvince={newAccount.stateCode || "default"}
          initialCity={newAccount.city || "default"}
          showCountry={false}
          onChange={(e: ILocation) => {
            dispatch(
              updateNewAccount({
                country: e.country,
                stateCode: e.province,
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
