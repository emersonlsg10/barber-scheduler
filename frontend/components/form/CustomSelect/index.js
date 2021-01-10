import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { responseToSelect } from 'utils/response';
import { FormHelperText, InputLabel } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  && {
    & > div {
      min-height: 43px;
      background-color: #252525;
    }
    & > div > div > div {
      color: #fff !important;
    }
  }
`;

const StyledDiv = styled('div')`
  && {
    position: relative;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  && {
    position: absolute;
    top: 1px;
    padding-left: 5px;
    padding-right: 5px;
    left: 10px;
    transform: translateY(-50%);
    background: #252525;
    color: #eb961f !important;
    font-size: 12px;
  }
`;

const CustomSelect = ({
  placeholder,
  field,
  form,
  options,
  isMulti,
  isLoading,
  optionLimit,
  isClearable,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(isMulti ? [] : '');
  const onChange = option => {
    if (!option && isMulti) {
      form.setFieldValue(field.name, []);
      return;
    }
    if (!option) {
      form.setFieldValue(field.name, '');
      return;
    }
    if ((optionLimit && option.length <= optionLimit) || !optionLimit) {
      form.setFieldValue(
        field.name,
        isMulti
          ? option.map(item => ({ id: item.value, name: item.label }))
          : option.value
      );
    }
  };

  const getValue = () => {
    if (isMulti) {
      const selecteds = options.filter(option =>
        field.value.map(x => x.id).includes(option.id)
      );
      setSelectedOption(
        selecteds.map(item => ({ value: item.id, label: item.name }))
      );
    } else {
      const selected = selectOptions.find(
        option => option.value === field.value
      );
      if (selected) {
        setSelectedOption(selected);
      } else {
        setSelectedOption('');
      }
    }
  };

  React.useEffect(() => {
    setSelectOptions(responseToSelect(options));
  }, [options]);

  React.useEffect(() => {
    getValue();
  }, [selectOptions, field.value]);

  return (
    <StyledDiv>
      <StyledSelect
        styles={{
          menuPortal: base => {
            const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
            return { ...rest, zIndex: 9999 };
          },
        }}
        {...field}
        value={selectedOption}
        onChange={onChange}
        placeholder={placeholder}
        options={selectOptions}
        isMulti={isMulti}
        isLoading={isLoading}
        isClearable={isClearable}
      />
      {selectedOption !== '' && (
        <StyledInputLabel>{placeholder}</StyledInputLabel>
      )}
      <ErrorMessage name={field.name}>
        {msg => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </StyledDiv>
  );
};

CustomSelect.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  placeholder: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  optionLimit: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  isClearable: PropTypes.bool,
};

CustomSelect.defaultProps = {
  isMulti: false,
  isLoading: true,
  optionLimit: false,
  isClearable: false,
};

export default CustomSelect;
