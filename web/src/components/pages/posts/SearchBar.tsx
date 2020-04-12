import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { UI } from '../../../constants/UI/UI.constant';
import { setSearchKey } from '../../../store/actions/ui.action';
import { IProvince } from '../../../types/Form.types';
import { ProvinceSelector } from '../../elements/form/ProvinceSelector';

interface IProps {
  provinces: IProvince[];
}

export const SearchBar = (props: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { searchProvince } = router.query;

  const [hookSearchInput, setHookSearchInput] = useState<string>("");

  const onSubmit = async e => {
    e.preventDefault();

    await dispatch(setSearchKey("searchKeyword", hookSearchInput));

    // console.log("submitted search!");

    // console.log(router.pathname);

    router.push({
      pathname: "/posts",
      query: {
        searchProvince,
        searchKeyword: hookSearchInput,
        page: 1 // since its a new search, page will be always 1!
      }
    });
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <SearchBarInput
        type="text"
        title="Search"
        onChange={e => setHookSearchInput(e.target.value)}
        value={hookSearchInput}
      />
      <ProvinceContainer>
        <ProvinceSelector provinces={props.provinces} />
      </ProvinceContainer>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  flex: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;

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
  flex: 20%;
  display: flex;
  justify-content: center;

  height: 3.3rem;
  padding-right: 1rem;

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

const SearchBarInput = styled.input`
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  height: 44px;
  background-image: url("/images/search.png");
  background-repeat: no-repeat;
  background-position: 98% 50%;
  font-size: 14px;
  padding-left: 20px;

  flex: 80%;

  :focus,
  :focus,
  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
`;
