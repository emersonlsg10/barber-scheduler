import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import CustomTextField from 'components/form/CustomTextField';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Creators as RecoverCreators } from 'appStore/ducks/recover';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  formContainer: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
  },
  formLabel: {
    fontSize: '14px',
    color: '#f2f2f2',
  },
  buttonRecover: {
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
}));

const initialValues = {
  email: '',
};

const formSchema = Yup.object().shape({
  email: Yup.string().required('Obrigatório'),
});

const RecoverForm = ({ onSubmit, isLoading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   showPassword: false,
  // });
  const { error } = useSelector(state => state.recover);

  const resetRecover = () => {
    dispatch(RecoverCreators.getReset());
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
          {error && (
            <span style={{ fontSize: '13px', color: 'red' }}>{error}</span>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            className={classes.buttonRecover}
            variant="contained">
            {isLoading ? (
              <CircularProgress size={22} color="primary" />
            ) : (
              'Recuperar'
            )}
          </Button>
          <Typography
            align="center"
            style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Link href="/login">
              <a
                onClick={resetRecover}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '10px',
                  textDecoration: 'none',
                }}>
                {' '}
                VOLTAR
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

export default RecoverForm;
