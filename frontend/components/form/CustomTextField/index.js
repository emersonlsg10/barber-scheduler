import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { ErrorMessage } from 'formik';


const CustomTextField = ({
  field,
  label,
  form: { touched, errors },
  ...props
}) => (
  <>
    <TextField
      {...field}
      {...props}
      label={label}
      error={Boolean(touched[field.name] && errors[field.name])}
      variant="standard"
      fullWidth
    />
    <ErrorMessage name={field.name}>
      {msg => <FormHelperText error>{msg}</FormHelperText>}
    </ErrorMessage>
  </>
);

CustomTextField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomTextField;
