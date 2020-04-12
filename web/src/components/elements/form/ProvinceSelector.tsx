import { MenuItem, Select } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';
import { UI } from '../../../constants/UI/UI.constant';
import { setSearchKey } from '../../../store/actions/ui.action';
import { IProvince } from '../../../types/Form.types';

interface IProps {
  provinces: IProvince[];
}

export const ProvinceSelector = ({ provinces }: IProps) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { searchKeyword } = router.query;

  const { searchProvince } = useSelector<any, any>(state => state.uiReducer);

  const onChangeProvince = async e => {
    const selectedProvince = e.target.value;

    //  update our redux (we'll need this info for our post requests)
    await dispatch(setSearchKey("searchProvince", selectedProvince));

    if (!searchKeyword) {
      return;
    }

    router.push({
      pathname: "/posts",
      query: {
        searchProvince: e.target.value,
        searchKeyword,
        page: 1 // since its a new search, page will be always 1!
      }
    });
  };

  const onRenderProvinces = () => {
    return provinces.map((province: IProvince) => (
      <MenuItem key={province.stateName} value={province.stateCode}>
        {province.stateCode}
      </MenuItem>
    ));
  };

  return (
    <Container>
      <Select value={searchProvince} onChange={onChangeProvince}>
        {onRenderProvinces()}
      </Select>
    </Container>
  );
};

const Container = styled.div`
  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}) {
    border-bottom: 1px solid silver;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid ${colors.primary};
  }

  .MuiInputBase-root {
    height: 100%;
  }

  .MuiInput-underline:before {
    border-bottom: unset;
  }
`;
