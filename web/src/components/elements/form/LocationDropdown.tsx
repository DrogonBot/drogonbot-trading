import { MenuItem, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TS } from '../../../helpers/LanguageHelper';
import { loadCountryProvinces, loadProvinceCities } from '../../../store/actions/form.actions';
import { setLoading } from '../../../store/actions/ui.action';
import { ICityResponse, IProvince } from '../../../types/Form.types';
import { InputContainer } from '../common/layout';

export interface ILocation {
  country: string;
  province: string;
  city: string;
}

interface IProps {
  initialCountry: string;
  initialProvince?: string;
  initialCity?: string;
  onChange: (location: ILocation) => any;
  showCountry?: boolean;
}

export const LocationDropdown = ({
  initialCountry,
  initialProvince = "default", // set text to "Select your province..." if nothing is specified!
  initialCity = "default",
  onChange,

  showCountry = true,
}: IProps) => {
  const dispatch = useDispatch();

  const [country, setCountry] = useState(
    showCountry ? initialCountry : "Brazil"
  );
  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);

  // provinces and cities loaded from the API
  const provinces = useSelector<any, any>((state) => state.formReducer.states);
  const cities = useSelector<any, any>((state) => state.formReducer.cities);

  // Dropdown updates ========================================

  // Load provinces data on country selector change
  useEffect(() => {
    const fnLoadCountryProvinces = async () => {
      dispatch(loadCountryProvinces(country));
    };
    fnLoadCountryProvinces();
  }, [country]); // should be "countries", if multiple countries are active!

  // Load cities data on province selector change
  useEffect(() => {
    const fnLoadProvinceCities = async () => {
      if (province !== "default") {
        await dispatch(loadProvinceCities(country, province));
      }
    };
    fnLoadProvinceCities();
  }, [provinces, province]);

  // on loading new cities, set always the first city to the state
  useEffect(() => {
    if (!cities || cities.length === 0) {
      return;
    }

    if (province === "default") {
      return;
    }

    const hasCityOnState = cities.some(
      (cityElement) => cityElement.name === initialCity
    );

    hasCityOnState ? setCity(initialCity) : setCity(cities[0].name);
  }, [cities]);

  // on init, update the parent component
  useEffect(() => {
    if (city) {
      onChange({ country, province, city });
    }
  }, []);

  // on change any of the properties, update the parent component
  useEffect(() => {
    if (city) {
      onChange({ country, province, city });
    }
  }, [country, province, city]);

  // FORM LIST RENDERING ========================================

  // onChange functions

  const onHandleCountryChange = async (e) => {
    await dispatch(setLoading(true, "loadingLocation"));
    setCountry(e.target.value);
  };

  const onHandleProvinceChange = async (e) => {
    await dispatch(setLoading(true, "loadingLocation"));
    setProvince(e.target.value);
  };

  const onHandleChangeCity = async (e) => {
    setCity(e.target.value);
  };

  // Rendering functions

  const onRenderProvincesList = () => {
    return provinces.map((provinceData: IProvince, index: number) => {
      return (
        <MenuItem key={provinceData.stateName} value={provinceData.stateCode}>
          {provinceData.stateCode}
        </MenuItem>
      );
    });
  };

  const onRenderCityList = () => {
    return (
      cities &&
      cities.map((cityData: ICityResponse, index: number) => {
        return (
          <MenuItem key={`${cityData.name}_${index}`} value={cityData.name}>
            {cityData.name}
          </MenuItem>
        );
      })
    );
  };

  return (
    <>
      {showCountry && (
        <InputContainer>
          <TextField
            select
            label={TS.string("form", "genericCountry")}
            value={country}
            onChange={onHandleCountryChange}
            fullWidth
          >
            <MenuItem
              key={TS.string("resume", "resumeSelectedCountry")}
              value={TS.string("resume", "resumeSelectedCountry")}
            >
              {TS.string("resume", "resumeSelectedCountry")}
            </MenuItem>
          </TextField>
        </InputContainer>
      )}

      <InputContainer>
        <TextField
          select
          label={TS.string("form", "genericProvince")}
          onChange={onHandleProvinceChange}
          value={province || TS.string("form", "selectProvinceText")}
          fullWidth
        >
          <MenuItem key={"default"} value={"default"}>
            {TS.string("form", "selectProvinceText")}
          </MenuItem>

          {onRenderProvincesList()}
        </TextField>
      </InputContainer>

      <InputContainer>
        <TextField
          label={TS.string("form", "genericCity")}
          select
          value={city || TS.string("form", "selectCityText")}
          onChange={onHandleChangeCity}
          fullWidth
        >
          <MenuItem key="default" value={"default"}>
            {TS.string("form", "selectCityText")}
          </MenuItem>

          {onRenderCityList()}
        </TextField>
      </InputContainer>
    </>
  );
};
