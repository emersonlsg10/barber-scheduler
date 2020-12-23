import React from 'react';
import { Fab, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { appColors } from 'utils/appColors';

const StyledFab = styled(Fab)`
  && {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: ${appColors.primary};
    color: white;
    margin: 0;
    width: 43px;
    height: 43px;
    &:hover {
      background: ${appColors.primary};
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
    &:active {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }
  }
`;

const HeaderFab = ({ icon, ...otherProps }) => (
  <StyledFab
    size="small"
    onClick={otherProps.onClick ? otherProps.onClick : null}
    {...otherProps}
  >
    <Icon>{icon}</Icon>
  </StyledFab>
);

HeaderFab.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default HeaderFab;
