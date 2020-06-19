import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { UI } from '../../../constants/UI/UI.constant';
import { GAnalyticsHelper } from '../../../helpers/GAnalyticsHelper';
import { setSearchKey } from '../../../store/actions/ui.action';
import { IProvince } from '../../../types/Form.types';
import { ProvinceCityDropdown } from '../../elements/form/ProvinceCityDropdown';

interface IProps {
  provinces: IProvince[];
  defaultProvince?: any;
}

export const SearchBar = ({ provinces, defaultProvince }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { searchProvince } = router.query;

  const [hookSearchInput, setHookSearchInput] = useState<string>("");

  const onSubmit = async (e) => {
    e.preventDefault();

    GAnalyticsHelper.logEvent("search", hookSearchInput);

    await dispatch(setSearchKey("searchKeyword", hookSearchInput));

    // console.log("submitted search!");

    // console.log(router.pathname);

    router.push({
      pathname: "/posts",
      query: {
        searchProvince: searchProvince || defaultProvince,
        searchKeyword: hookSearchInput,
        page: 1, // since its a new search, page will be always 1!
      },
    });
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <ProvinceContainer>
        <ProvinceCityDropdown
          provinces={provinces}
          defaultProvince={defaultProvince}
        />
      </ProvinceContainer>

      <SearchBarInputContainer>
        <SearchBarInput
          type="text"
          title="Search"
          onChange={(e) => setHookSearchInput(e.target.value)}
          value={hookSearchInput}
        />
        <SearchBarInputIcon onClick={onSubmit} />
      </SearchBarInputContainer>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  padding: 1rem;
  flex: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  max-width: 100%;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 7;
    justify-content: center;
    align-items: center;
    display: flex;
    max-width: 700px;

    margin-left: 4rem;
  }
`;

const ProvinceContainer = styled.div`
  flex: 100%;
  margin-bottom: 1rem;
  text-align: center;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    width: 100%;
    max-width: 70px;
  }

  [class*="MuiInput"] {
    width: 100%;
    border-radius: 24px;
    padding-right: 5px;
  }
`;

const SearchBarInputContainer = styled.div`
  position: relative;
  flex: auto;
`;

const SearchBarInputIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0.5rem;
  width: 44px;
  height: 44px;
  background-image: url("/images/search.png");
  background-repeat: no-repeat;
  background-position: 98% 50%;
`;

const SearchBarInput = styled.input`
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  height: 44px;
  font-size: 14px;
  padding-left: 20px;
  width: 100%;

  :focus,
  :focus,
  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
`;
