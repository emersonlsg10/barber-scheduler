import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, CircularProgress } from '@material-ui/core';
import CustomTextField from '../../form/CustomTextField';

const initialValues = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
};

const formSchema = Yup.object().shape({
  email: Yup.string().required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
});

const LoginForm = ({ onSubmit, isLoading }) => (
  <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <Form style={{ display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
        <div>
          <Field name="email" component={CustomTextField} label="E-Mail" />
        </div>
        <div style={{ marginTop: 12 }}>
          <Field name="password" component={CustomTextField} label="Password" type="password" />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          style={{ marginTop: 15, minHeight: 36 }}
          color="primary"
          variant="contained"
        >
          {isLoading ? <CircularProgress size={22} color="secondary" /> : 'Entrar'}
        </Button>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
