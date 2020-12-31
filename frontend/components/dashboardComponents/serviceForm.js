import React from 'react';
import { Formik, Form, Field } from 'formik';
import CustomTextField from 'components/form/CustomTextField';
import CustomSelect from 'components/form/CustomSelect';
import CustomCurrencyField from 'components/form/CustomCurrencyField';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 0,
    color: '#fff',
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
}));

export const formInitialValues = {
  name: '',
  price: 15,
  time: {
    id: 15,
  },
};

const schema = Yup.object().shape({
  name: Yup.string().required('Obrigatório'),
  time: Yup.object().shape({
    id: Yup.mixed(),
  }),
  price: Yup.number().required('Obrigatório'),
});

const registerForm = ({
  onSubmit,
  initialValues = formInitialValues,
  loading,
}) => {
  const classes = useStyles();

  const onFormSubmit = (values, { resetForm }) => {
    onSubmit(values);
    setTimeout(() => {
      resetForm({});
    }, 1500);
  };

  return (
    <div className={classes.root}>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onFormSubmit}>
          {({ handleSubmit }) => (
            <Form>
              <div className={classes.root}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Field
                      className={classes.inputText}
                      name="name"
                      component={CustomTextField}
                      label="Nome"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: 15 }}>
                  <Grid item xs={6}>
                    <Field
                      className={classes.inputText}
                      name="price"
                      component={CustomCurrencyField}
                      label="Valor"
                    />
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: 0 }}>
                    <Field
                      className={classes.inputText}
                      name="time.id"
                      label="Tempo"
                      options={[
                        { id: 15, name: '15 minutos' },
                        { id: 30, name: '30 minutos' },
                        { id: 60, name: '60 minutos' },
                        { id: 90, name: '90 minutos' },
                      ]}
                      component={CustomSelect}
                      placeholder="Tempo"
                      isLoading={false}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginBottom: 30,
                    }}>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: '#D36821',
                        width: '100%',
                        borderRadius: 20,
                        color: 'white',
                        marginTop: 15,
                      }}
                      variant="contained"
                      startIcon={loading && <CircularProgress size={16} />}>
                      Cadastrar
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
export default registerForm;
