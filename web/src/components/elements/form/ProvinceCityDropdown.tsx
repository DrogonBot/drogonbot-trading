import { MenuItem, Select } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { colors } from '../../../constants/UI/Colors.constant';
import { UI } from '../../../constants/UI/UI.constant';
import { TS } from '../../../helpers/LanguageHelper';
import { loadProvinceCities } from '../../../store/actions/form.actions';
import { setSearchKey } from '../../../store/actions/ui.action';
import { AppState } from '../../../store/reducers/index.reducers';
import { ICity, IProvince } from '../../../types/Form.types';

interface IProps {
  provinces: IProvince[];
  defaultProvince?: string;
}

export const ProvinceCityDropdown = ({
  provinces,
  defaultProvince,
}: IProps) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { searchKeyword } = router.query;

  const { searchProvince, searchCity } = useSelector<AppState, any>(
    (state) => state.uiReducer
  );

  const cities = useSelector<AppState, ICity[]>(
    (state) => state.formReducer.cities
  );

  useEffect(() => {
    // when loading component or changing our searchProvince, fetch all respective cities

    //  fetch cities corresponding to this new province
    dispatch(loadProvinceCities(appEnv.appCountry, searchProvince));
  }, [searchProvince]);

  const onChangeProvince = async (e) => {
    console.log(`changing province to ${e.target.value}`);
    const selectedProvince = e.target.value;

    //  update our redux (we'll need this info for our post requests)
    await dispatch(setSearchKey("searchProvince", selectedProvince));
    await dispatch(setSearchKey("searchKeyword", ""));

    router.push({
      pathname: "/posts",
      query: {
        searchProvince: e.target.value,
        searchKeyword,
        page: 1, // since its a new search, page will be always 1!
      },
    });
  };

  const onRenderProvinces = () => {
    return provinces.map((province: IProvince) => (
      <MenuItem key={province.stateName} value={province.stateCode}>
        {province.stateCode}
      </MenuItem>
    ));
  };
  const onRenderCities = () => {
    if (!cities) {
      return (
        <MenuItem key={"loading"} value={""}>
          {TS.string("global", "genericLoading")}
        </MenuItem>
      );
    }

    return cities.map((city: ICity) => (
      <MenuItem key={city.name} value={city.name}>
        {city.name}
      </MenuItem>
    ));
  };

  return (
    <Container>
      <Select
        value={defaultProvince || searchProvince}
        onChange={onChangeProvince}
      >
        {onRenderProvinces()}
      </Select>
      <Select value={searchCity} onChange={null}>
        {onRenderCities()}
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
