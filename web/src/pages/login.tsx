import { Link as LinkMaterial } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Copyright } from '../components/pages/login/Copyright';
import { appEnv } from '../constants/Env.constant';
import { colors } from '../constants/UI/Colors.constant';
import { TS } from '../helpers/LanguageHelper';
import { ValidationHelper } from '../helpers/ValidationHelper';
import { userLogin } from '../store/actions/user.actions';
import { AuthType, ICredentials } from '../types/User.types';

const Login = () => {
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState<ICredentials>({
    email: "",
    password: "",
  });

  const classes = useStyles();

  const onHandleLogin = async (e) => {
    e.preventDefault();

    // CLIENT-SIDE VALIDATION ========================================

    const invalidFields = ValidationHelper.validateKeyValue(userCredentials, {
      optionalFields: [],
      fieldLabels: {
        email: TS.string("account", "registerInputEmail"),
        password: TS.string("account", "passwordInput"),
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

    // Login user

    await dispatch(userLogin(userCredentials, AuthType.EmailPassword));
  };

  return (
    <Container>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7} className={classes.image}>
          <ImageOverlay />
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Link href="/" passHref>
              <LogoContainer>
                <img
                  src={`/images/logos/logo-${appEnv.language}.svg`}
                  alt="Emprego Urgente Logo"
                />
              </LogoContainer>
            </Link>
            <h1>{TS.string("account", "loginAccessYourAccount")}</h1>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={TS.string("account", "emailInput")}
                name="email"
                autoComplete="email"
                autoFocus
                value={userCredentials.email}
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={TS.string("account", "passwordInput")}
                type="password"
                id="password"
                autoComplete="current-password"
                value={userCredentials.password}
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    password: e.target.value,
                  })
                }
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={TS.string("account", "loginRememberMe")}
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onHandleLogin}
              >
                {TS.string("account", "loginButtonText")}
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    {TS.string("account", "forgotPasswordLoginText")}
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href={"/register"}>
                    <LinkMaterial href="#" variant="body2">
                      {TS.string("account", "loginDontHaveAccount")}
                    </LinkMaterial>
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Login;

const Container = styled.div`
  h1 {
    color: ${colors.dark};
  }

  a {
    &:visited {
      color: inherit;
    }
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;
  img {
    width: 170px;
    height: 90px;
  }
`;

const ImageOverlay = styled.div`
  background-color: ${colors.primary};
  opacity: 0.3;
  width: 100%;
  height: 100%;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/1600x900/?jobs)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "luminosity",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
