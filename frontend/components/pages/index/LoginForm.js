import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import CustomTextField from 'components/form/CustomTextField';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { RemoveRedEye } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formContainer: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formLabel: {
    fontSize: '14px',
    color: '#f2f2f2',
  },
  buttonLogin: {
    marginTop: 25,
    marginBottom: 0,
    minHeight: 40,
    borderRadius: 50,
    background: 'linear-gradient(45deg, #c85c21 30%, #dc7322 90%)',
    color: 'white',
  },
  buttonFacebook: {
    marginTop: 15,
    minHeight: 36,
    backgroundColor: '#0000CD',
    color: '#fff',
  },
  buttonGoogle: {
    marginTop: 15,
    minHeight: 36,
    backgroundColor: '#FF6347',
    color: '#fff',
  },
  eye: {
    cursor: 'pointer',
    color: '#4b4b4b',
  },
}));


// email: 'thiagotancredii@email.com',
// password: '123456',

const initialValues = {
  email: '',
  password: '',
  rememberMe: false,
  passwordIsMasked: true,
};

const formSchema = Yup.object().shape({
  email: Yup.string().required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
  rememberMe: Yup.bool(),
});

const LoginForm = ({ onSubmit, isLoading }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const { error } = useSelector(state => state.login);
  const showPass = () => {
    setValues({ showPassword: !values.showPassword });
  };

  return (
    <Formik
      className={classes.root}
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Form className={classes.formContainer}>
          <div>
            <Field
              name="email"
              component={CustomTextField}
              label={
                <span style={{ fontSize: '13px', color: 'white' }}>
                  Usuário ou E-Mail
                </span>
              }
              autoComplete="email"
              InputProps={{
                className: classes.formLabel,
              }}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <Field
              name="password"
              component={CustomTextField}
              label={
                <span style={{ fontSize: '13px', color: 'white' }}>Senha</span>
              }
              type={!values.showPassword ? 'password' : 'text'}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RemoveRedEye className={classes.eye} onClick={showPass} />
                  </InputAdornment>
                ),
                className: classes.formLabel,
              }}
            />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox name="rememberMe" style={{ color: 'white' }} />
                }
                color="White"
                label={
                  <span style={{ fontSize: '13px', fontWeight: '300' }}>
                    Lembrar-me
                  </span>
                }
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" style={{ marginTop: '8px' }}>
                <Link href="/recover">
                  <a
                    style={{
                      color: 'white',
                      fontSize: '13px',
                      textDecoration: 'none',
                    }}>
                    Esqueci minha senha
                  </a>
                </Link>
              </Typography>
            </Grid>
          </Grid>
          {error && (
            <span style={{ fontSize: '13px', color: 'red' }}>{error}</span>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            className={classes.buttonLogin}
            variant="contained">
            {isLoading ? (
              <CircularProgress size={22} color="primary" />
            ) : (
                'Acessar'
              )}
          </Button>
          <Typography
            align="center"
            style={{ marginTop: '10px', marginBottom: '20px' }}>
            <span style={{ color: 'white', fontSize: '13px', marginTop: 15 }}>
              Ainda não está cadastrado ?
            </span>
            <Link href="/register">
              <a
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginTop: '10px',
                  textDecoration: 'none',
                }}>
                {' '}
                CADASTRAR
              </a>
            </Link>
          </Typography>
          {/*
          <Button
            type="submit"
            className={classes.buttonFacebook}
            variant="contained">
            Conectar com o Facebook
          </Button>
          <Button
            type="submit"
            className={classes.buttonGoogle}
            variant="contained">
            Conectar com o Google
          </Button>
          */}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
