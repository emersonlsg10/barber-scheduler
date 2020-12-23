import React from 'react';
import { Paper, InputBase, IconButton, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  && {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.38);
  }
`;

const StyledInputBase = styled(InputBase)`
  & .MuiInputBase-input {
    padding: 12px;
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    padding: 6px;
    color: 'red';
  }
`;

const SearchInput = ({ field, placeholder, onSubmit }) => (
  <StyledPaper>
    <StyledInputBase {...field} placeholder={placeholder} />
    <StyledIconButton type="submit" onClick={onSubmit}>
      <Icon>search</Icon>
    </StyledIconButton>
  </StyledPaper>
);

SearchInput.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
