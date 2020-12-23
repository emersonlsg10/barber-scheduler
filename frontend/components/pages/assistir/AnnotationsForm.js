import React from 'react';
import dynamic from 'next/dynamic';
import Button from '@material-ui/core/Button';
// import CustomTextAreaField from 'components/CustomTextAreaField';
// import CustomRichText from 'components/CustomRichText';
import { Formik, FastField } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';

const CustomRichText = dynamic(() => import('components/CustomRichText'), {
  ssr: false,
  loading: () => <p>Carregando</p>,
});

const formInitialValues = {
  text: '',
};

const formSchema = Yup.object().shape({
  text: Yup.string().min(1).required('Este campo é obrigatório'),
});

export default function CommentForm({
  onSubmit,
  loading,
  initialValues = formInitialValues,
  formSubmitted = false,
  handleNewAnnotation,
}) {
  const formikRef = React.useRef();
  // const [CustomRichText, setCustomRichText] = React.useState(null);

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
            <FastField
              name="text"
              maxlength="500"
              rows="3"
              cols="28"
              rowsMin="20"
              component={CustomRichText}
              style={{
                width: '100%',
                borderRadius: 5,
                fontSize: 12,
                padding: '5px 5px',
              }}
            />
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <Button
                type="submit"
                onClick={handleNewAnnotation}
                color="secondary"
                style={{
                  color: '#EB961F',
                  marginTop: 10,
                  width: 150,
                  padding: 0,
                  height: 30,
                }}
                disabled={loading}
                variant="contained">
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                onClick={handleSubmit}
                color="primary"
                style={{
                  color: '#fff',
                  marginTop: 10,
                  width: 150,
                  padding: 0,
                  height: 30,
                }}
                disabled={loading}
                variant="contained">
                {!loading ? 'Enviar' : <CircularProgress size={16} />}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}
