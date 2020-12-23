import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, CircularProgress } from '@material-ui/core';
import CustomTextField from 'components/form/CustomTextField';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RemoveRedEye } from '@material-ui/icons';

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
  inputText: {
    margin: theme.spacing(1),
    '& label': {
      color: '#EB961F',
    },
    '& input': {
      color: 'white',
    },
  },
}));

const initialValues = {
  password: '',
  passwordIsMasked: true,
};

const formSchema = Yup.object().shape({
  password: Yup.string().required('Obrigatório'),
});

const ResetPasswordForm = ({ onSubmit, isLoading }) => {
  const classes = useStyles();
  const [passwordConfirm, setPasswordConfirm] = React.useState(false);

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const showPass = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const formSubmit = data => {
    console.log(data, initialValues, 'teste');

    if (data.password != undefined && data.password != '') {
      if (
        initialValues.confirm_password != undefined &&
        initialValues.confirm_password == data.password
      ) {
        setPasswordConfirm(false);
        console.log('aqui', data);
        onSubmit(data);
      } else {
        console.log('aqui2', data);
        setPasswordConfirm(true);
      }
    } else {
      setPasswordConfirm(false);
      onSubmit(data);
    }
  };

  const handleConfirmChange = (e, values) => {
    console.log(e.target.value, values);
    initialValues.confirm_password = event.target.value;
    if (e.target.value == values.password) {
      setPasswordConfirm(false);
    }
  };

  return (
    <Formik
      className={classes.root}
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={formSubmit}>
      {({ handleSubmit, values: formValues }) => (
        <Form className={classes.formContainer}>
          <div>
            <Field
              name="password"
              component={CustomTextField}
              type={!values.showPassword ? 'password' : 'text'}
              label={
                <span
                  style={{
                    fontSize: 16,
                    marginLeft: 10,
                    color: '#EB961F',
                  }}>
                  Nova Senha
                </span>
              }
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
          <div style={{ marginTop: 12 }}>
            <Field
              className={classes.inputText}
              name="confirm_password"
              component={CustomTextField}
              label="Confirmar nova senha"
              onChange={e => handleConfirmChange(e, formValues)}
              type="password"
            />
            {passwordConfirm && (
              <span style={{ fontSize: 13, color: 'red' }}>
                Por favor, digite a mesma senha!
              </span>
            )}
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            className={classes.buttonLogin}
            variant="contained">
            {isLoading ? (
              <CircularProgress size={22} color="primary" />
            ) : (
              'Trocar Senha'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
