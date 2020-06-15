import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { TS } from '../../../helpers/LanguageHelper';
import { ValidationHelper } from '../../../helpers/ValidationHelper';
import { userRegister } from '../../../store/actions/user.actions';
import { AppState } from '../../../store/reducers/index.reducers';
import { INewAccount } from '../../../types/User.types';
import { WizardBasicInfoStep } from './WizardBasicInfoStep';
import { WizardSettingsStep } from './WizardSettingsStep';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return [
    TS.string("account", "wizardBasicInfo"),
    TS.string("account", "wizardSettings"),
  ];
}

interface IProps {
  jobRoles: string[];
}

export const RegisterWizard = ({ jobRoles }: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const steps = getSteps();
  const router = useRouter();

  const newAccount = useSelector<AppState, INewAccount>(
    (state) => state.formReducer.newAccount
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <WizardBasicInfoStep />;

      case 1:
        return <WizardSettingsStep jobRoles={jobRoles} />;
      default:
        return "Unknown step";
    }
  };

  const isStepOptional = (step: number) => {
    return step === null;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleFinish = async () => {
    console.log("Finished!");
    console.log(newAccount);

    // CLIENT-SIDE VALIDATION ========================================

    const invalidFields = ValidationHelper.validateKeyValue(newAccount, {
      optionalFields: [],
      fieldLabels: {
        city: TS.string("form", "genericCity"),
        country: TS.string("form", "genericCountry"),
        email: TS.string("account", "emailInput"),
        genericPositionsOfInterest: TS.string("resume", "resumeJobRoles"),
        name: TS.string("account", "registerInputName"),
        password: TS.string("account", "passwordInput"),
        passwordConfirmation: TS.string("account", "passwordConfirmInput"),
        stateCode: TS.string("form", "genericProvince"),
        type: TS.string("account", "loginSelectAccountTypeTitle"),
      },
    });

    if (invalidFields) {
      if (process.browser) {
        window.alert(
          `${TS.string(
            "global",
            "genericFollowingFieldsInvalid"
          )} ${invalidFields}`
        );
      }
      return;
    }

    // SAVE ACCOUNT ========================================

    const userRegisterSuccess = await dispatch(userRegister(newAccount));

    // if we registered our user successfully, lets redirect him to posts page
    if (userRegisterSuccess) {
      router.push({
        pathname: "/posts",
        query: {
          searchProvince: newAccount.stateCode,
        },
      });
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <WizardContainer className={classes.root}>
      <StepperContainer>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">
                  {TS.string("global", "genericOptional")}
                </Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </StepperContainer>
      <>
        <WizardContentContainer>
          {getStepContent(activeStep)}
        </WizardContentContainer>

        <WizardActionsContainer>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
          >
            {TS.string("account", "wizardBack")}
          </Button>
          {isStepOptional(activeStep) && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSkip}
              className={classes.button}
            >
              {TS.string("account", "wizardSkip")}
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={
              activeStep === steps.length - 1 ? handleFinish : handleNext
            }
            className={classes.button}
          >
            {activeStep === steps.length - 1
              ? TS.string("account", "wizardFinish")
              : TS.string("account", "wizardNext")}
          </Button>
        </WizardActionsContainer>
      </>
    </WizardContainer>
  );
};

const WizardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;

  .MuiStepper-horizontal {
    align-items: center;
    flex: 100%;
    max-height: 99px;
    padding-left: 0;
    padding-right: 0;
  }
`;

const WizardActionsContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
`;

const WizardContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
`;

const StepperContainer = styled.div`
  margin-bottom: 2rem;
`;
