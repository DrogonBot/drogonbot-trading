import { Radio } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';

interface IProps {
  customIcon: JSX.Element;
  text: string;
  checked: boolean;
  onChange: (e: any) => void;
  value: string;
  name: string;
  inputProps: Object;
}

export const RadioIcon: React.FC<IProps> = (props) => {
  const Icon = () => props.customIcon;

  return (
    <RadioIconContainer isChecked={props.checked}>
      <IconContainer>
        <Icon />
      </IconContainer>
      <div className="radio-icon-text">{props.text}</div>
      <RadioContainer>
        <Radio {...props} />
      </RadioContainer>
    </RadioIconContainer>
  );
};

const RadioIconContainer = styled.div`
  max-width: 140px;
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  border: 1px solid ${colors.lightSilver};
  border-radius: 5%;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  ${(props) =>
    props.isChecked &&
    `
  -webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.21);
-moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.21);
box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.21);
transition: box-shadow 0.3s ease-in-out;
  `}

  .radio-icon-text {
    flex: 100%;
    color: ${colors.silver};

    text-align: center;
    font-size: 1rem;

    margin-top: 0.5rem;
  }

  .MuiRadio-root {
    flex: 100%;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex: 100%;

  svg {
    flex: 100%;
    font-size: 2.5rem;
    color: ${colors.silver};
  }
`;

const RadioContainer = styled.div`
  margin: 0 auto;
`;
