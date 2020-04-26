import { APIHelper } from '../../helpers/APIHelper';
import { GenericHelper } from '../../helpers/GenericHelper';
import { TS } from '../../helpers/LanguageHelper';
import { ICityResponse, ICountry, IJobRole, IProvince, ISector } from '../../types/Form.types';
import { RequestTypes } from '../../types/Request.types';
import {
  CLEAR_JOB_ROLES,
  READ_CITIES,
  READ_COUNTRIES,
  READ_JOB_ROLES,
  READ_SECTORS,
  READ_STATES,
  WIZARD_FORM_UPDATE_CURRENT_STEP,
  WIZARD_FORM_UPDATE_TOTAL_STEPS,
} from '../reducers/form.reducer';
import { setLoading } from './ui.action';

export const loadCountries = () => async (dispatch) => {
  const response = await APIHelper.request(
    RequestTypes.GET,
    `/country`,
    {},
    false
  );

  if (response) {
    const data: ICountry[] = response.data;

    await dispatch(setLoading(false, "loadingLocation"));

    if (response.status !== 200) {
      GenericHelper.clientAlert(response.data.message);
    }

    dispatch({ type: READ_COUNTRIES, payload: data });
  }
};
export const loadCountryProvinces = (
  country: string,
  addDefaultOption: boolean = false
) => async (dispatch) => {
  const response = await APIHelper.request(
    RequestTypes.GET,
    `/places/${country}?statesOnly=true`,
    {},
    false
  );

  if (response) {
    let data: IProvince[] = response.data;

    if (addDefaultOption) {
      // adds default option if needed
      data = [
        {
          stateName: TS.string("form", "selectProvinceText"),
          stateCode: "default",
        },
        ...data,
      ];
    }

    if (response.status !== 200) {
      GenericHelper.clientAlert(response.data.message);
    }

    dispatch({ type: READ_STATES, payload: data });
  }
};

export const loadProvinceCities = (
  country: string,
  stateCode: string
) => async (dispatch) => {
  const response = await APIHelper.request(
    RequestTypes.GET,
    `/places/${country}/${stateCode}?citiesOnly=true`,
    {},
    false
  );

  if (response) {
    const data: ICityResponse[] = response.data;

    await dispatch(setLoading(false, "loadingLocation"));

    if (response.status !== 200) {
      GenericHelper.clientAlert(response.data.message);
    }

    dispatch({ type: READ_CITIES, payload: data });
  }
};

export const loadJobRoles = (keyword: string) => async (dispatch) => {
  const response = await APIHelper.request(
    RequestTypes.GET,
    `/sectors/search/${keyword}`,
    {},
    false
  );

  if (response) {
    const data: IJobRole[] = response.data;

    if (response.status !== 200) {
      GenericHelper.clientAlert(response.data.message);
    }

    dispatch({ type: READ_JOB_ROLES, payload: data });
  }
};

export const readSectors = (country: string) => async (dispatch) => {
  const response = await APIHelper.request(
    RequestTypes.GET,
    `/sectors/${country}`,
    {},
    false
  );

  if (response) {
    const data: ISector[] = response.data;

    if (response.status !== 200) {
      GenericHelper.clientAlert(response.data.message);
    }

    dispatch({ type: READ_SECTORS, payload: data });
  }
};

export const clearJobRoles = () => (dispatch) => {
  dispatch({ type: CLEAR_JOB_ROLES });
};

export const wizardFormUpdateCurrentStep = (
  key: string,
  currentStep: number
) => async (dispatch) => {
  dispatch({
    type: WIZARD_FORM_UPDATE_CURRENT_STEP,
    payload: {
      key,
      currentStep,
    },
  });
};
export const wizardFormUpdateTotalSteps = (
  key: string,
  totalSteps: number
) => async (dispatch) => {
  dispatch({
    type: WIZARD_FORM_UPDATE_TOTAL_STEPS,
    payload: {
      key,
      totalSteps,
    },
  });
};
