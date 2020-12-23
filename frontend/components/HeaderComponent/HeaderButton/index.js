import React from 'react';
import { Button, Icon } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { appColors } from 'utils/appColors';

const StyledButton = styled(Button)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: ${appColors.primary};
    padding: 10px;
    color: white;
    &:hover {
      background: ${appColors.primary};
    }
  }
`;

const StyledIcon = styled(Icon)`
  && {
    margin-right: 10px;
  }
`;

const SearchButton = ({ icon, children }) => (
  <StyledButton>
    <StyledIcon>{icon}</StyledIcon>
    {children}
  </StyledButton>
);

SearchButton.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
}

export default SearchButton;
