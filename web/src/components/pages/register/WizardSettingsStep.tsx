import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { InputContainer } from '../../elements/common/layout';
import { LocationDropdown } from '../../elements/form/LocationDropdown';
import { PositionsOfInterest } from '../../elements/form/PositionsOfInterest';

interface IProps {
  jobRoles: string[];
}

export const WizardSettingsStep = ({ jobRoles }: IProps) => {
  return (
    <Container>
      <InputContainer>
        <PositionsOfInterest
          jobRoles={jobRoles}
          onChange={(values) => {
            console.log("Save POI on redux");
            console.log(values);
          }}
        />
      </InputContainer>
      <Form>
        <LocationDropdown
          initialCountry={TS.string("resume", "resumeSelectedCountry")}
          showCountry={false}
          onChange={(e) => console.log(e)}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form``;
