import React from 'react';
import { Formik, Form, Field } from 'formik';
import CustomTextField from 'components/form/CustomTextField';
import Link from 'next/link';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { RemoveRedEye } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'hidden',
    color: '#fff',
    marginLeft: 7,
    marginRight: 10,
  },
  titleDiv: {
    marginLeft: 15,
    textAlign: 'center',
  },
  MuiFormControlLabel: {
    fontSize: 10,
  },
  inputText: {
    margin: theme.spacing(0),
    '& label': {
      color: '#EB961F',
    },
    '& input': {
      color: 'white',
    },
  },
  formLabel: {
    fontSize: '14px',
    color: '#f2f2f2',
  },
  labelEmail: {
    margin: theme.spacing(1),
    fontSize: 12,
    color: '#EB961F',
  },
  inputEmail: {
    margin: theme.spacing(1),
    '& label': {
      color: '#EB961F',
    },
    '& input': {
      color: '#aaa',
    },
  },
  eye: {
    cursor: 'pointer',
    color: '#4b4b4b',
  },
}));

export const formInitialValues = {
  username: '',
  email: '',
  phone: '',
  cpf: '',
  city: 'Grajaú',
  state: 'MA',
  password: '',
  passwordIsMasked: true,
};

const schema = Yup.object().shape({
  username: Yup.string().required('Obrigatório'),
  email: Yup.string().required('Obrigatório'),
  phone: Yup.string().required('Obrigatório'),
  cpf: Yup.string().required('Obrigatório'),
  city: Yup.string().required('Obrigatório'),
  state: Yup.string().required('Obrigatório'),
  password: Yup.string().trim().nullable(true).min(6, 'Senha muito curta'),
  passwordConfirm: Yup.string().test(
    'passwords-match',
    'As senhas devem ser iguais',
    function (value) {
      return this.parent.password === value;
    }
  ),
});

const registerForm = ({
  onSubmit,
  initialValues = formInitialValues,
  loading,
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const showPass = () => {
    setValues({ showPassword: !values.showPassword });
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleDiv}>
        <span style={{ fontSize: 35, fontWeight: 'lighter' }}>
          <strong>Cadastro</strong>
        </span>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <Form>
              <div className={classes.root}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Field
                      className={classes.inputText}
                      name="username"
                      component={CustomTextField}
                      label="Nome"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      className={classes.inputText}
                      name="email"
                      component={CustomTextField}
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      className={classes.inputText}
                      name="phone"
                      component={CustomTextField}
                      label="Telefone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      className={classes.inputText}
                      name="cpf"
                      component={CustomTextField}
                      label="CPF"
                    />
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8} style={{ marginLeft: 5 }}>
                      <Field
                        className={classes.inputText}
                        name="city"
                        component={CustomTextField}
                        label="Cidade"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        className={classes.inputText}
                        name="state"
                        component={CustomTextField}
                        label="Estado"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12}>
                    <Field
                      style={{ width: '97%', marginLeft: 0 }}
                      name="password"
                      component={CustomTextField}
                      type={!values.showPassword ? 'password' : 'text'}
                      label={
                        <span
                          style={{
                            fontSize: 16,
                            color: '#EB961F',
                          }}>
                          Senha
                        </span>
                      }
                      autoComplete="off"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <RemoveRedEye
                              className={classes.eye}
                              onClick={showPass}
                            />
                          </InputAdornment>
                        ),
                        className: classes.formLabel,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      style={{ width: '97%', marginLeft: 0 }}
                      className={classes.inputText}
                      name="passwordConfirm"
                      component={CustomTextField}
                      label="Confirmar senha"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: '#D36821',
                        width: '100%',
                        borderRadius: 20,
                        color: 'white',
                        marginTop: 30,
                      }}
                      variant="contained"
                      startIcon={loading && <CircularProgress size={16} />}>
                      Cadastrar
                    </Button>
                    <Link href="/login">
                      <a
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textDecoration: 'none',
                        }}>
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: 'blue',
                            width: '100%',
                            borderRadius: 20,
                            color: 'white',
                            marginTop: 30,
                          }}
                          variant="contained">
                          Voltar
                        </Button>
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default registerForm;
