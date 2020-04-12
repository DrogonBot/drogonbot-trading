import styled, { css } from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';
import { UI } from '../../../constants/UI/UI.constant';
import { TS } from '../../../helpers/LanguageHelper';

export const SearchTabs = () => {
  return (
    <>
      <TabList>
        <TabItem active={true}>{TS.string("ui", "tabJobs")}</TabItem>
        {/* <TabItem>NEWS</TabItem> */}
      </TabList>
      <Divisor />
    </>
  );
};

const TabList = styled.ul`
  flex: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const TabItem = styled.li`
  cursor: pointer;
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: ${({ active }) => (active ? colors.primary : colors.secondaryGray)};
  ${({ active }) =>
    active &&
    css`
      border-bottom: 2px solid ${colors.primary};
    `}
`;

const Divisor = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${colors.secondaryGray};

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    display: none;
  }
`;
