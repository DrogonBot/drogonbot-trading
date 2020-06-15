import { Tooltip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { ToolTipText } from '../common/layout';

interface IProps {
  text: string;
  children: any;
}

export const ToolTipIcon = ({ text, children }: IProps) => {
  return (
    <Container>
      <Tooltip title={<ToolTipText>{text}</ToolTipText>}>{children}</Tooltip>
    </Container>
  );
};

const Container = styled.div``;
