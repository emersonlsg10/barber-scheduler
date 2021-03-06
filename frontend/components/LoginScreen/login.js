import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Box } from '@material-ui/core';
import Head from 'components/head';
import LoginForm from 'components/pages/index/LoginForm';
// import { Creators as LoginCreators } from 'appStore/ducks/login';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  container: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    height: `100vh`,
  },
  loginForm: {
    opacity: 0.9,
    borderRadius: 15,
    padding: 35,
    background: 'linear-gradient(180deg, #2f2f30 30%, #0f0f0f 90%)',
    width: '370px',
  },
  loginLogo: {
    marginBottom: 10,
  },
}));

function LoginScreen({ onSubmit }) {
  // const dispatch = useDispatch();
  const classes = useStyles();

  const { loading } = useSelector(state => state.login);

  // const onSubmit = ({ email, password }) => {
  //   const route = query.route ? query.route : '';
  //   console.log(route);
  //   dispatch(LoginCreators.getLoginRequest({ email, password, route }));
  // };

  return (
    <>
      <Head title="Login - Cis Continuum" />
      <main className={'formLogin'}>
        <Box className={classes.container}>
          <Card className={classes.loginForm}>
            <Link href="/">
              <a
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <img
                  src="/img/cis-continuum-logo.png"
                  alt="logo"
                  className={classes.loginLogo}
                  width="70%"
                />
              </a>
            </Link>
            <LoginForm onSubmit={onSubmit} isLoading={loading} />
          </Card>
        </Box>
      </main>
      <style jsx>
        {`
          .formLogin {
            height: 100vh;
            background-image: url('/img/background_login.jpg');
            background-repeat: no-repeat, repeat;
            background-position: center; /* Center the image */
            background-size: cover; /* Resize the background image to cover the entire container */
          }
        `}
      </style>
    </>
  );
}

LoginScreen.getInitialProps = ({ query }) => {
  return { query };
};

export default LoginScreen;
