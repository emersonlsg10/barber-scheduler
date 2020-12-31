import React from 'react';
import { FormHelperText, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
    }
    & .MuiOutlinedInput-input {
      padding: 12px 12px;
    }
    & .MuiInputLabel-outlined {
      color: #EB961F !important;
    }
    & .MuiInputLabel-outlined[data-shrink='false'] {
      transform: translate(14px, 14px) scale(1);
    }
  }
`;

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={({ floatValue }) => {
        if (typeof floatValue === 'undefined') {
          onChange('');
        } else {
          onChange(floatValue);
        }
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      prefix="R$ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CustomCurrencyField = ({ field, label, form }) => (
  <>
    <StyledTextField
      fullWidth
      {...field}
      label={label}
      onChange={val => {
        form.setFieldValue(field.name, val);
      }}
      variant="outlined"
      error={Boolean(form.touched[field.name] && form.errors[field.name])}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
    <ErrorMessage name={field.name}>
      {msg => (
        <FormHelperText error id="component-error-text">
          {msg}
        </FormHelperText>
      )}
    </ErrorMessage>
  </>
);

CustomCurrencyField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomCurrencyField;
