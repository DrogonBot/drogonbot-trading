import { MenuItem, Select } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  // const [hookProvince, setHookProvince] = useState<string>(searchProvince);
  // const [hookCity, setHookCity] = useState<string>(searchCity);
  // const [hookKeyword, setHookKeyword] = useState<string>("");

  const [firstCityOption, setFirstCityOption] = useState<string>("");

  const cities = useSelector<AppState, ICity[]>(
    (state) => state.formReducer.cities
  );

  // on component load, fetch cities
  useEffect(() => {
    dispatch(loadProvinceCities(appEnv.appCountry, searchProvince));
  }, []);

  // set first city option, when fetching cities
  useEffect(() => {
    if (!cities.includes(searchCity)) {
      console.log("SETTING CITY TO ALL");
      setFirstCityOption("all");
      // dispatch(setSearchKey("searchCity", "all"));
    }
  }, [cities]);

  // If updated searchCity or searchProvince, lets do a router push to update user data statically
  useEffect(() => {
    if (router.pathname.includes("/posts?")) {
      router.push({
        pathname: "/posts",
        query: {
          searchProvince,
          searchCity,
          searchKeyword,
          page: 1, // since its a new search, page will be always 1!
        },
      });
    }
  }, [searchCity, searchProvince]);

  const onRenderProvinces = () => {
    return provinces.map((province: IProvince) => (
      <MenuItem key={province.stateName} value={province.stateCode}>
        {province.stateCode}
      </MenuItem>
    ));
  };
  const onRenderCities = () => {
    return cities.map((city: ICity) => (
      <MenuItem key={city.name} value={city.name}>
        {city.name}
      </MenuItem>
    ));
  };

  const onChangeProvince = (e) => {
    dispatch(setSearchKey("searchProvince", e.target.value));
    dispatch(setSearchKey("searchCity", "all"));
    dispatch(loadProvinceCities(appEnv.appCountry, e.target.value));
  };

  const onChangeCity = (e) => {
    dispatch(setSearchKey("searchCity", e.target.value));
  };

  return (
    <Container>
      <ProvincesContainer>
        <Select
          value={defaultProvince || searchProvince}
          onChange={onChangeProvince}
        >
          {onRenderProvinces()}
        </Select>
      </ProvincesContainer>
      <CitiesContainer>
        <Select
          value={searchCity || firstCityOption || ""}
          onChange={onChangeCity}
        >
          <MenuItem key={"all"} value={"all"}>
            {TS.string("form", "locationAllCities")}
          </MenuItem>
          {onRenderCities()}
        </Select>
      </CitiesContainer>
    </Container>
  );
};

const ProvincesContainer = styled.div`
  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}) {
    margin-bottom: 0.5rem;
  }
`;

const CitiesContainer = styled.div``;

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
