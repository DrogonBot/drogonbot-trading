const INITIAL_STATE = {
  countries: [],
  states: [],
  cities: [],
  jobRoles: [],
  wizardForm: {
    resumeWizardForm: {
      currentStep: 0,
    },
  },
  sectors: [],
};

export const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

    case WIZARD_FORM_UPDATE_CURRENT_STEP:
      return {
        ...state,
        wizardForm: {
          [action.payload.key]: {
            ...state.wizardForm[action.payload.key],
            currentStep: action.payload.currentStep,
          },
        },
      };
    case WIZARD_FORM_UPDATE_TOTAL_STEPS:
      return {
        ...state,
        wizardForm: {
          [action.payload.key]: {
            ...state.wizardForm[action.payload.key],
            totalSteps: action.payload.totalSteps,
          },
        },
      };

    default:
      return state;
  }
};

export const READ_COUNTRIES = "READ_COUNTRIES";
export const READ_STATES = "READ_STATES";
export const READ_CITIES = "READ_CITIES";
export const READ_JOB_ROLES = "READ_JOB_ROLES";
export const CLEAR_JOB_ROLES = "CLEAR_JOB_ROLES";
export const READ_SECTORS = "READ_SECTORS";

export const WIZARD_FORM_UPDATE_CURRENT_STEP =
  "WIZARD_FORM_UPDATE_CURRENT_STEP";
export const WIZARD_FORM_UPDATE_TOTAL_STEPS = "WIZARD_FORM_UPDATE_TOTAL_STEPS";
