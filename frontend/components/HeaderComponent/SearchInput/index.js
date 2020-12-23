import React from 'react';
import { Creators as MenuCreators } from 'appStore/ducks/menu';
import { useSelector, useDispatch } from 'react-redux';
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
    padding: 0px 15px;
    color: #fff;
    max-width: 150px;
    ::-webkit-input-placeholder {
      color: #fff;
      font-style: bold;
      opacity: 0.8;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    padding: 7px;
  }
`;

const SearchInput = ({ field, placeholder, handleSubmit }) => {
  const dispatch = useDispatch();
  const { showMenu } = useSelector(state => state.menu);

  const showInput = () => {
    dispatch(MenuCreators.showMenu(!showMenu));
  };
  return (
    <StyledPaper
      style={{
        backgroundColor: '#EB961F',
        borderStyle: 'solid',
        borderColor: '#EB961F',
        borderRadius: '20px',
        height: '40px',
        marginTop: '10px',
      }}>
      {showMenu && (
        <StyledInputBase
          margin="dense"
          {...field}
          autoComplete="off"
          placeholder={placeholder}
          onClick={handleSubmit}
        />
      )}
      <StyledIconButton
        onClick={() => showInput()}
        type="submit"
        style={{ backgroundColor: '#EB961F', color: '#fff' }}>
        <Icon>search</Icon>
      </StyledIconButton>
    </StyledPaper>
  );
};

SearchInput.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
