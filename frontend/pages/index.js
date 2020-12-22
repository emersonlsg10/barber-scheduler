import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Card, Box, Button } from '@material-ui/core';
import Head from 'components/head';
import LoginForm from 'components/pages/index/LoginForm';
import { Creators as LoginCreators } from 'appStore/ducks/login';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginForm: {
    padding: '50px 20px',
    [theme.breakpoints.down('lg')]: {
      width: '23vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '30vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
}));

function LoginScreen() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = ({ email, password }) => {
    dispatch(LoginCreators.getLoginRequest({ email, password }));
  };

  return (
    <>
      <Head title="Acessar - Meu RH" />
      <main className={classes.root}>
        <Box className={classes.container}>
          <Box className={classes.logoContainer}>
            <Typography style={{ color: 'white' }} variant="h5" color="primary">
              Meu RH
            </Typography>
          </Box>
          <Card className={classes.loginForm}>
            <LoginForm onSubmit={onSubmit} isLoading={false} />
            <Typography align="center">
              <Link href="/recuperarSenha">
                <Button>Esqueci minha senha</Button>
              </Link>
            </Typography>
          </Card>
        </Box>
      </main>
    </>
  );
}

export default LoginScreen;
