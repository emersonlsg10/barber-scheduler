import React from 'react';
import { Checkbox, FormHelperText, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

const CustomSimpleCheckbox = ({ field, label, form, ...props }) => {
  const [state, setState] = React.useState({
    checked: field.value,
  });

  const handleChange = event => {
    setState({ ...state, checked: event.target.checked });
    form.setFieldValue(field.name, event.target.checked);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            {...props}
            checked={state.checked}
            onChange={handleChange}
          />
        }
        label={label}
      />
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

CustomSimpleCheckbox.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomSimpleCheckbox;
