import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Box } from '@material-ui/core';
import Head from 'components/head';
import LoginForm from 'components/pages/index/LoginForm';
import { Creators as LoginCreators } from 'appStore/ducks/login';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: `flex`,
    background: 'linear-gradient(180deg, #2f2f30 30%, #0f0f0f 90%)',
    justifyContent: `center`,
    alignItems: `center`,
    height: `100vh`,
  },
  loginForm: {
    opacity: 0.9,
    borderRadius: 15,
    padding: 35,
    background: 'black',
    width: '370px',
  },
  loginLogo: {
    marginBottom: 10,
  },
  titleDiv: {
    textAlign: 'center',
  },
}));

function LoginScreen() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { loading } = useSelector(state => state.login);

  const onSubmit = ({ email, password }) => {
    dispatch(LoginCreators.getLoginRequest({ email, password }));
  };

  return (
    <>
      <Head title="Login - Agenda Aqui" />
      <main className={'formLogin'}>
        <Box className={classes.container}>
          <Card className={classes.loginForm}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <img
                src="barber-logo.jpg"
                alt="logo"
                className={classes.loginLogo}
                width="70%"
              />
            </div>
            <div className={classes.titleDiv}>
              <span style={{ fontSize: 35, fontWeight: 'lighter' }}>
                <strong>Login</strong>
              </span>
            </div>
            <LoginForm onSubmit={onSubmit} isLoading={loading} />
          </Card>
        </Box>
      </main>
    </>
  );
}

export default LoginScreen;
