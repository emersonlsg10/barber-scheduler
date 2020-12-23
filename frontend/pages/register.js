import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegisterForm from 'components/dashboardComponents/registerForm';
import { Creators as RegisterCreator } from 'appStore/ducks/register';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#252525',
  },
  container: {
    display: `flex`,
    background: 'linear-gradient(180deg, #2f2f30 30%, #0f0f0f 90%)',
    justifyContent: `center`,
    alignItems: `center`,
    minHeight: '100vh',
  },
  loginForm: {
    opacity: 0.9,
    borderRadius: 15,
    background: 'black',
    width: '370px',
    marginBottom: 15,
  },
});

export default function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.register);
  const onSubmit = formData => {
    dispatch(RegisterCreator.getRequest(formData));
  };

  const classes = useStyles();

  return (
    <>
      <main className={'formLogin'}>
        <Box className={classes.container}>
          <Card className={classes.loginForm}>
            <RegisterForm onSubmit={onSubmit} loading={loading} />
          </Card>
        </Box>
      </main>
    </>
  );
}

Register.getInitialProps = async ({ store }) => {
  //   store.dispatch(UserCreator.getRequest());
};
