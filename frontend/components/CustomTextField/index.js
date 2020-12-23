import React from 'react';
import { TextField, FormHelperText, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
    }
    & .MuiOutlinedInput-input {
      padding: 12px 12px;
    }
    & .MuiInputLabel-outlined[data-shrink='false'] {
      transform: translate(14px, 14px) scale(1);
    }
  }
`;

const CustomTextField = ({
  field,
  label,
  form: { touched, errors },
  endAdornment,
  ...props
}) => {
  return (
    <>
      <StyledTextField
        {...field}
        {...props}
        label={label}
        error={Boolean(touched[field.name] && errors[field.name])}
        fullWidth
        variant="outlined"
        InputProps={
          endAdornment
            ? {
              endAdornment: (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
            }
            : null
        }
      />
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

CustomTextField.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  endAdornment: PropTypes.string,
};

CustomTextField.defaultProps = {
  endAdornment: null,
};

export default CustomTextField;
