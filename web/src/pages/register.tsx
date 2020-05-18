import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

import { PageBody, PageContainer } from '../components/elements/common/layout';
import { SearchTop } from '../components/pages/posts/SearchTop';
import { WizardBasicInfoStep } from '../components/pages/register/WizardBasicInfoStep';
import { appEnv } from '../constants/Env.constant';
import { TS } from '../helpers/LanguageHelper';
import { loadCountryProvinces } from '../store/actions/form.actions';
import { IProvince } from '../types/Form.types';

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

interface IProps {
  provinces: IProvince[];
}

function getSteps() {
  return [
    TS.string("account", "wizardBasicInfo"),
    TS.string("account", "wizardSettings"),
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <WizardBasicInfoStep />;

    case 1:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

const Register = ({ provinces }: IProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const steps = getSteps();

  const isStepOptional = (step: number) => {
    return step === null;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <PageContainer>
        <SearchTop provinces={provinces} />
      </PageContainer>

      <Body>
        <PageContainer>
          <PageBody>
            <h1>{TS.string("account", "registerCreateYourAccount")}</h1>

            <WizardContainer className={classes.root}>
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
              <>
                {activeStep === steps.length ? (
                  <>
                    <Typography className={classes.instructions}>
                      {TS.string("account", "wizardAllStepsCompleted")}
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      {TS.string("account", "wizardReset")}
                    </Button>
                  </>
                ) : (
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
                          color="primary"
                          onClick={handleSkip}
                          className={classes.button}
                        >
                          {TS.string("account", "wizardSkip")}
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1
                          ? TS.string("account", "wizardFinish")
                          : TS.string("account", "wizardNext")}
                      </Button>
                    </WizardActionsContainer>
                  </>
                )}
              </>
            </WizardContainer>
          </PageBody>
        </PageContainer>
      </Body>
    </>
  );
};

Register.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  const provinces = ctx.store.getState().formReducer.states;

  return {
    provinces,
  };
};

export default Register;

const Body = styled.div`
  min-height: 68.4vh;
`;

const WizardContainer = styled.div`
  min-height: 68.4vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;

  .MuiStepper-horizontal {
    align-items: center;
    flex: 100%;
    max-height: 99px;
  }
`;

const WizardActionsContainer = styled.div`
  padding-left: 2.5rem;
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
`;

const WizardContentContainer = styled.div`
  min-height: 46vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
`;
