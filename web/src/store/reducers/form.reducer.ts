import { ICity, ICountry, IProvince, ISector } from '../../types/Form.types';
import { INewAccount, UserType } from '../../types/User.types';

interface IState {
  countries: ICountry[];
  states: IProvince[];
  cities: ICity[];
  jobRoles: string[];
  sectors: ISector[];
  newAccount: INewAccount;
}

const INITIAL_STATE = {
  countries: [],
  states: [],
  cities: [],
  jobRoles: [],
  sectors: [],
  newAccount: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    type: UserType.JobSeeker,
    country: "",
    province: "",
    city: "",
  },
};

export const formReducer = (state: IState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_NEW_ACCOUNT:
      return {
        ...state,
        newAccount: {
          ...state.newAccount,
          [action.payload.key]: action.payload.value,
        },
      };

    case READ_COUNTRIES:
      return { ...state, countries: action.payload };
    case READ_STATES:
      return { ...state, states: action.payload };
    case READ_CITIES:
      return { ...state, cities: action.payload };
    case READ_JOB_ROLES:
      return { ...state, jobRoles: action.payload };
    case READ_SECTORS:
      return { ...state, sectors: action.payload };
    case CLEAR_JOB_ROLES:
      return {
        ...state,
        jobRoles: INITIAL_STATE.jobRoles,
      };

    default:
      return state;
  }
};

export const UPDATE_NEW_ACCOUNT = "UPDATE_NEW_ACCOUNT";
export const READ_COUNTRIES = "READ_COUNTRIES";
export const READ_STATES = "READ_STATES";
export const READ_CITIES = "READ_CITIES";
export const READ_JOB_ROLES = "READ_JOB_ROLES";
export const CLEAR_JOB_ROLES = "CLEAR_JOB_ROLES";
export const READ_SECTORS = "READ_SECTORS";
