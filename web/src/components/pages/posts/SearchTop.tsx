import styled from 'styled-components';

import { UI } from '../../../constants/UI/UI.constant';
import { IProvince } from '../../../types/Form.types';
import { SearchBar } from './SearchBar';
import { SearchLogo } from './SearchLogo';

interface IProps {
  provinces: IProvince[];
  defaultProvince?: string | string[];
}

export const SearchTop = ({ provinces, defaultProvince }: IProps) => {
  return (
    <SearchHeader>
      <SearchLogo />
      <SearchBar provinces={provinces} defaultProvince={defaultProvince} />
    </SearchHeader>
  );
};

export const SearchHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 8;
    margin-top: 1rem;
  }
`;
