import React from 'react';
import { Formik, Form, Field, FastField } from 'formik';
import CustomTextField from 'components/form/CustomTextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
    marginTop: 5,
    marginLeft: 7,
    marginRight: 10,
  },
  titleDiv: {
    marginLeft: 15,
    marginTop: 20,
  },
  MuiFormControlLabel: {
    fontSize: 10,
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
  name: '',
  nickname: '',
  email: '',
  password: '',
  description: '',
  confirm_password: '',
  passwordIsMasked: true,
};

const schema = Yup.object().shape({
  name: Yup.string(),
  nickname: Yup.string().nullable(),
  email: Yup.string(),
  password: Yup.string(),
  description: Yup.string().nullable(),
});

const EditProfile = ({
  onSubmit,
  initialValues = formInitialValues,
  loading,
}) => {
  const [passwordConfirm, setPasswordConfirm] = React.useState(false);
  const classes = useStyles();

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
        onSubmit(data);
      } else {
        setPasswordConfirm(true);
      }
    } else {
      setPasswordConfirm(false);
      onSubmit(data);
    }
  };
  const updateTextField = event => {
    initialValues.description = event.target.value;
  };

  const changeEmail = () => {
    initialValues.email;
  };

  // const handlePasswordChange = e => {
  //   console.log(e.target.value);
  //   initialValues.password = event.target.value;
  //   if (e.target.value === '') {
  //     setPasswordConfirm(false);
  //   }
  // };

  const handleConfirmChange = (e, values) => {
    console.log(e.target.value, values);
    initialValues.confirm_password = event.target.value;
    if (e.target.value == values.password) {
      setPasswordConfirm(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleDiv}>
        <span style={{ fontSize: 35, fontWeight: 'lighter' }}>
          Editar <strong>Perfil</strong>
        </span>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={formSubmit}>
          {({ handleSubmit, values: formValues }) => (
            <Form>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div>
                      <Field
                        className={classes.inputText}
                        name="name"
                        component={CustomTextField}
                        label="Nome"
                      />
                    </div>
                    <div>
                      <Field
                        className={classes.inputEmail}
                        name="email"
                        component={CustomTextField}
                        label="Email"
                        onChange={changeEmail}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <Field
                        className={classes.inputText}
                        name="nickname"
                        component={CustomTextField}
                        label="Como gostaria de ser chamado?"
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <div style={{ marginTop: 5 }}>
                      <Field
                        style={{ width: '97%', marginLeft: 10 }}
                        name="password"
                        component={CustomTextField}
                        type={!values.showPassword ? 'password' : 'text'}
                        label={
                          <span
                            style={{
                              fontSize: 16,
                              color: '#EB961F',
                            }}>
                            Nova Senha
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
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ marginLeft: 5 }}>
                      <Field
                        style={{ width: '97%', marginLeft: 10 }}
                        className={classes.inputText}
                        name="confirm_password"
                        component={CustomTextField}
                        label="Confirmar nova senha"
                        onChange={e => handleConfirmChange(e, formValues)}
                        type="password"
                      />
                      {passwordConfirm && (
                        <span
                          style={{
                            fontSize: 13,
                            color: 'red',
                            position: 'absolute',
                            marginLeft: 10,
                            marginTop: -5,
                          }}>
                          Por favor, digite a mesma senha!
                        </span>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <h1>Sobre você</h1>
                    <FastField
                      component={TextareaAutosize}
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: '#252525',
                        color: '#fff',
                      }}
                      name="description"
                      rows="7"
                      cols="33"
                      defaultValue={initialValues?.description}
                      onChange={updateTextField}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: '#D36821',
                        width: 230,
                        borderRadius: 20,
                        color: 'white',
                        marginTop: 30,
                      }}
                      variant="contained"
                      startIcon={loading && <CircularProgress size={16} />}>
                      Salvar
                    </Button>
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
export default EditProfile;
