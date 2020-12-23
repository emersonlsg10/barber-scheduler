import React from 'react';
import Button from '@material-ui/core/Button';
import CustomTextAreaField from 'components/CustomTextAreaField';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';

const formInitialValues = {
  text: '',
  father: 0,
  courseId: 0,
};

const formSchema = Yup.object().shape({
  text: Yup.string().min(1).required('Este campo é obrigatório'),
  father: Yup.mixed(),
  courseId: Yup.mixed(),
});

export default function CommentForm({
  onSubmit,
  loading,
  initialValues = formInitialValues,
  formSubmitted = false,
}) {
  const formikRef = React.useRef();

  React.useEffect(() => {
    if (
      formSubmitted &&
      !loading &&
      formikRef &&
      formikRef.current &&
      formikRef.current.resetForm
    ) {
      formikRef.current.resetForm();
    }
  }, [formSubmitted, loading]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Grid container>
          <Grid container>
            <Field
              component={CustomTextAreaField}
              name="text"
              maxlength="500"
              rows="5"
              cols="28"
              rowsMin="20"
              style={{
                width: '75%',
                borderRadius: 10,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#D36821',
                  width: 230,
                  borderRadius: 20,
                  color: 'white',
                  marginTop: 25,
                  marginBottom: 25,
                }}
                disabled={loading}
                variant="contained">
                {!loading ? 'Enviar' : 'Carregando...'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}
